import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Reusable/Header.component';
import GpScreen from '../Screens/Gp.screen';

const Stack = createNativeStackNavigator();

const Gp = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="GpScreen"
            component={GpScreen}
            options={{ title: 'GP Calculator', header: ()=> <Header navigation={navigation} title='GP Calculator'/>}}
        />
    </Stack.Navigator>
  )
}

export default Gp