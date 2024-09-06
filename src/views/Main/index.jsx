import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const links = [
  { id: '1', title: 'Configuración de Nro. Emergencia', route: 'ConfiguracionNumeroEmergencia' },
  { id: '2', title: 'Contactos', route: 'Contactos' },
  { id: '3', title: 'Llamado de emergencia', route: 'LlamadoEmergencia' },
  { id: '4', title: 'Hora actual / Temperatura', route: 'Temperatura' },
  // Puedes agregar más enlaces aquí
];

const Main = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(item.route)}
    >
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={links}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default Main;



