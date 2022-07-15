import Container from '../../Reusable/Container.component';
import { CText, Heading } from '../../Reusable/CustomText.component';
import WriteupWrapper from '../../Reusable/WriteupWrapper.component';

const Hep3 = () => {
  return (
    <Container>
      <WriteupWrapper>
        <Heading>
          Can I access this app on multiple devices?
        </Heading>
        <CText>
          The Macbase Educational Jupeb app is available in iOS format (in the iTunes Store, for iPhone and iPad) and for Android (in the Google Play Stores). It is also available on the web (www.Macbaze.com) as an online application.
        </CText>
        <CText>
          However, note that if you access the app on different platforms, your progress will not be synced across devices.
        </CText>
      </WriteupWrapper>
    </Container>
  )

}

export default Hep3