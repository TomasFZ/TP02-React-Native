import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const ConfiguracionNumEmergencia = () => {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [actualPhoneNumber, setActualPhoneNumber] = useState(null);
  const [valid, setValid] = useState(false);
  const [countryCode, setCountryCode] = useState('AR'); // Argentina como predeterminado

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      const number = await AsyncStorage.getItem('emergencyNumber');
      if (number) {
        setActualPhoneNumber(number);
        setPhoneNumber(number);
        setFormattedValue(number);
      } else {
        const defaultNumber = '5491123456789'; // Número de emergencia predeterminado
        setActualPhoneNumber(defaultNumber);
        setPhoneNumber(defaultNumber);
        setFormattedValue(defaultNumber);
        await AsyncStorage.setItem('emergencyNumber', defaultNumber);
      }
    };

    fetchEmergencyNumber();
  }, []);

  const saveEmergencyNumber = async () => {
    const checkValid = phoneInput.current?.isValidNumber(formattedValue); // Valida el número usando el input
    setValid(checkValid);

    if (checkValid) {
      try {
        await AsyncStorage.setItem('emergencyNumber', formattedValue);
        Alert.alert('Guardado', 'Número de emergencia guardado con éxito');
        setActualPhoneNumber(formattedValue); // Actualiza el número actual mostrado
        console.log('Número de teléfono guardado:', formattedValue); // Muestra en log
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar el número de emergencia');
      }
    } else {
      Alert.alert('Error', 'Por favor ingresa un número de teléfono válido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configura tu número de emergencia:</Text>
      
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode={countryCode}
        layout="first"
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        onChangeText={(text) => setPhoneNumber(text)}
        onChangeCountry={(country) => setCountryCode(country.cca2)}
        withShadow
        autoFocus
        countryPickerProps={{ withAlphaFilter: true }}
        withDarkTheme
      />

      <TouchableOpacity style={styles.button} onPress={saveEmergencyNumber}>
        <Text style={styles.buttonText}>Guardar Número</Text>
      </TouchableOpacity>

      {actualPhoneNumber && (
        <Text style={styles.currentNumber}>
          Número de Emergencia Actual: {actualPhoneNumber}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentNumber: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default ConfiguracionNumEmergencia;
