import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import {ClassInfo} from '../../models/Register';
import {getListClasses} from '../../apis/RegisterApi';
import ClassRect from './components/ClassRect';

export type ParamList = {
  ClassStacks: {
    screen: string;
    params: {
      classId: string;
      className: string;
      startTime: string;
      endTime: string;
      lecturerName: string;
      classType: string;
    };
  };
};

const ClassListScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [classes, setClasses] = useState<ClassInfo[]>([]);

  const handleNavigateToClass = (
    classId: string,
    className: string,
    startTime: string,
    endTime: string,
    lecturerName: string,
    classType: string
  ) => {
    navigation.navigate('ClassStacks', {
      screen: 'ClassDetails',
      params: {
        classId,
        className,
        startTime,
        endTime,
        lecturerName,
        classType,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      getListClasses().then(res => {
        if (res) {
          setClasses(res);
        }
      });
    }, [])
  )

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Lớp học" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />
        <ScrollView contentContainerStyle={styles.classGroupContainer}>
          {classes.map((classItem, index) => (
            <ClassRect 
              key={index}
              className={classItem.class_name}
              classId={classItem.class_id}
              startTime={classItem.start_date}
              endTime={classItem.end_date}
              lecturerName={classItem.lecturer_name}
              classType={classItem.class_type}
              onPress={() =>
                handleNavigateToClass(
                  classItem.class_id,
                  classItem.class_name,
                  classItem.start_date,
                  classItem.end_date,
                  classItem.lecturer_name, 
                  classItem.class_type
                )
              }
            ></ClassRect>
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
