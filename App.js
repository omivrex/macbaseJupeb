import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './components/drawer.navigation';
import DownloadCourseComponent from './components/Reusable/DownloadCourse.component';

export default function App() {
  return (
    <NavigationContainer>
      <DownloadCourseComponent/>
      {/* <DrawerNav/> */}
      <StatusBar style='light'/>
    </NavigationContainer>
  );
}