import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, Dimensions, Image, Pressable } from 'react-native';
import { Border, FontSize, FontFamily, Color } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import axios from "axios";
import Icon from "react-native-vector-icons/Octicons";

const Stats = () => {
  const navigation = useNavigation();

  const handleGetStartedPress = () => {
    // Navigate to Details
    navigation.navigate('Details');
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Atangya Detected',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://production-myentobackend.onrender.com/api/v1/auth/get-all-results"
      );
      console.log("Fetched data:", response.data);

      if (response.data.success) {
        const detections = response.data.detections;

        // Prepare labels and data for the chart (Only Time)
        const labels = detections.map((detection) => {
          const time = new Date(detection.createdAt);
          return time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true, // 12-hour format with AM/PM
          });
        });
        const panicleCounts = detections.map(
          (detection) => detection.numberOfPanicles
        );
        const bugCounts = detections.map(
          (detection) => detection.numberOfBugs
        );
        setChartData({
          labels: labels,
          datasets: [
            {
              data: bugCounts,
              color: "rgba(0, 122, 255)", 
              label: "Bugs",
            },
            {
              data: panicleCounts,
              color: "rgba(255, 99, 132)", 
              label: "Panicles",
            },
          ],
        });
      } else {
        console.error("API returned a success false response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    const newData = chartData.datasets[0].data.map(() => Math.floor(Math.random() * 20));
    setChartData({
      ...chartData,
      datasets: [{
        ...chartData.datasets[0],
        data: newData
      }]
    });
  };

  const screenWidth = Dimensions.get('window').width 

  return (
    <View style={styles.statistics}>
      <View style={styles.statisticsChild} />
      <View style={[styles.statisticsItem, styles.statisticsLayout]} />
      <Text style={styles.historyData}>HISTORY DATA</Text>
      <View style={styles.chartContainer}>
      <BarChart
        data={chartData}
        width={screenWidth - 20}  
        height={300}  
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 20 },
        }}
        style={styles.chart}
        />
        </View>
        <View style={styles.refreshButton}>
        <Button title="Refresh Data" onPress={refreshData} />
      </View>
      <View style={[styles.statisticsChild47, styles.statisticsLayout]} />

      <Pressable style={[styles.homeIcon, styles.iconPosition]} onPress={() => navigation.navigate("HomeScreen")} > 
      <Icon name="home" size={35} color="#132A17" /> </Pressable>

      <Pressable style={[styles.vectorIconPNG]} onPress={() => navigation.navigate("HomeScreen")} > 
      <Icon name="arrow-left" size={35} color="#132A17" /> </Pressable>

      <Pressable style={[styles.vectorIcon2, styles.iconPosition]} onPress={() => navigation.navigate("AboutUsScreen")} > 
      <Icon name="feed-person" size={35} color="#132A17" /> </Pressable>

      <Pressable style={[styles.controlIcon, styles.vectorIconLayout]} onPress={() => navigation.navigate("ControlOff")} > 
      <Icon name="plus-circle" size={35} color="#132A17" /> </Pressable>

      <Icon name="graph" size={32} color="#3cb371" style={[styles.vectorIcon9, styles.vectorIconLayout]} />

      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          { backgroundColor: pressed ? "#0d1f11" : "#3A7D44" }, // Darken when pressed
        ]}
        onPress={handleGetStartedPress}
      >
        <Text style={styles.buttonText}>View Details</Text>
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
  buttonPosition: {
    borderRadius: Border.br_4xs,
    bottom: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  lightGreenTint: {
    tintColor: "#69B578",
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
    overflow: "hidden"
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: 'Poppins-SemiBold',
    fontWeight: "600",
    color: Color.colorBlack,
    position: "absolute",
  },
  buttonChild: {
    backgroundColor: Color.colorDarkslategray,
  },
  getStarted: {
    color: Color.colorBlack,
  },
  getStarted1: {
    color: Color.colorSnow,
  },
  button: {
    height: "40.3%",
    top: "18.76%",
    right: "9.44%",
    bottom: "40.94%",
    left: "10%",
    width: "80.56%",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  vectorIcon: {
    top: "78.83%",
    left: "13.89%",
    right: "80.83%",
    width: "5.28%",
    height: "2.41%",
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "18.76%",
  },
  vectorIcon1: {
    top: "67.05%",
    left: "13.89%",
    right: "80.83%",
    width: "5.28%",
    height: "2.41%",
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "30.54%",
  },
  lineIcon: {
    height: "0.13%",
    width: "54.17%",
    top: "26.24%",
    bottom: "73.64%",
    left: "26.39%",
    maxHeight: "100%",
    maxWidth: "100%",
    right: "19.44%",
    position: "absolute",
    overflow: "hidden",
  },
  statisticsChild47: {
    height: "11.79%",
    top: "91.38%",
    right: "-0.28%",
    bottom: "-3.17%",
    left: "0.28%",
    backgroundColor: Color.colorPeachpuff,
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
  statistics: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 789,
    overflow: "hidden",
    width: "100%",
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    top: 195,
    position: "absolute",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  refreshButton: {
  color: "#AFE1AF",
  borderRadius: 5,
  textAlign: 'center',
  fontWeight: 'bold',
  top: 520,
  width: '45%', 
  left: 105,
  position: "absolute",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff", // Button text color
    fontWeight: "bold",
    left: 20,
    top: 5,
  },
  buttonContainer: {
    backgroundColor: "#3A7D44", // Button background color
    borderRadius: 30,
    elevation: 3,
    top: 570,
    width: 150,
    height: 40,
    left: 113,
  },
});

export default Stats;