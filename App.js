import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Components/SplashScreen";
import WeatherForcast from "./Components/WeatherForcast";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import ResultScreen from "./Components/ResultScreen";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      });
    }

    loadFonts();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forcast"
            component={WeatherForcast}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
