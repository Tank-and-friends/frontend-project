/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ClassRect from './components/ClassRect';

export default function ClassRegisterListScreen({route}: any) {
  const {className} = route.params;

  const classData = [
    {
      classTitle: 'Giải tích I',
      classTime: 'Sáng thứ 3, 6:45 - 10:05',
      classCode: '154052',
      status: 'Còn chỗ',
    },
    {
      classTitle: 'Giải tích I',
      classTime: 'Chiều thứ 5, 13:30 - 17:00',
      classCode: '154056',
      status: 'Trùng lịch',
    },
    {
      classTitle: 'Giải tích I',
      classTime: 'Sáng thứ 7, 8:00 - 12:00',
      classCode: '154053',
      status: 'Hết chỗ',
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      {/* <Text style={styles.title}>Class List for {className}</Text> */}
      <View style={styles.classSquareContainerContainer}>
        <Image
          source={require('../../assets/images/class-background.jpg')}
          style={[styles.backgroundClassImage, {borderRadius: 10}]}
          resizeMode="stretch"
        />
        <View style={styles.classSquareContainer}>
          <View style={styles.classTitle}>
            <Text style={styles.className}>Calculus I</Text>
            <Text style={styles.classDetails}>{className}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.Box}>
              <Text style={styles.Text}>Đại cương</Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#174FB2',
                textShadowColor: 'white',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 2,
              }}>
              Hiện còn 234 lớp
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.classGroupContainer}
        style={{width: '100%'}}>
        {classData.map((classItem, index) => (
          <ClassRect
            key={index} 
            classTitle={classItem.classTitle}
            classTime={classItem.classTime}
            classCode={classItem.classCode}
            status={classItem.status}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundClassImage: {
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
  classSquareContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingHorizontal: 40,
  },
  classSquareContainerContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    width: '95%',
    height: 140,
    borderRadius: 10,
    position: 'relative',
  },
  classTitle: {
    width: '90%',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
    maxWidth: 200,
  },
  Box: {
    backgroundColor: '#174fb2',
    borderRadius: 4,
    width: 80,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 10,
  },
  className: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 16,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  classDetails: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Inter',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingVertical: 10,
    paddingBottom: 120,
  },
});
