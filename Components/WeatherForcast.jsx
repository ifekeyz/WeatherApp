import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function WeatherForcast() {
    const navigation = useNavigation();

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    
    setLoading(true); 
    try {
        const response = await axios.get(
            `http://api.weatherstack.com/current?access_key=7b7f791a3e0d012f8d28ad63f551fc0b&query=${location}`
          );
        if (response.data.success === false) {
            throw new Error(response.data.error.info);
        }
        setWeather(response.data);
        navigation.navigate('Result', { weatherData: response.data });
        setLocation("");
        setError("");
    } catch (error) {
        console.log(error)
        setError(error.message);
        setWeather(null);
    } finally {
        setLoading(false); 
    }
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsTyping(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
        setIsTyping(false);
      }}
    >
        <StatusBar barStyle="dark" />
      <View style={styles.top} />
      <View style={styles.toplogo}>
        <View style={styles.conatinerlogo}>
          <MaterialCommunityIcons
            name="weather-hurricane"
            size={30}
            color="black"
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 ,marginTop:50}}>
        <Text style={styles.info}>Simply Weather</Text>
        <Text style={styles.infoText}>
          View the current weather for your area
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderWidth: isTyping ? 1 : 0 }]}
            // placeholder="Enter a city or zip code"
            // placeholderTextColor="gray"
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              setIsTyping(text.length > 0);
            }}
          />
          <Text style={styles.inputPlaceholder}>ZIP CODE or CITY</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={fetchWeather}
          disabled={loading} 
        >
          {loading ? ( 
            <ActivityIndicator color="#FFFFFF" /> 
          ) : (
            <Text style={styles.buttonText}>Get Weather</Text>
          )}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
       
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B121E",
    alignItems: "center",
  },
  top: {
    backgroundColor: "#FFFFFF",
    height: "10%",
    width: "100%",
  },
  toplogo: {
    backgroundColor: "white",
    alignSelf: "center",
    padding: 25,
    borderRadius: 60,
    marginTop: -50,
  },
  conatinerlogo: {
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
  },
  info: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
    fontFamily: "poppins-bold",
    fontSize: 28,
  },
  infoText: {
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "poppins-regular",
    fontSize: 18,
  },
  inputContainer: {
    // width: "100%",
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: "100%",
    fontFamily: "poppins-regular",
    borderColor: "gray",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    color:'white'
  },
  inputPlaceholder: {
    left: 5,
    top: 5,
    color: "gray",
    fontFamily: "poppins-regular",
    zIndex: -1,
  },
  error: {
    color: "red",
    marginTop: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#0FA958",
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "poppins-regular",
  },
});
