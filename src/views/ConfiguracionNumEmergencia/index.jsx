import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracionNumEmergencia = () => {
  const [emergencyNumber, setEmergencyNumber] = useState('');

  const saveEmergencyNumber = async () => {
    if (emergencyNumber.match(/^\d{10,}$/)) {
      await AsyncStorage.setItem('emergencyNumber', emergencyNumber);
      Alert.alert('Guardado', 'Número de emergencia guardado con éxito');
    } else {
      Alert.alert('Error', 'Por favor ingresa un número de teléfono válido');
    }
  };

  return (
    <View>
      <Text>Configura tu número de emergencia:</Text>
      <TextInput
        placeholder="Ingresa el número de emergencia"
        keyboardType="phone-pad"
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
      />
      <Button title="Guardar" onPress={saveEmergencyNumber} />
    </View>
  );
};

export default ConfiguracionNumEmergencia;






/*import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parsePhoneNumber } from 'libphonenumber-js/min';

export default function ConfiguracionNumEmergencia() {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Función para manejar cambios en el número de teléfono
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  // Función para guardar el número de teléfono
  const savePhoneNumber = async () => {
    try {
      const phoneText = phoneInput.current?.getNumberAfterPossiblyEliminatingZero() || '';
      
      if (!phoneText) {
        Alert.alert('Error', 'Por favor, ingrese un número de teléfono');
        return;
      }
      
      const parsedNumber = parsePhoneNumber(phoneText, 'AR');
      
      if (parsedNumber && parsedNumber.isValid()) {
        await AsyncStorage.setItem('numTelefonoEmergencia', parsedNumber.number);
        console.log('Número de teléfono guardado exitosamente');
        Alert.alert('Éxito', 'Número de teléfono guardado exitosamente');
        setPhoneNumber(parsedNumber.formatInternational());
      } else {
        console.error('Número inválido, no se puede guardar');
        Alert.alert('Error', 'Número inválido, no se puede guardar');
      }
    } catch (error) {
      console.error('Error al guardar el número de teléfono', error);
      Alert.alert('Error', 'No se pudo guardar el número de teléfono');
    }
  };

  // Función para recuperar el número de teléfono
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const storedNumber = await AsyncStorage.getItem('numTelefonoEmergencia');
        if (storedNumber) {
          const parsedNumber = parsePhoneNumber(storedNumber, 'AR');
          if (parsedNumber && parsedNumber.isValid()) {
            setPhoneNumber(parsedNumber.formatInternational());
          } else {
            console.error('Número recuperado inválido');
            Alert.alert('Error', 'Número recuperado inválido');
          }
        }
      } catch (error) {
        console.error('Error al recuperar el número de teléfono', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="AR"
        onChangeFormattedText={handlePhoneNumberChange}
        withDarkTheme
        withShadow
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={savePhoneNumber}>
        <Text style={styles.buttonText}>Guardar Número</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});*/

//no funciona esto