import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import Icon from "react-native-vector-icons/Octicons";
import { AuthContext } from "../context/authContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [state] = React.useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a loading indicator if needed
  }

  const handleStatsPress = () => {
    // Navigate to Stats screen or any other screen
    navigation.navigate("Stats", { userData: state.user });
  };

  const handleAddDevicePress = () => {
    // Navigate to AddDevice screen or any other screen
    navigation.navigate("Add Device");
  };

  const handleDeviceStatsPress = () => {
    // Navigate to DeviceStats or any other screen
    navigation.navigate("Device Status");
  };

  const handleInfoPress = () => {
    // Navigate to InfoPress or any other screen
    navigation.navigate("AboutUsScreen");
  };

  return (
    <View style={styles.aboutUsScreen}>
      <View style={[styles.aboutUsScreenChild, styles.aboutChildPosition]} />
      <Text style={[styles.about, styles.teamTypo]}>HOME</Text>

      <Pressable
        style={[styles.more3Icon]}
        onPress={() => navigation.navigate("LeftPanel")}
      >
        <Icon name="three-bars" size={25} color="#132A17" />
      </Pressable>

      <Image
        source={require("../assets/MyEntoLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.Text2}>MyEnto</Text>
      <Pressable style={styles.StatsContainer} onPress={handleStatsPress}>
        <Image
          source={require("../assets/stats.png")}
          style={styles.logo1}
          resizeMode="contain"
        />
        <Text style={styles.Text3}>History Data</Text>
      </Pressable>

      <Pressable
        style={styles.AddDeviceContainer}
        onPress={handleAddDevicePress}
      >
        <Image
          source={require("../assets/AddDevice.png")}
          style={styles.logo1}
          resizeMode="contain"
        />
        <Text style={styles.Text3}>Add Device</Text>
      </Pressable>

      <Pressable
        style={styles.DeviceStatsContainer}
        onPress={handleDeviceStatsPress}
      >
        <Image
          source={require("../assets/DeviceStats.png")}
          style={styles.logo1}
          resizeMode="contain"
        />
        <Text style={styles.Text3}>Device Status</Text>
      </Pressable>

      <Pressable style={styles.InfoContainer} onPress={handleInfoPress}>
        <Image
          source={require("../assets/info.png")}
          style={styles.logo1}
          resizeMode="contain"
        />
        <Text style={styles.Text3}>Information</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutChildPosition: {
    borderRadius: Border.br_xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  teamTypo: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    position: "absolute",
  },
  aboutUsScreenChild: {
    height: "15.78%",
    top: "-3.44%",
    bottom: "87.66%",
    backgroundColor: "#F9E2D0",
  },
  about: {
    height: "4.53%",
    width: "25.28%",
    top: "6.78%",
    left: "37.5%",
    fontSize: 28,
    color: Color.colorBlack,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  more3Icon: {
    height: "3.75%",
    width: "6.67%",
    top: "1.10%",
    bottom: "100%",
    left: "-40.5%",
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
  logo: {
    width: 130,
    height: 130,
    top: 55,
    position: "fixed",
  },

  logo1: {
    width: 85,
    height: 70,
    bottom: 0,
    position: "fixed",
  },

  Text2: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold",
    color: "#132a17",
    fontWeight: "900",
    top: 55,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
  },
  StatsContainer: {
    backgroundColor: "#FDFFFD",
    padding: 15,
    borderRadius: 10,
    position: "fixed",
    top: 65,
    right: 63,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  StatsText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
  },

  AddDeviceContainer: {
    backgroundColor: "#FDFFFD",
    padding: 15,
    position: "fixed",
    borderRadius: 10,
    bottom: 55,
    left: 63,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AddDeviceText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
  },

  DeviceStatsContainer: {
    backgroundColor: "#FDFFFD",
    padding: 12,
    position: "fixed",
    borderRadius: 10,
    bottom: 47,
    right: 63,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  DeviceStatsText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
  },

  InfoContainer: {
    backgroundColor: "#FDFFFD",
    padding: 15,
    position: "fixed",
    borderRadius: 10,
    bottom: 160,
    left: 63,
    paddingBottom: 13,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  InfoText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
  },
  Text3: {
    fontSize: 15,
    fontFamily: "Poppins-Bold", // Apply the loaded font
    color: "#132a17", // Text color
    fontWeight: "900",
  },
});

export default HomeScreen;
