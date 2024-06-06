import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function ResultScreen({ route, navigation }) {
  const { weatherData } = route.params;

  const handleShare = async () => {
    try {
      const message = `Weather in ${weatherData.location.name}, ${weatherData.location.country}:\n${weatherData.current.weather_descriptions[0]} with temperature ${weatherData.current.temperature}°C`;
      await Share.share({
        message: message,
      });
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {weatherData.location.name}, {weatherData.location.country}
        </Text>
        <TouchableOpacity onPress={handleShare}>
          <AntDesign name="sharealt" size={24} color="#0FA958" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.location}>
          {weatherData.current.weather_descriptions[0]}
        </Text>
        <Image
          source={{ uri: weatherData.current.weather_icons[0] }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>
          {weatherData.current.temperature}°C
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Humidity</Text>
            <Text style={styles.infoValue}>
              {weatherData.current.humidity}%
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>UV Index</Text>
            <Text style={styles.infoValue}>{weatherData.current.uv_index}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Wind</Text>
            <Text style={styles.infoValue}>
              {weatherData.current.wind_speed} km/h
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Visibility</Text>
            <Text style={styles.infoValue}>
              {weatherData.current.visibility} km
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B121E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 10 : 60,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    textAlign: "center",
    fontFamily:'poppins-medium'
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
    fontFamily:'poppins-regular'
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperature: {
    color: "white",
    fontSize: 32,
    marginBottom: 20,
    fontFamily:'poppins-regular'
    
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: "#202B3C",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'poppins-regular'
  },
  infoValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:'poppins-regular'
  },
});
