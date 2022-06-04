import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Reusable/Header.component';
import PqScreen from '../Screens/Pq.screen';

const Stack = createNativeStackNavigator();

const PQ = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="PQscreen"
            component={PqScreen}
            options={{ title: 'Past Questions', header: ()=> <Header navigation={navigation} title='Past Questions'/>}}
        />
    </Stack.Navigator>
  )
}

export default PQ