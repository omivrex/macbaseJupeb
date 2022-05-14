import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './stacks/home.stack';

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack/>
      {/* <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
      </SafeAreaView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
