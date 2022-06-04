import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    SafeAreaView
  } from 'react-native';
  import {useContext} from 'react';
  
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import ColorContext from '../../context/Colors.context';
  
  const Faq1 = () => {
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
    
      wraper: {
        width: wp('95%'),
        height: '100%',
        padding: 25,
        left: wp('2.5%'),
        overflow: 'scroll',
        backgroundColor: colors.backgroundColor,
      },

      heading: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center'
      },
            
      text: {
        margin: '2.5%'
      }
    
    })
  
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.curve}>
          </View>
            <View style={styles.contentList}>
              <ScrollView style={styles.wraper}>
                <Text style={styles.heading}>Will ASUU Strike Affect JAMB? IJMB? or JUPEB?</Text>
                <Text style={styles.text}>
                  If you ask me if the ASUUstrike would affect JUPEB I would rather say is relative " No " because ASUU is not in charge of governing the joint university preliminary examination board(JUPEB) for the following reasons:
                </Text>
                <Text style={styles.text}>
                  1. Jupeb staffs are paid by their study centers and not the federal government
                </Text>
                <Text style={styles.text}>
                  2. Jupeb doesn't work with the university or center's "Academic calendar" and semester routines
                </Text>
                <Text style={styles.text}>
                  3. Jupeb is just a program similar to its counterparts such as jamb, ijmb, and the rest A'level programs
                </Text>
                <Text style={styles.text}>
                  4. Jupeb runs a separate body and owns its own headquarters located in Lagos, just that universities are just used as study centers
                </Text>
                <Text style={styles.text}>
                  5. Jupeb students are not yet students but potential students of their desired center or university.
                </Text>
              </ScrollView>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Faq1