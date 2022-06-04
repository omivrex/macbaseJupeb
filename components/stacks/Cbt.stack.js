import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Reusable/Header.component';
import CbtScreen from '../Screens/Cbt.screen';

const Stack = createNativeStackNavigator();

const Cbt = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="CbtScreen"
            component={CbtScreen}
            options={{ title: 'CBT Test', header: ()=> <Header navigation={navigation} title='CBT Test'/>}}
        />
    </Stack.Navigator>
  )
}

export default Cbt