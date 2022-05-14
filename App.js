import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './stacks/Home.stack';
import DrawerNav from './drawer.navigation';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav/>      
      <StatusBar style='light'/>
    </NavigationContainer>
  );
}