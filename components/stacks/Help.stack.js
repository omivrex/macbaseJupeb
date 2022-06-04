import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Reusable/Header.component';
import HelpScreen from '../Screens/Help/Help.component';
import Hep1 from '../Screens/Help/Hep1.component';
import Hep2 from '../Screens/Help/Hep2.component';
import Hep3 from '../Screens/Help/Hep3.component';
import Hep4 from '../Screens/Help/Hep4.component';
import NavigationContext from '../context/Nav.context';

const Stack = createNativeStackNavigator();
const Help = ({navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      <Stack.Navigator>
        <Stack.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />

        <Stack.Screen
          name="Hep1"
          component={Hep1}
          options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />

        <Stack.Screen
          name="Hep2"
          component={Hep2}
          options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />

        <Stack.Screen
          name="Hep3"
          component={Hep3}
          options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />

        <Stack.Screen
          name="Hep4"
          component={Hep4}
          options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />
      </Stack.Navigator>
    </NavigationContext.Provider>
  )
}

export default Help