import * as React from "react";
import { StyleSheet, View, Text, Pressable, ActivityIndicator, Button, Alert, Modal, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import Icon from "react-native-vector-icons/Octicons";
import 'regenerator-runtime/runtime';

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

  const [isModalVisible, setIsModalVisible] = React.useState(false);

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

  const showSummary = () => {
    return detectionInfo.numberOfBugs === 0 ? "NO BUGS FOUND! THE DEVICE IS EFFECTIVELY MANAGING ITS TASKS." : "!!BUGS HAVE BEEN DETECTED!! ALLOW THE DEVICE TO RUN FOR EFFICIENT EXECUTION AND AUTOMATIC RESOLUTION.";
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };



  return (
    <View style={styles.aboutUsScreen}>
      <View style={[styles.aboutUsScreenChild, styles.aboutChildPosition]} />
      <Text style={[styles.about, styles.teamTypo]}>DETAILS</Text>
      
      <Image 
        style={styles.fetchedImage} 
        contentFit="cover" 
        source={imageUrl ? { uri: imageUrl } : require("../assets/sample-image.png")} 
      />

        <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Bugs Detected: {detectionInfo.numberOfBugs}
        </Text>
        </View>

        <View style={styles.infoContainer1}>
        <Text style={styles.infoText1}>
          Bugs Confidence: {detectionInfo.bugsConfidenceScore.toFixed(2)}%
        </Text>
        </View>

        <View style={styles.infoContainer2}>
        <Text style={styles.infoText2}>
          Panicles Detected: {detectionInfo.numberOfPanicles}
        </Text>
        </View>

        <View style={styles.infoContainer3}>
        <Text style={styles.infoText3}>
          Panicles Confidence: {detectionInfo.paniclesConfidenceScore.toFixed(2)}%
        </Text>
        </View>

        <View style={styles.infoContainer4}>
        <Text style={styles.infoText4}>
          Timestamp: {new Date(detectionInfo.timestamp).toLocaleString()} 
        </Text>
      </View>

      <Pressable style={styles.arrowButton} onPress={showPreviousDetection}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </Pressable>

      <Pressable style={styles.rightArrow} onPress={showNextDetection}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </Pressable>

      <Pressable style={styles.squareButton} onPress={showLatestDetection}>
        <Icon name="sync" size={25} color="#fff" />
      </Pressable>

      <Pressable style={[styles.vectorIconPNG]} onPress={() => navigation.navigate("Stats")} > 
      <Icon name="arrow-left" size={35} color="#132A17" /> </Pressable>

      <Pressable style={styles.download} onPress={showLatestDetection}>
        <Icon name="download" size={25} color="#fff" />
      </Pressable>

      <Icon name="bug" size={18} color="#F9E2D0" style={[styles.vectorIcon1]} />
      <Icon name="graph" size={18} color="#F9E2D0" style={[styles.vectorIcon2]} />
      <Icon name="search" size={18} color="#F9E2D0" style={[styles.vectorIcon3]} />
      <Icon name="pulse" size={18} color="#F9E2D0" style={[styles.vectorIcon4]} />
      <Icon name="clock" size={18} color="#F9E2D0" style={[styles.vectorIcon5]} />

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
            <Text style={styles.summaryText}>{showSummary()}</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    position: "absolute",
    top: 430,
    left: 105,
    width: 40,
    height: 35,
    backgroundColor: "#3A7D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  rightArrow: {
    position: "absolute",
    top: 430,
    left: 225,
    width: 40,
    height: 35,
    backgroundColor: "#3A7D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,  
  },
  squareButton: {
    position: "absolute",
    top: 430,
    left: 165,
    width: 40,
    height: 35,
    backgroundColor: "#3A7D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
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
    top: "7%",   
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
  fetchedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    top: -20,
    position: "fixed",
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
    backgroundColor: '#132A17',
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',
    alignItems: 'flex-start',
    top: 20,
    left: 2,
    position: 'fixed',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 27,
    color: 'white',
  },
  infoContainer1: {
    backgroundColor: '#132A17',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'flex-start',
    top: 25,
    left: 2,
    position: 'fixed',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,
  },
  infoText1: {
    fontSize: 13,
    marginBottom: 2,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 27,
    color: 'white',
  },
  infoContainer2: {
    backgroundColor: '#132A17',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'flex-start',
    top: 30,
    left: 2,
    position: 'fixed',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,
  },
  infoText2: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 27,
    color: 'white',
  },
  infoContainer3: {
    backgroundColor: '#132A17',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'flex-start',
    top: 35,
    left: 2,
    position: 'fixed',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,
  },
  infoText3: {
    fontSize: 13,
    marginBottom: 2,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 27,
    color: 'white',
  },
  infoContainer4: {
    backgroundColor: '#132A17',
    padding: 5,
    borderRadius: 10,
    width: '60%',
    alignItems: 'flex-start',
    top: 40,
    left: 2,
    position: 'fixed',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5,
  },
  infoText4: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    left: 27,
    color: 'white',
  },
  vectorIcon1: {
    position: "absolute",
    top: 485,
    left: 85,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  vectorIcon2: {
    position: "absolute",
    top: 527,
    left: 85,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  vectorIcon3: {
    position: "absolute",
    top: 567,
    left: 85,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  vectorIcon4: {
    position: "absolute",
    top: 610,
    left: 85,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  vectorIcon5: {
    position: "absolute",
    top: 650,
    left: 85,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  download: {
    position: "absolute",
    top: 380,
    left: 295,
    width: 40,
    height: 35,
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#3A7D44',
    padding: 10,
    borderRadius: 5,
    width: 90,
    height: 40,
    top: 700, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
    position: "absolute",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    position: "absolute", 
    left: 18,
    top: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#F9E2D0',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 24,
    position: 'absolute',
    left: 130,
    top: -20,
  },
});

export default Details;