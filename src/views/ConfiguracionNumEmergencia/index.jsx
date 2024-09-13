import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, LogBox } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracionNumEmergencia = () => {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [countryCode, setCountryCode] = useState('AR'); // Argentina como predeterminado

  // Cargar el número de emergencia guardado
  useEffect(() => {
    const loadEmergencyNumber = async () => {
      try {
        const storedNumber = await AsyncStorage.getItem('emergencyNumber');
        if (storedNumber) {
          setPhoneNumber(storedNumber);
          setFormattedValue(storedNumber);
        }
      } catch (error) {
        console.error('Error al cargar el número de emergencia:', error);
      }
    };

    loadEmergencyNumber();
  }, []);

  // Guardar el número de teléfono en AsyncStorage
  const saveEmergencyNumber = async () => {
    const checkValid = phoneInput.current?.isValidNumber(formattedValue); // Valida el número usando el input
    setValid(checkValid);

    if (checkValid) {
      try {
        await AsyncStorage.setItem('emergencyNumber', formattedValue);
        Alert.alert('Guardado', 'Número de emergencia guardado con éxito');
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
});

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