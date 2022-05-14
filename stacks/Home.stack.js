import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../components/HomeScreen.component";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Dashboard' }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default HomeStack