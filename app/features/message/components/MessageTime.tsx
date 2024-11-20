import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  time: string;
}>;

const MessageTime = ({time}: Props) => {
  return (
    <View style={styles.timeWrapper}>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
  },
  time: {
    fontSize: 12,
    color: '#b6b6b6',
  },
});

export default MessageTime;
