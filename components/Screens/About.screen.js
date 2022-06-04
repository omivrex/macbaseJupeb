import Container from '../Reusable/Container.component';
import WriteupWrapper from '../Reusable/WriteupWrapper.component';
import P from '../Reusable/Paragraph.component';
import { CText, Heading } from '../Reusable/CustomText.component';

const AboutScreen = () => {
  return (
    <Container>
      <WriteupWrapper>
          <P>
            <CText>
              Welcome to the Macbase Educational Jupeb app
              from Macbase Professional! This is your one-stop
              store of value for Jupeb with great content to build your skills,
              whether you are learning by yourself or studying for class. Designed by
              our expert authors and programmers, these bonus learning tools,
              practical questions with solutions, and a grade point calculator 
              are perfect for studying on the go!
            </CText>
          </P>

          <P>
            <Heading>Who We Are?</Heading>
            <CText>
              Macbase is a Multi-educational resource designed
              to solve academic problems faced by aspirants to
              several secondary and tertiary institutions in 
              Nigeria.
            </CText>
            <CText>
              The company was established in 2019 as Jiproford 
              institute, later in October 2019, the company 
              compiled a compendium on the Jupeb past 
              questions. 
            </CText>
            <CText>
              The main business of macbase educational 
              services is the publication and marketing of 
              textbooks and digital content for the entire 
              gamut of the education system for the tertiary 
              aspirants, on WAEC, NECO, JAMB, JUPEB, IJMB, 
              NABTEB ETC.
            </CText>
            <CText>
              Today, the company has the widest range of 
              books/educational resources and a very expensive
              distribution network in Nigeria.
            </CText>
            <CText>
              As part of the service, the company also 
              provide Exam solutions to various kinds of 
              subscribers and also refers links for admission
              into the various tertiary institution through
              direct entry only.
            </CText>
          </P>

          <P>
            <Heading>OUR VISION</Heading>
            <CText>
              To empower students seeking admission in order to be admitted.
            </CText>
          </P>

          <P>
            <Heading>OUR VALUE</Heading>
            <CText>
              We don’t accept payment on any service we 
              are not capable of rendering. No questions 
              asked.
            </CText>
            <CText>
              We deliver books purchased from us to any 
              location in Nigeria within a maximum of 3 
              working days.
            </CText>
            <CText>
              We keep time based on agreement.
            </CText>
          </P>

          <P>
            <Heading>APP TERMS AND CONDITIONS</Heading>
            <CText>
              1. The Content is a copyrighted work of Macbase
              Educational and Macbase Education reserves all 
              rights in and to the Content. The Work is 2022 
              by Macbase Educational.
            </CText>

            <CText>
              2. The user is receiving only a limited right
              to use the Content for user own internal or personal
              use. The user may not reproduce, forward, modify, create derivative
              works based upon, transmit, distribute, disseminate, sell, publish
              or sublicense the Content or in any way commingle the Content with 
              other third party content, without Macbase Education's consent.
            </CText>
          </P>
      </WriteupWrapper>
    </Container>
  )
}


export default AboutScreen