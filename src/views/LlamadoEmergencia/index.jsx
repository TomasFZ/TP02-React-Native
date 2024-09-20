import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Linking } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyScreen = () => {
  const [isShakeDetected, setShakeDetected] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState('5491123456789'); // Número de emergencia predeterminado

  const SHAKE_THRESHOLD = 1.5;

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      const number = await AsyncStorage.getItem('emergencyNumber');
      if (number) {
        setEmergencyNumber(number);
      }
    };

    fetchEmergencyNumber();

    Accelerometer.setUpdateInterval(500);
    const subscription = Accelerometer.addListener((accelerometerData) => {
      handleShake(accelerometerData);
    });

    return () => subscription.remove();
  }, []);

  const handleShake = (data) => {
    const { x, y, z } = data;
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    if (magnitude > SHAKE_THRESHOLD && !isShakeDetected) {
      setShakeDetected(true);
      sendEmergencyMessage();
      setTimeout(() => {
        setShakeDetected(false);
      }, 2000);
    }
  };

  const sendSMS = () => {
    const message = '¡Emergencia! Necesito ayuda.';
    Linking.openURL(`sms:${emergencyNumber}?body=${message}`)
      .then(() => {
        Alert.alert('Mensaje enviado', 'El mensaje de emergencia ha sido enviado.');
      })
      .catch((err) => {
        Alert.alert('Error', 'No se pudo enviar el mensaje por SMS.');
        console.error('Error al enviar SMS:', err);
      });
  };

  const sendWhatsAppMessage = () => {
    const message = '¡Emergencia! Necesito ayuda.';
    const url = `whatsapp://send?phone=${emergencyNumber}&text=${message}`;
    
    Linking.openURL(url)
      .then(() => {
        Alert.alert('Mensaje enviado', 'El mensaje de emergencia ha sido enviado por WhatsApp.');
      })
      .catch((err) => {
        Alert.alert('Error', 'No se pudo enviar el mensaje por WhatsApp.');
        console.error('Error al enviar mensaje por WhatsApp:', err);
      });
  };

  const sendEmergencyMessage = () => {
    Alert.alert(
      'Enviar Mensaje de Emergencia',
      '¿Cómo quieres enviar el mensaje?',
      [
        { text: 'SMS', onPress: () => sendSMS() },
        { text: 'WhatsApp', onPress: () => sendWhatsAppMessage() },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sacude el teléfono para enviar un mensaje de emergencia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

export default EmergencyScreen;
