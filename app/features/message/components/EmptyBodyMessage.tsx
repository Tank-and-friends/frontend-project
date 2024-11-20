import React, { PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
type Props = PropsWithChildren<{}>;

const EmptyBodyMessage = ({}: Props) => {
  return (
    <View style={styles.emptyBody}>
      <Image source={require('../../../assets/images/chat_logo.jpg')} />
      <Text style={styles.emptBodyText}>
        Hãy bắt đầu cuộc trò chuyện nào! {'\n'} Bạn có điều gì muốn chia sẻ hôm
        nay không?{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingBottom: 30,
    position: 'relative',
  },
  emptBodyText: {
    position: 'absolute',
    fontSize: 14,
    color: '#C02135',
    lineHeight: 20,
    textAlign: 'center',
    bottom: 30,
  },
});

export default EmptyBodyMessage;
