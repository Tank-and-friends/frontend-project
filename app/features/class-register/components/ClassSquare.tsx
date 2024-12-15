/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-paper';

interface ClassSquareProps {
  className: string;
  onPress: () => void;
  filteredClasses: any[];
  classType: string;
}

type ParamList = {
  ClassRegisterStacks: {
    screen: string;
    params: {
      filteredClasses: any[];
    };
  };
};

export default function ClassSquare({ className, onPress, filteredClasses, classType }: ClassSquareProps) {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const classTypeColors: Record<string, string> = {
    'LT': '#174fb2', // Blue
    'BT': '#ba1b30', // Red
    'LT_BT': '#ff7f11', // Orange
  };
  const boxColor = classTypeColors[classType] || '#cccccc';

  const classCount = Array.isArray(filteredClasses) ? filteredClasses.length : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.classSquareContainer}>
        <Image
          source={require('../../../assets/images/class-background.jpg')}
          style={[styles.backgroundImage, {borderRadius: 10}]}
          resizeMode="stretch"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={[styles.Box, { backgroundColor: boxColor }]}>
            <Text style={styles.Text}>Lớp {classType}</Text>
          </View>
          <Text style={{fontSize: 10, textDecorationLine: 'underline', color: boxColor}}>
            {classCount} lớp →
          </Text>
        </View>
        <View style={styles.classTitle}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'semibold',
              fontSize: 12,
              fontFamily: 'Inter',
              textShadowColor: 'white',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 4,
            }}>
            {className}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Inter',
              textShadowColor: 'white',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 4,
            }}>
            {className}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column-reverse',
    width: 200,
    height: 150,
    borderRadius: 10,
    marginLeft: 30,
    padding: 20,
  },
  classTitle: {
    width: '90%',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
    maxWidth: 200,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 150,
    borderRadius: 10,
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
});
