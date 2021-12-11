import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location"
import Constants from 'expo-location'
import axios from "axios"
export default function App() {

  const URL = (lat,lon) =>  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c7dabbcd29381e212de4ff5af5f26f7a&lan=fr&units=metric`

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted"){
      return
    }

    const userLocation = await Location.getCurrentPositionAsync()
    getWeather(userLocation)
  }

  const getWeather = async (location) => {
    try{
      const reponse = await axios.get(URL(location.coords.latitude,location.coords.longitude))
      setLoading(false)
      setData(reponse.data)
    }
    catch(e){
      console.log(e)
    }
    
  }

  useEffect(() => {  
    getCoordinates()
  } , [])



  if(loading){
    return <View>
      <ActivityIndicator/>
      </View>
  }

  return (
    <View style={styles.container}>
      <Text> {data?.city?.name}</Text>
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
