import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.compoenent';
import FaqScreen from '../components/Faq.component';
import Faq1 from '../components/Faq1.component';
import Faq2 from '../components/Faq2.component';
import Faq3 from '../components/Faq3.component';
import Faq4 from '../components/Faq4.component';
import Faq5 from '../components/Faq5.component';
import NavigationContext from '../context/Nav.context';

const Stack = createNativeStackNavigator();

const Faq = ({navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      <Stack.Navigator>
          <Stack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq1"
            component={Faq1}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq2"
            component={Faq2}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq3"
            component={Faq3}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq4"
            component={Faq4}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq5"
            component={Faq5}
            options={{ title: 'Frequently asked questions', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />
      </Stack.Navigator>
    </NavigationContext.Provider>
  )
}

export default Faq