import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Reusable/Header.component';
import LtoolsScreen from '../Screens/LTools.screen';

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