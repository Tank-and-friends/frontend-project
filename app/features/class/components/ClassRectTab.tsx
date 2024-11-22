/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ClassRectProps = {
  onPress: () => void;
  imageSource: any;
  title: string;
  subtitle: string;
  reverse: boolean;
};

export default function ClassRectTab({
  title,
  subtitle,
  imageSource,
  reverse,
  onPress,
}: ClassRectProps) {

  return (
    <TouchableOpacity
      style={[
        styles.classSquareContainer,
        { flexDirection: reverse ? 'row-reverse' : 'row' },
        { left: reverse ? 'auto' : '-10%'},
        { right: reverse ? '-10%' : 'auto'}
      ]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.classTitle,
        { alignItems: reverse ? 'flex-start' : 'flex-end'}
      ]}>
        <Text style={[styles.text, styles.mainTitle, { textAlign: reverse ? 'left' : 'right' }]}>{title}</Text>
        <Text style={[styles.text, styles.subTitle, { textAlign: reverse ? 'left' : 'right' }]}>{subtitle}</Text>
      </View>
      <View style={styles.boxContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  classSquareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    left: '-10%',

  },
  classTitle: {
    flexDirection: 'column',
    marginBottom: 4,
    backgroundColor: '#EFF2EF',
    flex: 1,
    height: 100,
    alignItems: 'flex-end',
    padding: 20,
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
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
    marginBottom: 4,
  },
  subTitle: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 12,
    width: '90%'
  },
  boxContainer: {
    flexDirection: 'column',
    gap: 4,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    transform: [{ scale: 1.2 }],
  },
});
