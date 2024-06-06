// SplashScreen.js

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   navigation.replace('forcast');
    // }, 20000); 

    // return () => clearTimeout(timer);
  }, [navigation]);

  const handleGetStarted = () => {
    navigation.navigate('forcast');
  };

  return (
    <View
      style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/image/Weather _))10 18.png')} style={styles.logo} />
        <Text style={styles.title}>Simply</Text>
        <Text style={styles.subtitle}>Weather</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Feather name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#0B121E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0, 
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'poppins-bold',
    marginTop:20
  },
  subtitle: {
    fontSize: 50,
    color: '#0FA958',
    marginBottom: 20,
    fontFamily: 'poppins-medium',
  },
  button: {
    backgroundColor: '#0FA958',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius:40,
    marginTop:20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#362A84',
  },
});
