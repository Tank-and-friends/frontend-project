import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TextField } from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import ClassRect from './components/ClassRect';

export type ParamList = {
  ClassScreen: { 
    classId: string; 
    className: string; 
    classTime: string; 
    classPlace: string; 
    grade: { midTerm: number; endTerm: number }; 
  };
};

const ClassFirstScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const classes = [
    { 
      classId: 'Class1', 
      className: 'Giải tích I', 
      classTime: 'Sáng thứ 3, 6:45 - 10:05', 
      classPlace: 'TC-207',
      grade: { midTerm: 4.0, endTerm: 3.2 }
    },
    { 
      classId: 'Class2', 
      className: 'Giải tích II', 
      classTime: 'Chiều thứ 5, 14:00 - 16:30', 
      classPlace: 'TC-208',
      grade: {}
    },
    { 
      classId: 'Class3', 
      className: 'Giải tích III', 
      classTime: 'Tối thứ 7, 18:00 - 20:30', 
      classPlace: 'TC-209',
      grade: { midTerm: 4.0, endTerm: 3.2 }
    },
    { 
        classId: 'Class4', 
        className: 'Giải tích IV', 
        classTime: 'Tối thứ 7, 18:00 - 20:30', 
        classPlace: 'TC-209',
        grade: { endTerm: 3.2 }
    },
  ];

  const handleNavigateToClass = (classId: string, className: string, classTime: string, classPlace: string, grade: { midTerm: number; endTerm: number }) => {
    navigation.navigate('ClassScreen', { classId, className, classTime, classPlace, grade });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Đăng ký lớp" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />
        <ScrollView contentContainerStyle={styles.classGroupContainer}>
          {classes.map((classItem) => (
            <ClassRect
              key={classItem.classId}
              classId={classItem.classId}
              className={classItem.className}
              classTime={classItem.classTime}
              classPlace={classItem.classPlace}
              grade={classItem.grade}
              onPress={() =>
                handleNavigateToClass(
                  classItem.classId,
                  classItem.className,
                  classItem.classTime,
                  classItem.classPlace,
                  classItem.grade
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
    paddingBottom: 120
  },
});

export default ClassFirstScreen;
