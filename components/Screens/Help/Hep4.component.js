import Container from '../../Reusable/Container.component';
import { CText, Heading } from '../../Reusable/CustomText.component';
import WriteupWrapper from '../../Reusable/WriteupWrapper.component';

const Hep4 = () => {
  return (
    <Container>
      <WriteupWrapper>
        <Heading>
          Do I need Internet access to use the app?
        </Heading>
        <CText>
          No, once you download the app, you don’t
          need Internet access to assess other features
          of the App as long as your premium subscription
          is made. This is necessary to prevent the app from
          becoming too large.
        </CText>
      </WriteupWrapper>
    </Container>
  )

}


export default Hep4