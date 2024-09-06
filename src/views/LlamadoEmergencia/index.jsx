import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Linking } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const EmergencyScreen = () => {
  const [isShakeDetected, setShakeDetected] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState('5491123456789'); // Número de emergencia configurado

  // Umbral para detectar sacudidas rápidas
  const SHAKE_THRESHOLD = 1.5;

  useEffect(() => {
    // Subscribirse al acelerómetro
    Accelerometer.setUpdateInterval(500); // Intervalo de actualización en milisegundos
    const subscription = Accelerometer.addListener((accelerometerData) => {
      handleShake(accelerometerData);
    });

    return () => subscription.remove(); // Eliminar suscripción cuando el componente se desmonta
  }, []);

  const handleShake = (data) => {
    const { x, y, z } = data;
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    if (magnitude > SHAKE_THRESHOLD && !isShakeDetected) {
      setShakeDetected(true);
      sendEmergencyMessage();
      // Para evitar detectar múltiples sacudidas rápidamente
      setTimeout(() => {
        setShakeDetected(false);
      }, 2000); // Tiempo de espera antes de permitir otra detección
    }
  };

  // Enviar un SMS de emergencia
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

  // Enviar un mensaje por WhatsApp
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

  // Función que decide si enviar por SMS o WhatsApp
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
