import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
import {useEffect, useRef} from 'react';
import Container from '../Reusable/Container.component';
import { getOnlineCollections } from '../../utils/pastquestions.utils';
  
const PqScreen = () => {
  const path = useRef('pastquestions')
  useEffect(() => {
    getOnlineCollections(path.current).then((data) => {
      console.log('pqData:', data)
    })
  }, [])
  
  return (
    <Container>

    </Container>
  )
}
  
  const styles = StyleSheet.create({
  
  })
  
  export default PqScreen