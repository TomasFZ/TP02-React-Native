import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './src/views/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConfiguracionNumEmergencia from './src/views/ConfiguracionNumEmergencia';
import ContactList from './src/views/Contactos';
import EmergencyScreen from './src/views/LlamadoEmergencia';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ConfiguracionNumeroEmergencia" component={ConfiguracionNumEmergencia} />
        <Stack.Screen name="Contactos" component={ContactList} />
        <Stack.Screen name="LlamadoEmergencia" component={EmergencyScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

