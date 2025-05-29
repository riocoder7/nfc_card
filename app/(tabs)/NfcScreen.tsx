// app/(tabs)/NfcScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { Linking, TouchableOpacity } from 'react-native';


NfcManager.start();

export default function NfcScreen() {
  const [status, setStatus] = useState('Idle');
  const [result, setResult] = useState<string>('');
  const [showPrompt, setShowPrompt] = useState(false);


  /* ---------- cancel pending tech on unmount ---------- */
  useEffect(() => () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }, []);

  /* ------------ COMMON HELPERS ------------- */
  const decodeFirstRecord = (record: Ndef.NdefRecord) => {
    const bytes = Uint8Array.from(record.payload);

    // URI record?
    if (
      record.tnf === Ndef.TNF_WELL_KNOWN &&
      Ndef.util.bytesToString(record.type) === 'U'
    ) {
      return Ndef.uri.decodePayload(bytes);               // https://example.com
    }

    // Text record (language-code trimmed automatically)
    if (
      record.tnf === Ndef.TNF_WELL_KNOWN &&
      Ndef.util.bytesToString(record.type) === 'T'
    ) {
      return Ndef.text.decodePayload(bytes);              // plain text
    }

    // Anything else → hex
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join(' ');
  };

  /* ------------ WRITE URL ------------- */
  const writeUrl = async () => {
    const url = 'https://alam198.github.io/codespark/';
    const message = [Ndef.uriRecord(url)];
    const bytes = Ndef.encodeMessage(message);

    setStatus('Writing…');
    try {
      /* 1️⃣ try if tag is already NDEF */
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Hold phone near tag to write',
      });
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      Alert.alert('Success', `URL written:\n${url}`);
    } catch {
      /* 2️⃣ blank tag?  Format then write */
      try {
        await NfcManager.requestTechnology(NfcTech.NdefFormatable, {
          alertMessage: 'Formatting tag…',
        });
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        Alert.alert('Success', `Tag formatted & URL written`);
      } catch (err) {
        Alert.alert('Write failed', String(err));
      }
    } finally {
      setStatus('Idle');
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
  };

  /* ------------ READ (URI or TEXT) ------------- */
  const readTag = async () => {
    setShowPrompt(true);
    setStatus('Reading…');
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Hold phone near tag to read',
      });
      const tag = await NfcManager.getTag();

      if (!tag?.ndefMessage?.length) {
        throw new Error('No NDEF message on tag');
      }

      const record = tag.ndefMessage[0];
      const text = decodeFirstRecord(record);

      setResult(text);
      Alert.alert('Read success', text);
    } catch (err) {
      Alert.alert('Read failed', String(err));
    } finally {
      setShowPrompt(false);
      setStatus('Idle');
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
  };

  /* ------------ UI ------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.status}>Status: {status}</Text>

      <View style={styles.button}>
        <Button title="Write URL to NFC" onPress={writeUrl} />
      </View>

      <View style={styles.button}>
        <Button title="Read NFC Tag" onPress={readTag} />

      </View>

      {showPrompt && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Please tap your card on the back of your phone</Text>
        </View>
      )}

<ScrollView style={{ marginTop: 20, width: '100%' }}>
  {result ? (
    <TouchableOpacity
      onPress={async () => {
        setShowPrompt(true); // show prompt

        setTimeout(() => {
          setShowPrompt(false); // hide after 2s
        }, 2000);

        if (result.startsWith('http')) {
          await Linking.openURL(result); // open in browser
        } else {
          Alert.alert('Result', result); // fallback alert
        }
      }}
    >
      <Text style={styles.result}>{result}</Text>
    </TouchableOpacity>
  ) : null}
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  button: { marginVertical: 10, width: '80%' },
  result: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  overlayText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },

});
