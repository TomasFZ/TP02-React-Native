import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const WeatherAndTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);

    const getWeather = async () => {
      try {
        // Solicitar permisos para la ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
          return;
        }

        // Obtener la ubicación actual
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Obtener la dirección a partir de la latitud y longitud
        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (address.length > 0) {
          const { city, country, street, region } = address[0];
          setAddress(`${street || ''}, ${city || ''}, ${region || ''}, ${country || ''}`);
        } else {
          setAddress('Dirección desconocida');
        }

        // Hacer la solicitud a la API de Open-Meteo
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        
        // Establecer la temperatura y velocidad del viento actuales
        const currentWeather = response.data.current_weather;
        setTemperature(currentWeather.temperature);
        setWindSpeed(currentWeather.windspeed);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la información del clima.');
        console.error(error);
      }
    };

    getWeather();

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text>Fecha actual: {date}</Text>
      <Text>Hora actual: {time}</Text>
      <Text>Dirección: {address || 'Cargando...'}</Text>
      <Text>Temperatura: {temperature !== null ? `${temperature}°C` : 'Cargando...'}</Text>
      <Text>Velocidad del viento: {windSpeed !== null ? `${windSpeed} m/s` : 'Cargando...'}</Text>
    </View>
  );
};

export default WeatherAndTime;
