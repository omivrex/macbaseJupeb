import Container from "./Reusable/Container.component"
import { CText, Heading } from "./Reusable/CustomText.component"
import P from "./Reusable/Paragraph.component"
import WriteupWrapper from "./Reusable/WriteupWrapper.component"
import { DataTable } from 'react-native-paper';

const Faq5 = () => {
    return (
        <Container>
            <WriteupWrapper>
                <Heading>JUPEB EXAMINATION COURSES AND CODES FOR MEDICAL SCIENCE AND ENGINEERING</Heading>
                <P>
                    <CText>001-002 (FIRST SEMESTER)</CText>
                    <CText>003-004(SECOND SEMESTER)</CText>
                </P>
                <P>
                    <CText>AGRICULTURAL SCIENCE (J151)</CText>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Course Code</DataTable.Title>
                            <DataTable.Title>course Name</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>AGR 001</DataTable.Cell>
                            <DataTable.Cell>AGRONOMY AND CROP PRODUCTION</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>AGR-002</DataTable.Cell>
                            <DataTable.Cell>ANIMAL SCIENCE AND PRODUCTION</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>AGR-003</DataTable.Cell>
                            <DataTable.Cell>WILDLIFE, AQUACULTURE AND AGRO-FORESTRY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>AGR-004</DataTable.Cell>
                            <DataTable.Cell>AGRICULTURAL ECONOMICS/ EXTENSION</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </P>

                <P>
                    <CText>BIOLOGY (J152)</CText>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Course Code</DataTable.Title>
                            <DataTable.Title>course Name</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>BIO-001</DataTable.Cell>
                            <DataTable.Cell>GENERAL BIOLOGY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>BIO-002</DataTable.Cell>
                            <DataTable.Cell>BASIC BOTANY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>BIO-003</DataTable.Cell>
                            <DataTable.Cell>MICROBIOLOGY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>BIO-004</DataTable.Cell>
                            <DataTable.Cell>FUNDAMENTAL OF ZOOLOGY</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </P>

                <P>
                    <CText>CHEMISTRY (J153)</CText>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Course Code</DataTable.Title>
                            <DataTable.Title>course Name</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>CHM-001</DataTable.Cell>
                            <DataTable.Cell>GENERAL CHEMISTRY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>CHM-002</DataTable.Cell>
                            <DataTable.Cell>PHYSICAL CHEMISTRY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>CHM-003</DataTable.Cell>
                            <DataTable.Cell>INORGANIC CHEMISTRY</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>CHM-004</DataTable.Cell>
                            <DataTable.Cell>ORGANIC CHEMISTRY</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </P>

                <P>
                    <CText>PHYSICS (J155)</CText>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Course Code</DataTable.Title>
                            <DataTable.Title>course Name</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>PHY-001</DataTable.Cell>
                            <DataTable.Cell>MECHANICS AND PROPERTIES OF MATTER</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>PHY-002</DataTable.Cell>
                            <DataTable.Cell>HEAT, WAVES, AND OPTICS</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>PHY-003</DataTable.Cell>
                            <DataTable.Cell>ELECTRICITY AND MAGNETISM</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>PHY-004</DataTable.Cell>
                            <DataTable.Cell>MODERN PHYSICS</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </P>
            </WriteupWrapper>
        </Container>
    )
}

export default Faq5