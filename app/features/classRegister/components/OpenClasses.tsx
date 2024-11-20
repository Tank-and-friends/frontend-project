import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ClassSquare from './ClassSquare';

const classGroups = [
  {
    title: 'Lớp đại cương',
    classes: [
      {className: 'Giải tích I'},
      {className: 'Giải tích II'},
      {className: 'Giải tích III'},
    ],
  },
  {
    title: 'Lớp không đại cương',
    classes: [
      {className: 'Giải không tích I'},
      {className: 'Giải không tích II'},
      {className: 'Giải không tích III'},
    ],
  },
  {
    title: 'Lớp xém đại cương',
    classes: [
      {className: 'Giải xém tích I'},
      {className: 'Giải xém tích II'},
      {className: 'Giải xém tích III'},
    ],
  },
];

export default function OpenClasses({navigation}: any) {
  return (
    <View>
      {classGroups.map((group, index) => (
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
              {group.title}
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
              {group.classes.map((cls, idx) => (
                <ClassSquare
                  key={idx}
                  onPress={() =>
                    navigation.navigate('ClassList', {className: cls.className})
                  }
                  className={cls.className}
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
