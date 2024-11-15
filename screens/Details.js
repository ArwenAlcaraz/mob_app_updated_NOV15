import * as React from "react";
import { StyleSheet, View, Text, Pressable, ActivityIndicator, Button, Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/Ionicons';

const Details = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [detections, setDetections] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [detectionInfo, setDetectionInfo] = React.useState({
    numberOfBugs: 0,
    bugsConfidenceScore: 0,
    numberOfPanicles: 0,
    paniclesConfidenceScore: 0,
    timestamp: "",  // New field for the timestamp
  });

  React.useEffect(() => {
    axios.get("https://production-myentobackend.onrender.com/api/v1/auth/get-all-results")
      .then(response => {
        if (response.data && response.data.imageUrl) {
          setImageUrl(response.data.imageUrl);
        } else {
          console.log("No image URL found in response");
        }
        const detections = response.data.detections || [];
        setDetections(detections);
        if (detections.length > 0) {
          const latestDetection = detections[0];
          setDetectionInfo({
            numberOfBugs: latestDetection.numberOfBugs,
            bugsConfidenceScore: latestDetection.bugsConfidenceScore,
            numberOfPanicles: latestDetection.numberOfPanicles,
            paniclesConfidenceScore: latestDetection.paniclesConfidenceScore,
            timestamp: latestDetection.timestamp || "No timestamp",  // Assign timestamp if available
          });
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded || isLoading) {
    return <ActivityIndicator size="large" color={Color.colorBlack} style={styles.loading} />;
  }

  const showPreviousDetection = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevDetection = detections[prevIndex];
      setDetectionInfo({
        numberOfBugs: prevDetection.numberOfBugs,
        bugsConfidenceScore: prevDetection.bugsConfidenceScore,
        numberOfPanicles: prevDetection.numberOfPanicles,
        paniclesConfidenceScore: prevDetection.paniclesConfidenceScore,
        timestamp: prevDetection.timestamp || "No timestamp",  // Assign timestamp if available
      });
    } else {
      Alert.alert("No Previous Results", "You are already at the first detection.");
    }
  };

  const showNextDetection = () => {
    if (currentIndex < detections.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextDetection = detections[nextIndex];
      setDetectionInfo({
        numberOfBugs: nextDetection.numberOfBugs,
        bugsConfidenceScore: nextDetection.bugsConfidenceScore,
        numberOfPanicles: nextDetection.numberOfPanicles,
        paniclesConfidenceScore: nextDetection.paniclesConfidenceScore,
        timestamp: nextDetection.timestamp || "No timestamp",  // Assign timestamp if available
      });
    } else {
      Alert.alert("No Next Results", "You are already at the last detection.");
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) {
      Alert.alert("No Image", "There is no image to download.");
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + "downloadedImage.jpg";
      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
        fileUri,
      );

      const { uri } = await downloadResumable.downloadAsync();
      Alert.alert("Download Complete", "Image downloaded to: " + uri);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "There was an error downloading the image.");
    }
  };

  const showLatestDetection = () => {
    if (detections.length > 0) {
      const latestDetection = detections[0];
      setDetectionInfo({
        numberOfBugs: latestDetection.numberOfBugs,
        bugsConfidenceScore: latestDetection.bugsConfidenceScore,
        numberOfPanicles: latestDetection.numberOfPanicles,
        paniclesConfidenceScore: latestDetection.paniclesConfidenceScore,
        timestamp: latestDetection.timestamp || "No timestamp",  // Assign timestamp if available
      });
    }
  };

  return (
    <View style={styles.aboutUsScreen}>
      <View style={[styles.aboutUsScreenChild, styles.aboutChildPosition]} />
      <Text style={[styles.about, styles.teamTypo]}>Details</Text>
      <Pressable style={styles.vectorIconPNG} onPress={() => navigation.navigate("Stats")}>
        <Image style={styles.vectorIconPNG} contentFit="cover" source={require("../assets/vector7.png")} />
      </Pressable>
      <Image style={[styles.more3Icon, styles.iconLayout]} contentFit="cover" source={require("../assets/more-3.png")} />
      
      {/* Conditionally Render the Image */}
      <Image 
        style={styles.fetchedImage} 
        contentFit="cover" 
        source={imageUrl ? { uri: imageUrl } : require("../assets/sample-image.png")} 
      />

      {imageUrl && (
        <View style={styles.buttonContainer}>
          <Button title="Download Image" onPress={handleDownload} color="#3A7D44" />
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Bugs Detected: {detectionInfo.numberOfBugs}
        </Text>
        <Text style={styles.infoText}>
          Bugs Confidence: {detectionInfo.bugsConfidenceScore.toFixed(2)}%
        </Text>
        <Text style={styles.infoText}>
          Panicles Detected: {detectionInfo.numberOfPanicles}
        </Text>
        <Text style={styles.infoText}>
          Panicles Confidence: {detectionInfo.paniclesConfidenceScore.toFixed(2)}%
        </Text>
        <Text style={styles.infoText}>
          Timestamp: {new Date(detectionInfo.timestamp).toLocaleString()} {/* Display formatted timestamp */}
        </Text>
      </View>

      {/* Left Arrow Button to Show Previous Detection */}
      <Pressable style={styles.arrowButton} onPress={showPreviousDetection}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </Pressable>

      {/* Right Arrow Button to Show Next Detection */}
      <Pressable style={styles.rightArrow} onPress={showNextDetection}>
        <Icon name="arrow-forward" size={30} color="#fff" />
      </Pressable>

      {/* Square Button to Display Current Detection */}
      <Pressable style={styles.squareButton} onPress={showLatestDetection}>
        <Text style={styles.squareButtonText}>Latest Detection</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    position: "absolute",
    top: 460,
    left: 60,
    padding: 10,
    backgroundColor: "#3A7D44",
    borderRadius: 30,
  },
  rightArrow: {
    position: "absolute",
    top: 460,
    right: 60,
    padding: 10,
    backgroundColor: "#3A7D44",
    borderRadius: 30,
  },
  squareButton: {
    position: "absolute",
    top: 460,
    left: 150,
    width: 60,
    height: 55,
    backgroundColor: "#3A7D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  squareButtonText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  aboutChildPosition: {
    borderRadius: Border.br_xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  vectorIconPNG: {
    height: "15.47%",
    width: "25.53%",
    top: "7.28%",
    right: "86.81%",
    bottom: "93.25%",
    left: "3.67%",
    position: "absolute",
    overflow: "hidden",
  },
  aboutUsScreenChild: {
    height: "15.78%",
    top: "-3.44%",
    bottom: "87.66%",
    backgroundColor: "#F9E2D0",
  },
  about: {
    height: "8.53%",
    width: "40.28%",
    top: "7%",   // Use a fixed top value for placement
    left: "38.5%",
    fontSize: 25,
    fontFamily: 'Poppins-SemiBold',
    color: Color.colorBlack,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    position: "absolute", 
  },
  aboutUsScreen: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 120,
    width: 200,

  },
  fetchedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  infoContainer: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
    width: '90%',
    alignItems: 'flex-start',
    top: 70,
    left: 2,
    position: 'fixed',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 55,
  },
});

export default Details;