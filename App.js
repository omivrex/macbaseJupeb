import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './components/drawer.navigation';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav/>      
      <StatusBar style='light'/>
    </NavigationContainer>
  );
}