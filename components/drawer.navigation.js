import { createDrawerNavigator } from '@react-navigation/drawer';

import Cbt from './stacks/Cbt.stack';
import Faq from './stacks/Faq.stack';
import Gp from './stacks/Gp.stack';
import Help from './stacks/Help.stack';
import About from './stacks/About.stack';
import HomeStack from './stacks/Home.stack';
import LTools from './stacks/LTools.stack';
import PQ from './stacks/Pq.stack';
import Register from './stacks/Register.stack';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator 
      initialRouteName={"Home"} 
      backBehavior={'history'}
      screenOptions={{
          headerShown: false,
          headerTransparent:true,
          header: ()=> <></>
      }}
      drawerLabelStyle = {{backgroundColor: '#1c1c74',  }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Past questions" component={PQ} />
        <Drawer.Screen name="CBT test" component={Cbt} />
        <Drawer.Screen name="Learning tools" component={LTools} />
        <Drawer.Screen name="GP Calculator" component={Gp} />
        <Drawer.Screen name="FAQs" component={Faq} />
        <Drawer.Screen name="Help" component={Help} />
        <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export default DrawerNav