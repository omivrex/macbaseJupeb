import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.compoenent';
import FaqScreen from '../components/Faq.component';

const Stack = createNativeStackNavigator();

const Faq = ({navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
        />
    </Stack.Navigator>
  )
}

export default Faq