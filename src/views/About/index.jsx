import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Correcta importación
import * as BarCodeScanner from 'expo-barcode-scanner'; // Correcta importación

const About = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setModalVisible(false); // Close the scanner after a successful scan
  };

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.info}>Group Members: John Doe, Jane Smith, Alice Johnson</Text>
      <QRCode
        value="John Doe, Jane Smith, Alice Johnson"
        size={200}
        color="black"
        backgroundColor="white"
      />
      <Button title="Scan QR Code" onPress={() => setModalVisible(true)} />
      
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <BarCodeScanner
              onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.infoContainer}>
              {scannedData ? (
                <Text style={styles.scannedText}>Scanned Data: {scannedData}</Text>
              ) : (
                <Text style={styles.instructions}>Scan a QR code</Text>
              )}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scannedText: {
    fontSize: 18,
    marginBottom: 16,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default About;
