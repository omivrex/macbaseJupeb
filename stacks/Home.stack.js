import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.compoenent';
import HomeScreen from "../components/HomeScreen.component";

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Dashboard', header: ()=> <Header navigation={navigation} title='Dashboard'/>}}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default HomeStack