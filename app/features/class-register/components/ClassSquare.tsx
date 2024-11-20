/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ClassSquareProps {
  onPress?: () => void;
  className: string;
}

export default function ClassSquare({onPress, className}: ClassSquareProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
          <View style={styles.Box}>
            <Text style={styles.Text}>Đại cương</Text>
          </View>
          <Text style={{fontSize: 10, textDecorationLine: 'underline'}}>
            234 lớp →
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
            Calculus I
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
    </TouchableWithoutFeedback>
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
