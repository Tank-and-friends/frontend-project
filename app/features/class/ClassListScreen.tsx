import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import ClassRect from './components/ClassRect';

export type ParamList = {
  ClassStacks: {
    screen: string;
    params: {
      classId: string;
      className: string;
      classTime: string;
      classPlace: string;
      grade: {midTerm?: number; endTerm?: number};
    };
  };
};

const ClassListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const classes = [
    {
      classId: '123456',
      className: 'Giải tích I',
      classTime: 'Sáng thứ 3, 6:45 - 10:05',
      classPlace: 'TC-207',
      grade: {midTerm: 4.0, endTerm: 3.2},
    },
    {
      classId: '234567',
      className: 'Giải tích II',
      classTime: 'Chiều thứ 5, 14:00 - 16:30',
      classPlace: 'TC-208',
      grade: {},
    },
    {
      classId: '345678',
      className: 'Giải tích III',
      classTime: 'Tối thứ 7, 18:00 - 20:30',
      classPlace: 'TC-209',
      grade: {midTerm: 4.0, endTerm: 3.2},
    },
    {
      classId: '456789',
      className: 'Giải tích IV',
      classTime: 'Tối thứ 7, 18:00 - 20:30',
      classPlace: 'TC-209',
      grade: {endTerm: 3.2},
    },
  ];

  const handleNavigateToClass = (
    classId: string,
    className: string,
    classTime: string,
    classPlace: string,
    grade: {midTerm?: number; endTerm?: number},
  ) => {
    navigation.navigate('ClassStacks', {
      screen: 'ClassDetails',
      params: {
        classId,
        className,
        classTime,
        classPlace,
        grade,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Đăng ký lớp" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />
        <ScrollView contentContainerStyle={styles.classGroupContainer}>
          {classes.map(classItem => (
            <ClassRect
              key={classItem.classId}
              classId={classItem.classId}
              className={classItem.className}
              classTime={classItem.classTime}
              classPlace={classItem.classPlace}
              grade={{
                midTerm: classItem.grade.midTerm ?? 0,
                endTerm: classItem.grade.endTerm ?? 0,
              }}
              onPress={() =>
                handleNavigateToClass(
                  classItem.classId,
                  classItem.className,
                  classItem.classTime,
                  classItem.classPlace,
                  classItem.grade,
                )
              }
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  button: {
    margin: 10,
    width: '80%',
  },
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingVertical: 10,
    paddingTop: 20,
    paddingBottom: 120,
  },
});

export default ClassListScreen;
