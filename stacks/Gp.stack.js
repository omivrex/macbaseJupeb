import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import GpScreen from '../components/Gp.component';

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