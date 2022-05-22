import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import RegisterScreen from "../components/Register.component";

const Stack = createNativeStackNavigator();

const Register = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: 'Register', header: ()=> <Header navigation={navigation} title='Register'/>}}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default Register