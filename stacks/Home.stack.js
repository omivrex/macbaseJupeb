import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationContext from '../context/Nav.context';
import Header from '../components/Header.compoenent';
import HomeScreen from "../components/HomeScreen.component";
import PQ from './Pq.stack';
import Cbt from './Cbt.stack';
import Faq from './Faq.stack';
import Gp from './Gp.stack';
import LTools from './LTools.stack';
const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <NavigationContext.Provider value={navigation}>
      <Stack.Navigator>
          <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: 'Dashboard', header: ()=> <Header navigation={navigation} title='Dashboard'/>}}
          />
          <Stack.Screen name="Past Questions" component={PQ} />
          <Stack.Screen name="CBT test" component={Cbt} />
          <Stack.Screen name="Learning tools" component={LTools} />
          <Stack.Screen name="GP Calculator" component={Gp} />
          <Stack.Screen name="Frequently asked questions" component={Faq} />
      </Stack.Navigator>
    </NavigationContext.Provider>
  )
}

export default HomeStack