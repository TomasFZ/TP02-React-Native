import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

const About = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.infoContainer}>
            {scannedData ? (
              <Text style={styles.scannedText}>
              {scannedData ? `Scanned Data: ${scannedData}` : 'Scan a QR code'}
              </Text>
            ) : (
              <Text style={styles.instructions}>Scan a QR code</Text>
            )}
            <Button title="Close" onPress={() => {
              setModalVisible(false);
              setScannedData('');
            }} />
          </View>
        </View>
      </Modal>
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
    width: '80%',
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scannedText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default About;