import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutUsScreen from "./screens/AboutUs/AboutUsScreen";
import AboutUsScreenTeam from "./screens/AboutUs/AboutUsScreenTeam";
import AboutUsScreenClient from "./screens/AboutUs/AboutUsScreenClient";
import AboutUsScreenExpert from "./screens/AboutUs/AboutUsScreenExpert";
import AboutUsScreenDevice from "./screens/AboutUs/AboutUsScreenDevice";
import LeftPanel from "./screens/LeftPanel";
import SettingsDropDown from "./screens/SettingsDropDown";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsOfService from "./screens/TermsOfService";
import AccountSettingsOption from "./screens/AccountSettingsOption";
import UserInfo from "./screens/UserInfo";
import Stats from "./screens/Stats";
import Details from "./screens/Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AuthProvider } from "./context/authContext";

import DeviceStatus from "./screens/connectToRpi/DeviceStatus";
import AddDevice from "./screens/connectToRpi/AddDevice";
import DeviceConfirm from "./screens/connectToRpi/DeviceConfirm";
import DeviceAccountInfoUpdate from "./screens/connectToRpi/DeviceAccountInfoUpdate";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen
            name="AboutUsScreenTeam"
            component={AboutUsScreenTeam}
          />
          <Stack.Screen
            name="AboutUsScreenClient"
            component={AboutUsScreenClient}
          />
          <Stack.Screen
            name="AboutUsScreenExpert"
            component={AboutUsScreenExpert}
          />
          <Stack.Screen
            name="AboutUsScreenDevice"
            component={AboutUsScreenDevice}
          />

          <Stack.Screen name="LeftPanel" component={LeftPanel} />
          <Stack.Screen name="SettingsDropDown" component={SettingsDropDown} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="TermsOfService" component={TermsOfService} />

          <Stack.Screen
            name="AccountSettingsOption"
            component={AccountSettingsOption}
          />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Device Status" component={DeviceStatus} />
          <Stack.Screen name="Add Device" component={AddDevice} />
          <Stack.Screen name="Device Confirm" component={DeviceConfirm} />
          <Stack.Screen
            name="Device Account Info Update"
            component={DeviceAccountInfoUpdate}
          />
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
