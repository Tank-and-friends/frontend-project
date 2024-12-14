import React, {PropsWithChildren} from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import {ClassInfo} from '../../../models/Register';
import {IconButton} from 'react-native-paper';
type Props = PropsWithChildren<{
  classInfo: ClassInfo;
  onEdit: (event: GestureResponderEvent, item: ClassInfo) => void;
}>;
const ClassRect = ({classInfo, onEdit}: Props) => {
  const getStatusColor = (_status: string) => {
    switch (_status) {
      case 'ACTIVE':
        return '#21A366';
      case 'UPCOMING':
        return '#FF7F11';
      case 'COMPLETED':
        return '#C02135';

      default:
        return '#9e9e9e';
    }
  };

  const getStatusDesc = (_status: string) => {
    switch (_status) {
      case 'ACTIVE':
        return 'Hoạt động';
      case 'UPCOMING':
        return 'Chờ đăng ký';
      case 'COMPLETED':
        return 'Kết thúc';
      default:
        return _status;
    }
  };

  const statusColor = getStatusColor(classInfo.status);
  const statusDesc = getStatusDesc(classInfo.status);

  return (
    <View style={styles.classSquareContainer}>
      <View style={styles.classTitle}>
        <Text style={[styles.text, styles.mainTitle]}>
          {classInfo.class_name}
        </Text>
        <Text style={[styles.text, styles.subTitle]}>
          Mã lớp:{' '}
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            {classInfo.class_id}
          </Text>
        </Text>
        <Text style={[styles.text, styles.subTitle]}>
          Loại lớp: <Text>{classInfo.class_type}</Text>
        </Text>
        <Text style={[styles.text, styles.subTitle]}>
          Số sinh viên đã đăng ký: <Text>{classInfo.student_count}</Text>
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={[styles.Box, {backgroundColor: statusColor}]}>
          <Text style={styles.BoxText}>{statusDesc}</Text>
        </View>
      </View>
      <IconButton
        icon="square-edit-outline"
        iconColor="#0088ff"
        onPress={e => onEdit(e, classInfo)}
        style={{position: 'absolute', right: 0, top: 5}}
      />
    </View>
  );
};

export default ClassRect;

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '90%',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: '#e9e9e9',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,

    position: 'relative',
  },
  classTitle: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  subTitle: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 6,
  },
  boxContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
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
