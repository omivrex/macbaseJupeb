import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './components/Header.compoenent';
import HomeStack from './stacks/Home.stack';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator 
        initialRouteName={"Home"} 
        backBehavior={'history'}
        screenOptions={{
            headerShown: true,
            headerTransparent:true,
            header: ()=> <></>
        }}
        drawerLabelStyle = {{color: '#1c1c74' }}
        >
        <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  )
}

export default DrawerNav