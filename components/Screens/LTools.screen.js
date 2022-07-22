import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
import * as React from 'react';
import PDFReader from 'rn-pdf-reader-js'
  
import Container from '../Reusable/Container.component';
import { learningTools } from '../../utils/learningTools.pdf.js';

  
const LtoolsScreen = () => {
  return (
    <Container>
      <PDFReader
        withPinchZoom={true}
        withScroll={true}
        source={{base64: learningTools}}
      />
    </Container>
  )
}
  
const styles = StyleSheet.create({
  
})
  
  export default LtoolsScreen