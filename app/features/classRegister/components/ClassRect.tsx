import {StyleSheet, Text, View} from 'react-native';

type ClassRectProps = {
  classTitle: string;
  classTime: string;
  classCode: string;
  status: string;
};

export default function ClassRect({
  classTitle,
  classTime,
  classCode,
  status,
}: ClassRectProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Thành công':
        return '#21A366';
      case 'Chờ xét duyệt':
        return '#FF7F11';
      case 'Thất bại':
        return '#C02135';

      case 'Còn chỗ':
        return '#21A366';
      case 'Trùng lịch':
        return '#BF5A67';
      case 'Hết chỗ':
        return '#C02135';

      default:
        return '#9e9e9e';
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <View style={styles.classSquareContainer}>
      <View style={styles.classTitle}>
        <Text style={[styles.text, styles.mainTitle]}>{classTitle}</Text>
        <Text style={[styles.text, styles.subTitle]}>{classTime}</Text>
        <Text style={[styles.text, styles.subTitle]}>
          Mã lớp:{' '}
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            {classCode}
          </Text>
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={[styles.Box, {backgroundColor: statusColor}]}>
          <Text style={styles.BoxText}>{status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '90%',
    height: 120,
    borderRadius: 10,
    padding: 20,
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
    bottom: 10,
    right: 10,
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
