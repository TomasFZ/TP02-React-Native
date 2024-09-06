import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [defaultEmergencyNumber, setDefaultEmergencyNumber] = useState('123456789'); // Número de emergencia almacenado

  // Pedir permiso para acceder a los contactos
  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Permiso de Contactos',
          message: 'Esta aplicación necesita acceder a tus contactos.',
          buttonNeutral: 'Preguntar luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permiso concedido');
        loadContacts();
      } else {
        Alert.alert('Permiso denegado', 'No se pueden mostrar los contactos sin permiso.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Cargar contactos desde el dispositivo
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts);
      })
      .catch(err => {
        console.error('Error al obtener contactos:', err);
        Alert.alert('Error', 'No se pudieron cargar los contactos.');
      });
  };

  useEffect(() => {
    requestContactsPermission();
  }, []);

  // Renderizar cada contacto
  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.displayName}</Text>
      <Text style={styles.contactNumber}>
        {item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'Sin número'}
      </Text>
      {/* Mostrar si es el número de emergencia */}
      {item.phoneNumbers.length > 0 && item.phoneNumbers[0].number === defaultEmergencyNumber && (
        <Text style={styles.emergencyText}>Número de Emergencia</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactos</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
  },
  emergencyText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ContactList;






/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Solicita permisos y carga los contactos
    const requestContactsPermission = async () => {
      try {
        // Solicitar permiso de contactos para Android
        if (Platform.OS === 'android') {
          const granted = await Contacts.requestPermission();
          if (granted === 'authorized') {
            loadContacts();
          } else {
            Alert.alert('Permiso denegado', 'No puedes acceder a los contactos.');
          }
        } else {
          // Para iOS, los permisos se solicitan automáticamente
          loadContacts();
        }
      } catch (error) {
        console.error('Error al solicitar permisos de contactos', error);
      }
    };

    // Función para cargar los contactos
    const loadContacts = async () => {
      try {
        const allContacts = await Contacts.getAll();
        setContacts(allContacts);
      } catch (error) {
        console.error('Error al obtener los contactos', error);
      }
    };

    requestContactsPermission();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contact}>
      <Text style={styles.name}>{item.givenName} {item.familyName}</Text>
      {item.phoneNumbers.map((phone, index) => (
        <Text key={index} style={styles.phoneNumber}>{phone.number}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.recordID}
        />
      ) : (
        <Text>No se encontraron contactos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  contact: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
  },
});*/
