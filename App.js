import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './components/drawer.navigation';
import DownloadCourseComponent from './components/Reusable/DownloadCourse.component';
import { useState } from 'react';
import DownloadContext from './components/context/Download.context';

export default function App() {
  const [shouldOpenDownloadComponent, setshouldOpenDownloadComponent] = useState(false)
  
  const toggleDownloadComponent = () => setshouldOpenDownloadComponent(!shouldOpenDownloadComponent)

  return (
    <NavigationContainer>
      <DownloadContext.Provider value={toggleDownloadComponent}>
        {
          shouldOpenDownloadComponent?
          <DownloadCourseComponent/>:
          <DrawerNav/>
        }
      </DownloadContext.Provider>
      <StatusBar style='light'/>
    </NavigationContainer>
  );
}