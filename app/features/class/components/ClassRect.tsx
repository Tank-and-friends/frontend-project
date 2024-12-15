/* eslint-disable react-native/no-inline-styles */
import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ClassRectProps = {
  className: string;
  classId: string;
  lecturerName?: string;
  startTime: string;
  endTime: string;
  onPress?: () => void;
  classType: string;
};

export default function ClassRect({
  className,
  classId,
  lecturerName,
  startTime,
  endTime,
  onPress,
  classType,
}: ClassRectProps) {

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const classTime = `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate,'dd/MM/yyyy',)}`

  const getStatusColor = (_status: string) => {
    switch (_status) {
      case 'LT':
        return '#174fb2';
      case 'BT':
        return '#ba1b30';
      case 'LT_BT':
        return '#ff7f11';
      default:
        return '#e9e9e9e';
    }
  };

  const statusColor = getStatusColor(classType);
  return (
    <TouchableOpacity
      style={styles.classSquareContainer}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.classTitle}>
        <Text style={[styles.text, styles.mainTitle]}>{className}</Text>
        <Text style={[styles.text, styles.subTitle]}>
          ▪ Mã lớp:{' '}
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            {classId}
          </Text>
        </Text>
        <Text style={[styles.text, styles.subTitle]}>▪ Giảng viên: {lecturerName}</Text>
        <Text style={[styles.text, styles.subTitle]}>▪ Thời gian: {classTime}</Text>
      </View>
      <View style={styles.boxContainer}>
        {/* <View
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
        </View> */}
        <View style={[styles.Box, {backgroundColor: statusColor}]}>
          <Text style={styles.BoxText}>Lớp {classType}</Text>
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
    position: 'absolute',
    flexDirection: 'column',
    gap: 4,
    right: 15,
    top: 20,
  },
  Box: {
    backgroundColor: '#174fb2',
    borderRadius: 4,
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoxText: {
    color: 'white',
    fontSize: 12,
  },
});
