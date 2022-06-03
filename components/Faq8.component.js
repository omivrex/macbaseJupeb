import Container from "./Reusable/Container.component"
import { BoldedText, CText, Heading } from "./Reusable/CustomText.component"
import P from "./Reusable/Paragraph.component"
import WriteupWrapper from "./Reusable/WriteupWrapper.component"
import { DataTable } from 'react-native-paper';

const Faq8 = () => {
    return (
        <Container>
            <WriteupWrapper>
                <P>
                    <Heading>How To Check your Jupeb result from the Jupeb result portal</Heading>
                    <CText>
                        To check your Jupeb result after the completion of the examination, JUPEB students need to visit the official JUPEB portal armed with their examination registration number. Though candidates have the opportunity to check their results in two ways. The first one is to check the result from the Jupeb portal and the second way to view your JUPEB final result is to get it from the school where you attend your JUPEB program. The result could be pasted on the wall of your faculty or anything related to something like that.
                    </CText>
                    <CText>
                        Also, where you receive your JUPEB lectures, the management of the school can decide to post the result on their official website pages meant for JUPEB candidates.
                    </CText>
                </P>

                <BoldedText>PROCEDURES:</BoldedText>
                <P>
                    <CText>
                        1. Go directly to the result portal
                    </CText>
                    <CText>
                        2. Input your examination number on the first field
                    </CText>
                    <CText>
                        3. Input your surname  (father’s name) on the second field
                    </CText>
                    <CText>
                        4. Click the check button below it
                    </CText>
                    <CText>
                        5. Your result will be displayed to you. In form of A, B, C, D, E, and F
                    </CText>
                </P>

                <P>
                    <BoldedText>Requirements for Direct Entry Admission In Nigeria</BoldedText>
                    <CText>
                        A minimum of 5 credits in the Senior Secondary Certificate Examinations (SSCE/GCE) Ordinary Level Credits in a maximum of two (2) sittings. Some schools like UNILAG required one sitting.
                    </CText>
                    <CText>
                        Degree (First Class/Second Class Upper) in related fields.
                    </CText>
                    <CText>
                        Direct entry candidates are required to purchase the Direct Entry form through the Joint Admission and Matriculation Board (JAMB) And your school of choice Portal. i.e after buying the direct entry form from JAMB, you will have to wait for your school's direct entry form to be out.
                    </CText>
                    <CText>
                        A minimum of Merit Pass in the National Certificate of Education (NCE), National Diploma (ND), and other Advanced Level Certificates.
                    </CText>
                    <CText>
                        Other qualifications such as JUPEB, DIPLOMA, PRE–DEGREE, and IJMB, are acceptable to the Senate of the University and are equivalent to (1) and (4) above. In addition to the above minimum admission requirements, candidates must also satisfy such Faculty/Departmental entry requirements.
                    </CText>
                    <CText>
                        How Much Is Direct Entry Form For 2022/2023?
                    </CText>
                    <CText>
                        The management of the Joint Admissions and Matriculation Board (JAMB) has announced Four Thousand Seven Hundred Naira (N4,700) as the latest cost Price for the 2022 Direct Entry FORM.
                    </CText>
                    <CText>
                        This means that Direct Entry form 2022 sales at Four Thousand Seven Hundred Naira (N4,700).
                    </CText>
                </P>

                <P>
                    <BoldedText>JUPEB CUT-OFF MARKS</BoldedText>
                    <CText>
                        The cut-off mark for JUPEB program admission into Nigerian universities is almost the same among the list of the universities in Nigeria that accepts JUPEB result into 200 level. We will provide you with the cut-off for Unilag, Uniport, OAU, Unilorin, UNN, FUTO, and other universities in Nigeria.
                    </CText>
                    <CText>
                        For you to be able to gain admission with JUPEB, you must be able to have a minimum of 5 points out of the total 15 points. Now, since each course has its own cut-off marks, we are going to blush through it.
                    </CText>
                    <CText>
                        Important info: some universities do not accept less than 7,8,9 points for any course at all. What you are seeing here is an average cut-off mark.
                    </CText>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Courses/department</DataTable.Title>
                            <DataTable.Title>Cut-off</DataTable.Title>
                            <DataTable.Title>University</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Medicine</DataTable.Cell>
                            <DataTable.Cell>13</DataTable.Cell>
                            <DataTable.Cell>OAU</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Medicine</DataTable.Cell>
                            <DataTable.Cell>12</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Engineering e.g. mechanical, civil</DataTable.Cell>
                            <DataTable.Cell>8</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Mathematics</DataTable.Cell>
                            <DataTable.Cell>8</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Chemistry</DataTable.Cell>
                            <DataTable.Cell>8</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Physics</DataTable.Cell>
                            <DataTable.Cell>8</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Social sciences i.e environmental, management and business courses e.g Architecture, surveying, information management</DataTable.Cell>
                            <DataTable.Cell>7</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Agriculture e.g. soil science, agric extension</DataTable.Cell>
                            <DataTable.Cell>5</DataTable.Cell>
                            <DataTable.Cell>All</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </P>
            </WriteupWrapper>
        </Container>
    )
}

export default Faq8