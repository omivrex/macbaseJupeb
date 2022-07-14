import { 
  Text, 
} from 'react-native';
import Container from '../../Reusable/Container.component';
import { CText, Heading } from '../../Reusable/CustomText.component';
import WriteupWrapper from '../../Reusable/WriteupWrapper.component';

const Hep3 = () => {
  return (
    <Container>
      <WriteupWrapper>
        <Heading>
          How do I keep track of my Progress?
        </Heading>
        <CText>
          Once you have viewed a video or listened to an audio recording, a blue bullet appears next to that item in the context menu. This provides a convenient record of your progress.
        </CText>
        <CText>
          <Text style={{fontWeight: 'bold'}}>Note:</Text> if you are using the web-based application, your past scores will be lost if you delete cookies in your browser.
        </CText>
      </WriteupWrapper>
    </Container>
  )

}
  
export default Hep3