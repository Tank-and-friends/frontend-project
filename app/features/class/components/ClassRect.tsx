/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ClassRectProps = {
  className: string;
  classId: string;
  classTime: string;
  classPlace: string;
  grade: {
    midTerm: number;
    endTerm: number;
  };
  onPress: () => void;
};

export default function ClassRect({
  className,
  classId,
  classTime,
  classPlace,
  grade,
  onPress,
}: ClassRectProps) {
  const midTermGrade =
    typeof grade.midTerm === 'number' ? grade.midTerm : '_ _';
  const endTermGrade =
    typeof grade.endTerm === 'number' ? grade.endTerm : '_ _';

  return (
    <TouchableOpacity
      style={styles.classSquareContainer}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.classTitle}>
        <Text style={[styles.text, styles.mainTitle]}>{className}</Text>
        <Text style={[styles.text, styles.subTitle]}>▪ {classTime}</Text>
        <Text style={[styles.text, styles.subTitle]}>▪ {classPlace}</Text>
        <Text style={[styles.text, styles.subTitle]}>
          ▪ Mã lớp:{' '}
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            {classId}
          </Text>
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <View
          style={[
            styles.Box,
            {borderTopLeftRadius: 4, borderTopRightRadius: 4},
          ]}>
          <Text style={styles.BoxText}>
            {typeof midTermGrade === 'number'
              ? midTermGrade.toFixed(1)
              : midTermGrade}
          </Text>
        </View>
        <View
          style={[
            styles.Box,
            {borderBottomLeftRadius: 4, borderBottomRightRadius: 4},
          ]}>
          <Text style={styles.BoxText}>
            {typeof endTermGrade === 'number'
              ? endTermGrade.toFixed(1)
              : endTermGrade}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    // height: 150,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#EFF2EF',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,

    position: 'relative',
  },
  classTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  mainTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subTitle: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 12,
    marginLeft: 20,
    marginTop: 6,
  },
  boxContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  Box: {
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    width: 52,
  },
  BoxText: {
    color: '#071013',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
