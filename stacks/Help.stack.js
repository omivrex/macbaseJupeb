import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import HelpScreen from '../components/Help.component';

const Stack = createNativeStackNavigator();

const Help = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="HelpScreen"
            component={HelpScreen}
            options={{ title: 'Help', header: ()=> <Header navigation={navigation} title='Help'/>}}
        />
    </Stack.Navigator>
  )
}

export default Help