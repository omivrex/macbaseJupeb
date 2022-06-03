import { 
    StyleSheet, 
    View,
    SafeAreaView
  } from 'react-native';
  import {useContext} from 'react';
  
  import ColorContext from '../../context/Colors.context';
  
  const Container = ({children}) => {
    const colors = useContext(ColorContext)
  
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#1c1c74',
  
      },
      
      curve: {
        backgroundColor: colors.backgroundColor,
        borderBottomRightRadius: 2500,
        width: '100%',
        height: '70%',
        position: 'absolute',
      },
    })
  
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.curve}>
          </View>
            {children}
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Container