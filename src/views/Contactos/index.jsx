import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        Alert.alert('Permiso denegado', 'No puedes acceder a los contactos.');
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contact}>
      <Text style={styles.name}>{item.name}</Text>
      {item.phoneNumbers?.map((phone, index) => (
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
          keyExtractor={(item) => item.id}
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
});