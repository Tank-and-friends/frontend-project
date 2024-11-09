import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, IconButton, Text, TextInput, Button } from 'react-native-paper';
import React from 'react';
import ClassSquare from './ClassSquare';

const classGroups = [
  { title: 'Lớp đại cương',},
  { title: 'Lớp không đại cương',},
  { title: 'Lớp xém đại cương',},
];


export default function OpenClasses() {
  return (
    <View>
      {classGroups.map((group, index)=>(
        <View style={styles.classGroupContainer} key={index}>
          <View style={styles.classGroupTitle}>
            <Text style={{
              color: 'white',
              fontWeight: 'semibold',
              fontSize: 24,
              fontFamily: 'Inter',
              textShadowColor: 'black',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 4,
            }}>{group.title}</Text>
            <Text style={{
              color: '#eff2ef',
              fontWeight: 'medium',
              fontSize: 16,
              fontFamily: 'Inter',
              textShadowColor: 'black',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 2,
            }}>Xem thêm</Text>
          </View>
          <View style={styles.classGroup}>
            <ScrollView horizontal={true} 
            contentContainerStyle={styles.scrollableContent}
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: 'flex-start' }}
            >
              <ClassSquare/>
              <ClassSquare/>
              <ClassSquare/>
            </ScrollView>
          </View>
        </View>
      ))}
    </View>
  )
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
    marginBottom: 20
  },
  classGroup:{
    height: 150,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%'
  },
  switchButton: {
    marginHorizontal: 5,
    width: '45%',
    backgroundColor: '#BA1B30'
  },
  activeButton: {
    backgroundColor: '#FF7F11',
  },

  scrollableContent: {
    height: 100
  },
  screenContent: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});