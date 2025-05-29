// app/(tabs)/NfcScreen.tsx or app/nfc.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Init NFC
NfcManager.start();

export default function NfcScreen() {
  const [status, setStatus] = useState('Idle');
  const [readResult, setReadResult] = useState('');

  useEffect(() => {
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    };
  }, []);

  const readNfcA = async () => {
    setStatus('Reading...');
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      console.log('Tag found:', tag);

      const tagInfo = tag ? JSON.stringify(tag, null, 2) : 'No tag data';
      setReadResult(tagInfo);
      Alert.alert('Read Success', tagInfo);
    } catch (e) {
      console.warn('Read NFC Error:', e);
      Alert.alert('Read Failed', String(e));
    } finally {
      setStatus('Idle');
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeNfcA = async () => {
    setStatus('Writing...');
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);

      const page = 4;
      const text = 'ABCD';
      let bytes = Array.from(new TextEncoder().encode(text));
      while (bytes.length < 4) bytes.push(0); // pad to 4 bytes

      const command = [0xA2, page, ...bytes]; // WRITE command
      const response = await NfcManager.transceive(command);

      console.log('Write response:', response);
      Alert.alert('Write Success', `Wrote "${text}" to page ${page}`);
    } catch (e) {
      console.warn('Write NFC Error:', e);
      Alert.alert('Write Failed', String(e));
    } finally {
      setStatus('Idle');
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Status: {status}</Text>

      <View style={styles.button}>
        <Button title="Read NFC (NfcA)" onPress={readNfcA} />
      </View>

      <View style={styles.button}>
        <Button title="Write NFC (NfcA)" onPress={writeNfcA} />
      </View>

      {readResult ? (
        <Text style={styles.result}>{readResult}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  button: { marginVertical: 10, width: '80%' },
  result: { marginTop: 20, textAlign: 'center', color: 'gray' },
});
