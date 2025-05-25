import React from "react";
import { StyleSheet, Text, View, Button, Image, GestureResponderEvent } from "react-native";


export default class App extends React.Component {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
         
          <Text style={styles.title}>AlligatorChef</Text>
          <Text style={styles.subtitle}>Providing cajun bacon recipes since 1987</Text>
        </View>
        <View style={styles.middleContainer}>
          <Button title="Learn More" onPress={this.onPress} color="#fff" />
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Contact Us" onPress={this.onPress} color="#fff" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#008F68',
  },
  subtitle: {
    fontSize: 16,
    color: '#008F68',
  },
});