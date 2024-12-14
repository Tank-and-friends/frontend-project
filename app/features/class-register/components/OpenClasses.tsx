/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ClassSquare from './ClassSquare';
import axios from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/core';
import { getOpenClasses } from '../api';
import { ClassResponse } from '../types';



// const classGroups = [
//   {
//     title: 'Lớp đại cương',
//     classes: [
//       {className: 'Giải tích I'},
//       {className: 'Giải tích II'},
//       {className: 'Giải tích III'},
//     ],
//   },
//   {
//     title: 'Lớp không đại cương',
//     classes: [
//       {className: 'Giải không tích I'},
//       {className: 'Giải không tích II'},
//       {className: 'Giải không tích III'},
//     ],
//   },
//   {
//     title: 'Lớp xém đại cương',
//     classes: [
//       {className: 'Giải xém tích I'},
//       {className: 'Giải xém tích II'},
//       {className: 'Giải xém tích III'},
//     ],
//   },
// ];

export default function OpenClasses() {
  const [classData, setClassData] = useState<ClassResponse[]>([]);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOpenClasses();

      setClassData(data);
    }
    
    fetchData();

    getOpenClasses();
  }, []);
  

  const groupedClasses = classData.reduce((groups: Record<string, any[]>, cls: any) => {
    const { class_type } = cls;
    if (!groups[class_type]) {
      groups[class_type] = [];
    }
    groups[class_type].push(cls);
    return groups;
  }, {});

  const handleClassPress = (className: string, classType: string) => {
    const filteredClasses = classData.filter(
      (cls: any) => cls.class_name === className && cls.class_type === classType
    );
    navigation.navigate('ClassRegisterStacks', {
      screen: 'ClassRegisterList',
      params: { filteredClasses, className, classType },
    });
  };

  return (
    <View>
      {Object.entries(groupedClasses).map(([classType, classes]: [string, any[]], index) => (
        <View style={styles.classGroupContainer} key={index}>
          <View style={styles.classGroupTitle}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'semibold',
                fontSize: 24,
                fontFamily: 'Inter',
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 4,
              }}>
              Lớp {classType}
            </Text>
            <Text
              style={{
                color: '#eff2ef',
                fontWeight: 'medium',
                fontSize: 16,
                fontFamily: 'Inter',
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 2,
              }}>
              Xem thêm
            </Text>
          </View>
          <View style={styles.classGroup}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollableContent}
              showsHorizontalScrollIndicator={false}
              style={{alignSelf: 'flex-start'}}>
              {/* {group.classes.map((cls, idx) => (
                <ClassSquare key={idx} className={cls.className} />
              ))} */}
              {Array.from(new Set(classes.map((cls: any) => cls.class_name))).map((className, idx) => (
                <ClassSquare
                  key={idx}
                  className={className}
                  onPress={() => handleClassPress(className, classType)}
                  filteredClasses={classes.filter((cls: any) => cls.class_name === className)}
                  classType={classType}
                />
              ))}

            </ScrollView>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  classGroupTitle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  classGroup: {
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  switchButton: {
    marginHorizontal: 5,
    width: '45%',
    backgroundColor: '#BA1B30',
  },
  activeButton: {
    backgroundColor: '#FF7F11',
  },

  scrollableContent: {
    height: 100,
  },
  screenContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
