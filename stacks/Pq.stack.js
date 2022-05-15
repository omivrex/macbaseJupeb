import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.compoenent';
import PqScreen from '../components/Pq.component';

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