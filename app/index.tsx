import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('../assets/images/nature.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" hidden />

      {/* Dark overlay */}
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Explore Nature</Text>

          <Text style={styles.subtitle}>
            Discover the world with us.
          </Text>

          <Text style={styles.description}>
            Step into a world where nature welcomes you with open arms. Whether you’re looking to hike, relax, or explore the unseen, we help you connect with the earth in its purest form.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.secondaryText}>
            No sign-up needed. Jump in and start exploring.
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
  },
});
