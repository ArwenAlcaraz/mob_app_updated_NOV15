import * as React from "react";
import { useEffect, useState } from "react";
import {StyleSheet, View, Text, Button, Alert, Dimensions, Image, Pressable,} from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-gifted-charts";
import axios from "axios";
import Icon from "react-native-vector-icons/Octicons";
import RNPickerSelect from 'react-native-picker-select'; 

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 12,
    fontColor: 'white',
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.colorPeachpuff,
    backgroundColor: '#F9E2D0',
    fontFamily: "Poppins-SemiBold",
    position: "fixed",
  },
  inputAndroid: {
    padding: 7,
    fontColor: 'white',
    borderRadius: 35,
    borderWidth: 1,
    backgroundColor: '#F9E2D0',
    top: 125,
    width: 225,
    height: 55,
    left: 75,
    position: "fixed",
    elevation: 3,
  },
  placeholder: {
    color: '#3A7D44', 
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    backgroundColor: '#F9E2D0',
  },
  option: {
    fontSize: 14, 
    fontFamily: "Poppins-SemiBold",
    color: 'blue', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    backgroundColor: '#F9E2D0', 
  },
};

const Stats = () => {
  const navigation = useNavigation();

  const handleGetStartedPress = () => {
    // Navigate to Details
    navigation.navigate("Details");
  };

  const screenWidth = Dimensions.get("window").width;

  const [barData, setBarData] = useState({
    "7AM-12PM": [
      {
        value: 10,
        label: "Jan",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
        
      },
      { value: 20, frontColor: "#F6D4BA" },
      {
        value: 50,
        label: "Feb",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 40, frontColor: "#F6D4BA" },
      {
        value: 75,
        label: "Mar",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 25, frontColor: "#F6D4BA" },
      {
        value: 30,
        label: "Apr",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 20, frontColor: "#F6D4BA" },
      {
        value: 60,
        label: "May",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 40, frontColor: "#F6D4BA" },
      {
        value: 65,
        label: "Jun",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 30, frontColor: "#F6D4BA" },
    ],
  
    "1PM-5PM": [
      {
        value: 50,
        label: "Jan",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
        
      },
      { value: 30, frontColor: "#F6D4BA" },
      {
        value: 80,
        label: "Feb",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 70, frontColor: "#F6D4BA" },
      {
        value: 25,
        label: "Mar",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 55, frontColor: "#F6D4BA" },
      {
        value: 30,
        label: "Apr",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 30, frontColor: "#F6D4BA" },
      {
        value: 60,
        label: "May",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 60, frontColor: "#F6D4BA" },
      {
        value: 55,
        label: "Jun",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 30, frontColor: "#F6D4BA" },
    ],

    "7AM-5PM": [
      {
        value: 10,
        label: "Jan",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
        
      },
      { value: 20, frontColor: "#F6D4BA" },
      {
        value: 50,
        label: "Feb",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 40, frontColor: "#F6D4BA" },
      {
        value: 75,
        label: "Mar",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 25, frontColor: "#F6D4BA" },
      {
        value: 30,
        label: "Apr",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 20, frontColor: "#F6D4BA" },
      {
        value: 60,
        label: "May",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 40, frontColor: "#F6D4BA" },
      {
        value: 65,
        label: "Jun",
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: "white" },
        frontColor: "#132A17",
      },
      { value: 30, frontColor: "#F6D4BA" },
    ],
  });

  const handleRefresh = () => {
  const newData = {
    "7AM-12PM": [
      {value: Math.random() * 100, label: "Jan", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Feb", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Mar", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Apr", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "May", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Jun", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
    ],
  
    "1PM-5PM": [
      {value: Math.random() * 100, label: "Jan", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Feb", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Mar", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Apr", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "May", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Jun", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
    ],
      "7AM-5PM": [
      {value: Math.random() * 100, label: "Jan", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Feb", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Mar", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Apr", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      {value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "May", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
      {value: Math.random() * 100, label: "Jun", spacing: 2, labelWidth: 30, labelTextStyle: { color: "white" }, frontColor: "#132A17",},
      { value: Math.random() * 100, frontColor: "#F6D4BA" },
    ],
  };
  setBarData(newData);  // Update the state with new random data
};
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);

  const timeRanges = [
    { label: "7 AM - 12 PM", value: "7AM-12PM" },
    { label: "1 PM - 5 PM", value: "1PM-5PM" },
    { label: "Full day (7 AM - 5 PM)", value: "7AM-5PM" },
  ];


  const renderTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Detection Report</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: "#132A17" }]}
            />
            <Text style={styles.legendText}>Panicle</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: "#F6D4BA" }]}
            />
            <Text style={styles.legendText}>Bugs</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.statistics}>
      <View style={styles.statisticsChild} />
      <View style={[styles.statisticsItem, styles.statisticsLayout]} />
      <Text style={styles.historyData}>HISTORY DATA</Text>

      <View style={[styles.statisticsChild47, styles.statisticsLayout]} />

      <View style={styles.dropdownContainer}>
      <RNPickerSelect
      onValueChange={(value) => setSelectedTimeRange(value)}
      items={timeRanges}
      value={selectedTimeRange}
      style={pickerSelectStyles}
      placeholder={{ label: "Select a time range", value: null }}
        />
      </View>

      <Pressable
        style={[styles.homeIcon, styles.iconPosition]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="home" size={35} color="#132A17" />{" "}
      </Pressable>

      <Pressable
        style={[styles.vectorIconPNG]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="arrow-left" size={35} color="#132A17" />{" "}
      </Pressable>

      <Pressable
        style={[styles.vectorIcon2, styles.iconPosition]}
        onPress={() => navigation.navigate("AboutUsScreen")}
      >
        <Icon name="feed-person" size={35} color="#132A17" />{" "}
      </Pressable>

      <Pressable
        style={[styles.controlIcon, styles.vectorIconLayout]}
        onPress={() => navigation.navigate("ControlOff")}
      >
        <Icon name="plus-circle" size={35} color="#132A17" />{" "}
      </Pressable>

      <Icon
        name="graph"
        size={32}
        color="#3cb371"
        style={[styles.vectorIcon9, styles.vectorIconLayout]}
      />

      {selectedTimeRange && (
        <View style={styles.container}>
          {renderTitle()}
          <BarChart
            data={barData[selectedTimeRange]}
            barWidth={9}
            spacing={37}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "#F9E2D0" }}
            noOfSections={4}
            maxValue={75}
            showValuesAsTopLabel
            topLabelTextStyle={{ fontSize: 8 }}
          />
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          { backgroundColor: pressed ? "#0d1f11" : "#3A7D44" }, 
        ]}
        onPress={handleGetStartedPress}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.refreshButton,
          { backgroundColor: pressed ? "#0d1f11" : "#3A7D44" },
        ]}
        onPress={handleRefresh}
      >
        <Text style={styles.refreshText}>Refresh Data</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsLayout: {
    borderRadius: Border.br_xl,
    position: "absolute",
    width: "100%",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconPosition: {
    top: "94.04%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
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
  statisticsChild: {
    width: "177.69%",
    top: "11.28%",
    right: "-177.14%",
    bottom: "86.44%",
    left: "99.44%",
    backgroundColor: "rgba(134, 139, 132, 0.48)",
    transform: [
      {
        rotate: "89.5deg",
      },
    ],
    height: "2.28%",
    position: "absolute",
  },
  statisticsItem: {
    height: "15.78%",
    top: "-2.66%",
    bottom: "86.88%",
    backgroundColor: Color.colorAntiquewhite,
    left: "0%",
    right: "0%",
  },
  historyData: {
    height: "35.56%",
    width: "46.94%",
    top: "7.52%",
    left: "27.47%",
    fontSize: 22,
    lineHeight: 23,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    color: Color.colorBlack,
    position: "absolute",
  },
  homeIcon: {
    height: "4.31%",
    width: "10%",
    right: "82.5%",
    bottom: "1.65%",
    left: "10.5%",
    position: "fixed",
  },
  vectorIcon2: {
    height: "13.42%",
    right: "5.83%",
    bottom: "2.53%",
    left: "83.33%",
    width: "10.83%",
    top: "94.04%",
    position: "fixed",
  },
  controlIcon: {
    height: "10.06%",
    width: "10.28%",
    top: "93.86%",
    right: "29.89%",
    bottom: "2.28%",
    left: "59.83%",
    position: "fixed",
  },
  vectorIcon9: {
    height: "13.85%",
    width: "16.89%",
    top: "94.12%",
    right: "57.56%",
    bottom: "2.45%",
    left: "35.56%",
    position: "fixed",
  },
  statisticsChild47: {
    height: "11.79%",
    top: "91.38%",
    right: "-0.28%",
    bottom: "-3.17%",
    left: "0.28%",
    backgroundColor: Color.colorPeachpuff,
  },
  statistics: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 789,
    overflow: "hidden",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff", 
    fontWeight: "bold",
    left: 20,
    top: 5,
  },
  buttonContainer: {
    backgroundColor: "#3A7D44",  
    borderRadius: 30,
    elevation: 3,
    top: 0,
    width: 150,
    height: 40,
    left: 120,
    position: "absolute",
    top: 580,
  },
  dropdownContainer: {
    backgroundColor: '#F9E2D0',
  },
  container: {
    backgroundColor: "#3A7D44",
    paddingBottom: 40,
    borderRadius: 20,
    top: 130,
    width: 350,
    left: 5,
    position: "fixed",
    elevation: 3,
  },
  titleContainer: {
    marginVertical: 30,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
    backgroundColor: "#3A7D44",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColorBox: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    width: 60,
    height: 21,
    color: "white",
  },
  refreshButton: {
    backgroundColor: "#3A7D44",
    borderRadius: 30,
    elevation: 3,
    top: 630,
    width: 150,
    height: 40,
    left: 120,
    position: "absolute",
  },
  refreshText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    top: 5,
  },
});

export default Stats;
