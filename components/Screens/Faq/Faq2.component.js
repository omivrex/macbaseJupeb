import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    SafeAreaView,
    Linking
} from 'react-native';
import {useContext} from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../../context/Colors.context';
import P from '../../Reusable/Paragraph.component';
import { BoldedText, CText, Heading } from '../../Reusable/CustomText.component';

const Faq2 = () => {
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

})

return (
    <SafeAreaView>
    <View style={styles.container}>
        <View style={styles.curve}>
        </View>
        <View style={styles.contentList}>
            <ScrollView style={styles.wraper}>
                <Heading>
                    WHAT IS JUPEB?
                </Heading>
            
            <P>
                <CText>
                    It is the acronym for 
                    <BoldedText>Joint University Preliminary Examination Board</BoldedText>, it is a newly Approved, Proven,
                    and Certified Advanced Level examination body established and coordinated by the University of Lagos. the program is similar to the interim joint matriculation Board (IJMB) coordinated by Ahmadu Bello University. It has a coordinating body in various tertiary institutions and different affiliated study centers nationwide. The program is specifically for candidates who cannot gain admission to regular degree programs in Nigerian Universities for one reason or 
                    the other, as the program only requires candidates' o’level results,
                    also awaiting results candidates can Enroll.
                </CText>
            </P>

            <P>
                <CText>
                    <BoldedText>Approved: </BoldedText> By the Federal Government has a
                    platform for securing admission into higher institutions in the country and abroad.
                </CText>
            </P>

            <P>
                <CText>
                    <BoldedText>Proven: </BoldedText>
                    Yearly, about 20,000 applicants put in for the program in 
                    which more than 70% fraction successfully secure admission with 
                    it into 200 level 
                    to their preferred institution and course of study.
                </CText>
            </P>
            
            <P>
                <CText>
                    <BoldedText>Certified: </BoldedText> By Nigeria University Commission (NUC) has an Advanced level examination that qualifies students for 200level via Direct Entry.
                </CText>
            </P>

            <P>
                <Heading>WHEN JUPEB RESUMPTION DATE AND DURATION?</Heading>
                <CText>
                    The resumption date for registered JUPEB candidates is usually August
                    September yearly. The program runs for 10 months and ends in 
                    June/July the following year. Prior to the 
                    resumption, candidates who are interested in staying in the 
                    school hostel to apply as soon as possible.
                    Also, be informed that the resumption date varies for all institutions running the program. If you are not sure of the specific date, kindly contact us now.
                </CText>
            </P>

            <P>
                <Heading>JUPEB REGISTRATION PROCEDURES</Heading>
                <CText>
                    The registration process for the JUPEB program is very simple
                    and we are going to put through the process.  If you 
                    are yet to apply for the program and you do 
                    not know the steps to follow, we will be showing you two ways 
                    you can apply for JUPEB admission without stress.
                </CText>
            </P>

            <P>
                <Heading>JUPEB TUITION FEE</Heading>
                <CText>
                    Jupeb application form is #17,000.
                </CText>
                <CText>
                    Jupeb school fees vary from one center to another.
                    Generally, Jupeb fees is between #200,000 and #700,000.
                    However, the price at various centers ranges. 
                    Kindly contact us for possible fees 
                    in your preferred state of choice…  
                    <Text style={{textDecorationLine: 'underline', color: colors.appColor}} onPress = {()=>Linking.openURL(`tel:08136550519`)}> 08136550519 </Text>
                    Or <Text style={{textDecorationLine: 'underline', color: colors.appColor}} onPress = {()=>Linking.openURL(`tel:08165541591`)} > 08165541591</Text>
                </CText>
            </P>

            <P>
                <Heading>JUPEB REGISTRATION PROCEDURES</Heading>
                <CText>
                    The registration process for the JUPEB program is very
                    simple and we are going to put through the process.  
                    If you are yet to apply for the program and you do not 
                    know the steps to follow, we will be showing you two ways 
                    you can apply for JUPEB admission without stress.
                </CText>
            </P>

            <P>
                <Heading>BENEFITS OF RUNNING JUPEB</Heading>
                <CText>
                    - No jamb is required
                </CText>
                <CText>
                    - The result validity period is uncertain
                </CText>
                <CText>
                    - Admission to 200level
                </CText>
                <CText>
                    - Not usually affected by university strikes and vacations
                </CText>
                <CText>
                    - Tuition fee paid in installments is permitted but usually twice the most.
                </CText>
                <CText>
                    - Freedom to be admitted to another school different from your center with direct entry.
                </CText>
            </P>

            <P>
                <BoldedText>Difference between JAMB and JUPEB</BoldedText>
                <CText>
                    1. Jamb exam is CBT (computer-based test) but jupeb is paper type
                </CText>
                <CText>
                    2. The jamb exam is written once but the jupeb exam last for 2weeks intermittently.
                </CText>
                <CText>
                    3. The time to seat for the jamb exam is periodic for each candidate but for jupeb, everyone writes the same time.
                </CText>
                <CText>
                    4. Jupeb exam is both internal and external but jamb is purely external.
                </CText>
                <CText>
                    5. For jamb registration takes place only in an accredited center but jupeb any business computer center.
                </CText>
                <CText>
                    6. Jupeb caters to tutoring and accommodation while jamb does not.
                </CText>
                <CText>
                    7. Jamb result comes out after 2weeks while jupeb usually 2month.
                </CText>
                <CText>
                    8. After jamb, you get to write postume, but for jupeb postume is not required
                </CText>
                <CText>
                    9. The risk of going through jamb or jupeb has been debated over this year's but we can't tell which one is better for you. it only depends on what leverage you possess a for competitive advantage for you.
                </CText>
                <CText>
                    10. Jamb is cheap financially but jupeb is relatively expensive.
                </CText>
                <CText>
                    <BoldedText>Disclaimer: </BoldedText>
                    We offer professional help to advise you on which to choice, except for those we can connect with. We advise seeking a close-by professional for any professional advice.
                </CText>

            </P>

            </ScrollView>
        </View>
    </View>
    </SafeAreaView>
)
}
  
  
export default Faq2