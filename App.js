import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location"
import Constants from 'expo-location'
export default function App() {

  const [location, setLocation] = useState(null)
  const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted"){
      return
    }

    const userLocation = await Location.getCurrentPositionAsync()
    setLocation(userLocation)
  }

  useEffect(() => {  
    getCoordinates()
  } , [])

  if(!location){
    return <View>
      <Text> Aucune postion disponible</Text>
      </View>
  }

  return (
    <View style={styles.container}>
      <Text> latitude : {location.coords.latitude}</Text>
      <Text> longitude : {location.coords.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
