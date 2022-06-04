import { 
  StyleSheet, 
} from 'react-native';

import {useContext} from 'react';
import { DataTable } from 'react-native-paper';


import ColorContext from '../../context/Colors.context';
import Container from '../../Reusable/Container.component';
import WriteupWrapper from '../../Reusable/WriteupWrapper.component';
import { BoldedText, CText, Heading } from '../../Reusable/CustomText.component';
import P from '../../Reusable/Paragraph.component';
  
  const Faq2 = () => {
    const colors = useContext(ColorContext)
  
    const styles = StyleSheet.create({
      
    })
  
    return (
      <Container>
        <WriteupWrapper>
          <Heading>JUPEB SCORING GRADE ALLOCATION</Heading>
          <P>
            <CText>
              Each subject is to be broken into four courses to be taken, two per semester, by the candidate. The results in all the courses are to be merged at the end of the semester to obtain the candidate's grade in that particular subject.
              Each candidate is expected to take twelve (12) courses, six per semester, and a general studies course.  The general studies for courses in each university faculty will be based on relevant General courses suggested for that Faculty by each university.
              The students upon completion of the program will be issued certificates based on their level of performance which bears letter grades of A, B, C, D, E, or F in each of the three subjects and general studies paper. A mock exam that forms 30% of the total score in each subject is conducted by the institution and forwarded to the board. The board’s exams take the remaining 70%. The results issued by the JUPEB are graded like Cambridge A/Level results.
            </CText>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Scores(%)</DataTable.Title>
                <DataTable.Title>Points</DataTable.Title>
                <DataTable.Title>Grades</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>70-100</DataTable.Cell>
                <DataTable.Cell>5</DataTable.Cell>
                <DataTable.Cell>A</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>60-69</DataTable.Cell>
                <DataTable.Cell>4</DataTable.Cell>
                <DataTable.Cell>B</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>50-59</DataTable.Cell>
                <DataTable.Cell>3</DataTable.Cell>
                <DataTable.Cell>C</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>45-49</DataTable.Cell>
                <DataTable.Cell>2</DataTable.Cell>
                <DataTable.Cell>D</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>40-44</DataTable.Cell>
                <DataTable.Cell>1</DataTable.Cell>
                <DataTable.Cell>E</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>39-0</DataTable.Cell>
                <DataTable.Cell>0</DataTable.Cell>
                <DataTable.Cell>F</DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <CText>
              <BoldedText>Grade point calculation</BoldedText>: A candidate with, 3 grades because you should offer not more than 3 subjects. Every department with required cut-off point i.e
            </CText>
            <CText>
              AAA = 5+5+5 = 15 POINTS
            </CText>
            <CText>
              AAB = 5+5+4 = 14 POINTS
            </CText>
            <CText>
              BBB = 4+4+4 = 12 POINTS
            </CText>
            <CText>
              CCC= 3+3+3 = 9 POINTS
            </CText>
            <CText>
              CDF = 3+2+0 = 5 POINTS e.t.c
            </CText>
          </P>
        </WriteupWrapper>
      </Container>
    )
  }
  
  
  export default Faq2