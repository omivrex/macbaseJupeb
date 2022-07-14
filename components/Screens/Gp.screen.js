import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight,
    TextInput,
    SafeAreaView
  } from 'react-native';
import {useState, useContext} from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
import Container from '../Reusable/Container.component';
import WriteupWrapper from '../Reusable/WriteupWrapper.component';
import { Heading } from '../Reusable/CustomText.component';

  

const GpScreen = () => {
  const colors = useContext(ColorContext)
  const [sub1ScoreState, setsub1ScoreState] = useState('')
  const [sub2ScoreState, setsub2ScoreState] = useState('')
  const [sub3ScoreState, setsub3ScoreState] = useState('')

  const [sub1PntsState, setsub1PntsState] = useState('')
  const [sub2PntsState, setsub2PntsState] = useState('')
  const [sub3PntsState, setsub3PntsState] = useState('')

  const [sub1GradeState, setsub1GradeState] = useState('A')
  const [sub2GradeState, setsub2GradeState] = useState('A')
  const [sub3GradeState, setsub3GradeState] = useState('A')
  const [totalPntState, settotalPntState] = useState('Total Points: 0')
  const updateStates = (val, state)=> {
      state(val)
      if (state === setsub1ScoreState || state === setsub2ScoreState || state === setsub3ScoreState) {
          const score = parseInt(val)
          if (!isNaN(score) && score <=100) {
              if (state === setsub1ScoreState) {
                  if (score >= 70 && score <=100) {
                      setsub1PntsState('5')
                      setsub1GradeState('A')
                  } else if (score >= 60 && score <=69) {
                      setsub1PntsState('4')
                      setsub1GradeState('B')
                  } else if (score >= 50 && score <=59) {
                      setsub1PntsState('3')
                      setsub1GradeState('C')
                  } else if (score >= 40 && score <=49) {
                      setsub1PntsState('2')
                      setsub1GradeState('D')
                  } else if (score >= 30 && score <=39) {
                      setsub1PntsState('1')
                      setsub1GradeState('E')
                  } else if (score >= 0 && score <=29) {
                      setsub1PntsState('0')
                      setsub1GradeState('F')
                  } else{
                  }
              } else if (state === setsub2ScoreState) {
                  if (score >= 70 && score <=100) {
                      setsub2PntsState('5')
                      setsub2GradeState('A')
                  } else if (score >= 60 && score <=69) {
                      setsub2PntsState('4')
                      setsub2GradeState('B')
                  } else if (score >= 50 && score <=59) {
                      setsub2PntsState('3')
                      setsub2GradeState('C')
                  } else if (score >= 40 && score <=49) {
                      setsub2PntsState('2')
                      setsub2GradeState('D')
                  } else if (score >= 30 && score <=39) {
                      setsub2PntsState('1')
                      setsub2GradeState('E')
                  } else if (score >= 0 && score <=29) {
                      setsub2PntsState('0')
                      setsub2GradeState('F')
                  } else{
                  }
              } else if (state === setsub3ScoreState) {
                  if (score >= 70 && score <=100) {
                      setsub3PntsState('5')
                      setsub3GradeState('A')
                  } else if (score >= 60 && score <=69) {
                      setsub3PntsState('4')
                      setsub3GradeState('B')
                  } else if (score >= 50 && score <=59) {
                      setsub3PntsState('3')
                      setsub3GradeState('C')
                  } else if (score >= 40 && score <=49) {
                      setsub3PntsState('2')
                      setsub3GradeState('D')
                  } else if (score >= 30 && score <=39) {
                      setsub3PntsState('1')
                      setsub3GradeState('E')
                  } else if (score >= 0 && score <=29) {
                      setsub3PntsState('0')
                      setsub3GradeState('F')
                  } else{
                  }
              }
          } else{
              state('')
          }
      } else if (state === setsub1PntsState || state === setsub2PntsState || state === setsub3PntsState) {
          const Pnts = parseInt(val)
          if (!isNaN(Pnts) && Pnts<=5) {
              if (state === setsub1PntsState) {
                  if (Pnts === 5) {
                      setsub1ScoreState('')
                      setsub1GradeState('A')
                  } else if (Pnts === 4) {
                      setsub1ScoreState('')
                      setsub1GradeState('B')
                  } else if (Pnts === 3) {
                      setsub1ScoreState('')
                      setsub1GradeState('C')
                  } else if (Pnts === 2) {
                      setsub1ScoreState('')
                      setsub1GradeState('D')
                  } else if (Pnts === 1) {
                      setsub1ScoreState('')
                      setsub1GradeState('E')
                  } else if (Pnts === 0) {
                      setsub1ScoreState('')
                      setsub1GradeState('F')
                  } else{
                  }
              } else if (state === setsub2PntsState) {
                  if (Pnts === 5) {
                      setsub2ScoreState('')
                      setsub2GradeState('A')
                  } else if (Pnts === 4) {
                      setsub2ScoreState('')
                      setsub2GradeState('B')
                  } else if (Pnts === 3) {
                      setsub2ScoreState('')
                      setsub2GradeState('C')
                  } else if (Pnts === 2) {
                      setsub2ScoreState('')
                      setsub2GradeState('D')
                  } else if (Pnts === 1) {
                      setsub2ScoreState('')
                      setsub2GradeState('E')
                  } else if (Pnts === 0) {
                      setsub2ScoreState('')
                      setsub2GradeState('F')
                  } else{
                  }
              } else if (state === setsub3PntsState) {
                  if (Pnts === 5) {
                      setsub3ScoreState('')
                      setsub3GradeState('A')
                  } else if (Pnts === 4) {
                      setsub3ScoreState('')
                      setsub3GradeState('B')
                  } else if (Pnts === 3) {
                      setsub3ScoreState('')
                      setsub3GradeState('C')
                  } else if (Pnts === 2) {
                      setsub3ScoreState('')
                      setsub3GradeState('D')
                  } else if (Pnts === 1) {
                      setsub3ScoreState('')
                      setsub3GradeState('E')
                  } else if (Pnts === 0) {
                      setsub3ScoreState('')
                      setsub3GradeState('F')
                  } else{
                  }
              }
          } else{
              state('')

          }
      }
  }

  const styles = StyleSheet.create({
    wrapper: {
      alignContent: 'center',
      padding: 0,
    },

    row: {
      width: '90%',
      height: hp('7%'),
      justifyContent: 'center',
      left: '5%',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      marginBottom: hp('2.5%'),
      borderBottomColor: colors.appColor,
    },
  
    guideText: {
      // fontSize: hp('2%'),
      textAlign: 'left',
    },
  
    subject: {
      // fontSize: hp('2.4%'),
      position: 'absolute',
    },
  
    score: {
      width: '30%',
      position: 'absolute',
      left: '30%',
      // fontSize: hp('2.3'),
      textAlign: 'center',
    },
  
    points: {
      width: '30%',
      position: 'absolute',
      left: '50%',
      // fontSize: hp('2.3%'),
      textAlign: 'center',
    },
  
    grade: {
      width: '20%',
      position: 'absolute',
      left: '80%',
      // fontSize: hp('2.3%'),
      textAlign: 'center',
    },

    row4: {
      borderBottomWidth: 0,
      flexDirection: 'column',
      justifyContent: 'space-around',
      // backgroundColor: 'red',
      height: '20%',
    },
    
    calcButn: {
      backgroundColor: colors.tabColor,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '40%',
      left: '30%'
    },
  
    calcText: {
      color: colors.defaultText,
      textAlign: 'center',
      paddingVertical: '3.5%',
      fontSize: hp('2.2%'),
    },
  
    totalPoints: {
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.appColor,
      textAlign: 'center',
      // width: '45%',
      padding: '2.5%',
      fontSize: hp('2.3%'),
      // borderStyle: 'solid',
      // borderWidth: 2,
      borderColor: colors.appColor,
    },
  
    scoreGuiderCont: {
      top: 0,
      width: '90%',
      left: '5%'
    },

    guideHeader: {
      fontSize: hp('3%'),
      fontWeight: '400',
      textAlign: 'center',
      textDecorationLine: 'underline',
      padding: '4%'
    },
  
    scoreGuiderHeader: {
      fontSize: 30,
    },
  
    scoreDetails: {
      // fontSize: hp('2.3%'),
      // backgroundColor: 'red',
      textAlign: 'center',
      // maxHeight: '25%',
      flexWrap: 'wrap'
    },
  
    pointsDetails: {
      width: '40%',
      position: 'relative',
      left: '50%',
      fontSize: hp('2.3%'),
      top: '-3%',
      marginBottom: '-3.5%',
      textAlign: 'left',
    }
  
  })

  return (
    <Container>
      <WriteupWrapper extraStyes={styles.wrapper}>
        <View style={styles.scoreGuiderCont}>
          <Heading>
            Guide:
          </Heading>
          <Text style={styles.scoreDetails}>
            A = 70 - 100 {'(5 points)'}{'   '}B = 60 - 69  {'(4 points)'}{'\n'} 
            C = 50 - 59  {'(3 points)'}{'   '}D = 40 - 49  {'(2 points)'}{'\n'}
            E = 30 - 39  {'(1 points)'}{'   '}F = 0 - 29  {'(0 points).'}{'\n'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subject}>Subject</Text>
          <Text style={styles.score}>Score</Text>
          <Text style={styles.points}>Points</Text>
          <Text style={styles.grade}>Grade</Text>
        </View>
        <View style={styles.row}>
          <Text maxLength = {14} style={styles.subject}>Course 1:</Text>
          <TextInput keyboardType='number-pad' placeholder=' eg. 100' value={sub1ScoreState} onChangeText={(val) => {updateStates(val, setsub1ScoreState)}} maxLength = {3} style={styles.score}></TextInput>
          <TextInput maxLength={1} keyboardType='number-pad' placeholder='eg. 5' value={sub1PntsState} onChangeText={(val) => {updateStates(val, setsub1PntsState)}} style={styles.points}></TextInput>
          <Text style={styles.grade}>{sub1GradeState}</Text>
        </View>
        <View style={styles.row}>
          <Text maxLength = {14} style={styles.subject}>Course 2:</Text>
          <TextInput keyboardType='number-pad' placeholder='eg. 100' value={sub2ScoreState} onChangeText={(val) => {updateStates(val, setsub2ScoreState)}} maxLength = {3} style={styles.score}></TextInput>
          <TextInput maxLength={1} keyboardType='number-pad' placeholder='eg. 5' value={sub2PntsState} onChangeText={(val) => {updateStates(val, setsub2PntsState)}} style={styles.points}></TextInput>
          <Text style={styles.grade}>{sub2GradeState}</Text>
        </View>
        <View style={styles.row}>
          <Text maxLength = {14} style={styles.subject}>Course 3:</Text>
          <TextInput keyboardType='number-pad' placeholder='eg. 100' value={sub3ScoreState} onChangeText={(val) => {updateStates(val, setsub3ScoreState)}} maxLength = {3} style={styles.score}></TextInput>
          <TextInput maxLength={1} keyboardType='number-pad' placeholder='eg. 5' value={sub3PntsState} onChangeText={(val) => {updateStates(val, setsub3PntsState)}} style={styles.points}></TextInput>
          <Text style={styles.grade}>{sub3GradeState}</Text>
        </View>
        <View style={[styles.row, styles.row4]}>
          <Text style={styles.totalPoints}>{totalPntState}</Text>
          <TouchableHighlight style={styles.calcButn} onPress={() => {
            const pntArray = [parseInt(sub1PntsState), parseInt(sub2PntsState), parseInt(sub3PntsState)]
            let totalScore = 0
            pntArray.forEach(pnt => {
                if (!isNaN(pnt)) {
                    totalScore += pnt
                }
            });
            settotalPntState(`Total Points: ${totalScore}`)
          }}>
            <Text style={styles.calcText}>Calculate</Text>
          </TouchableHighlight>
        </View>
      </WriteupWrapper>
    </Container>
  )
}

export default GpScreen