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
import Container from '../../Reusable/Container.component';
import WriteupWrapper from '../../Reusable/WriteupWrapper.component';
import { CText, Heading } from '../../Reusable/CustomText.component';

const Hep1 = () => {
  const colors = useContext(ColorContext)

  const styles = StyleSheet.create({
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
    <Container>
      <WriteupWrapper>
        <Heading>
          What does this app contain?
        </Heading>
        <CText>
          This Macbase Educational Jupeb app is a convenient 
          way to access more than 1000 questions and practical
          yearly questions that support study of most recurring questions
          in the future exam. The solutions provide step-by-step
          instruction for solving a range of 1-50 multiple choice questions {'(MCQ)'}
          from each year, in the categories for 
          mathematics {'&'} Biology, Chemistry, physics {'&'} Agric science
          for science and engineering. Also literature, economics,
          accounting, CRS, Government, business studies, history,
          fine-art, geography for Art, management and social science. 
        </CText>
      </WriteupWrapper>
    </Container>
  )
}


export default Hep1