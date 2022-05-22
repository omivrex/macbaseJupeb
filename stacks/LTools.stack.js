import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import LtoolsScreen from '../components/LTools.component';

const Stack = createNativeStackNavigator();

const LTools = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="LtoolsScreen"
            component={LtoolsScreen}
            options={{ title: 'Learning Tools', header: ()=> <Header navigation={navigation} title='Learning Tools'/>}}
        />
    </Stack.Navigator>
  )
}

export default LTools