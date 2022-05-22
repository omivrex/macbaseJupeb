import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.compoenent';
import AboutScreen from '../components/About.component';

const Stack = createNativeStackNavigator();

const About = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{ title: 'About', header: ()=> <Header navigation={navigation} title='About'/>}}
        />
    </Stack.Navigator>
  )
}

export default About