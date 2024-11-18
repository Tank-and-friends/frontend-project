import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import image from '../../../assets/images/MessageBackground.png';

type Props = PropsWithChildren<{}>;

const ImageMessage = ({}: Props) => {
  return (
    <View style={styles.timeWrapper}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  image: {
    borderRadius: 10,
    maxHeight: 170,
    maxWidth: 170,
    backgroundColor: '#EFF2EF',
  },
});

export default ImageMessage;
