import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import Header from './components/Header.compoenent';
import HomeStack from './stacks/Home.stack';
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
      drawerLabelStyle = {{color: '#1c1c74' }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  )
}

export default DrawerNav