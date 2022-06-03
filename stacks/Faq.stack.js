import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import FaqScreen from '../components/Faq.component';
import Faq1 from '../components/Faq1.component';
import Faq2 from '../components/Faq2.component';
import Faq3 from '../components/Faq3.component';
import Faq4 from '../components/Faq4.component';
import Faq5 from '../components/Faq5.component';
import Faq6 from '../components/Faq6.component';
import Faq7 from '../components/Faq7.component';
import Faq8 from '../components/Faq8.component';
import Faq9 from '../components/Faq9.component';
import Faq10 from '../components/Faq10.component';
import NavigationContext from '../context/Nav.context';

const Stack = createNativeStackNavigator();

const Faq = ({navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      <Stack.Navigator>
          <Stack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq1"
            component={Faq1}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq2"
            component={Faq2}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq3"
            component={Faq3}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq4"
            component={Faq4}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq5"
            component={Faq5}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          />

          <Stack.Screen
            name="Faq6"
            component={Faq6}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          /> 

          <Stack.Screen
            name="Faq7"
            component={Faq7}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          /> 

          <Stack.Screen
            name="Faq8"
            component={Faq8}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          /> 

          <Stack.Screen
            name="Faq9"
            component={Faq9}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          /> 

          <Stack.Screen
            name="Faq10"
            component={Faq10}
            options={{ title: 'FAQs', header: ()=> <Header navigation={navigation} title='FAQs'/>}}
          /> 
      </Stack.Navigator>
    </NavigationContext.Provider>
  )
}

export default Faq