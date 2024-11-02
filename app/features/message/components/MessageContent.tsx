import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = PropsWithChildren<{
  yours: boolean;
  content: string;
}>;

const MessageContent = ({yours, content}: Props) => {
  const styles = createStyles(yours);
  return (
    <View style={styles.contentFrame}>
      <View style={styles.contentWrapper}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const createStyles = (yours: boolean) =>
  StyleSheet.create({
    contentFrame: {
      width: '100%',
      flexDirection: yours ? 'row-reverse' : 'row',
    },
    contentWrapper: {
      maxWidth: 300,
      backgroundColor: yours ? '#C02135' : '#EFF2EF',
      padding: 12,
      borderRadius: 10,
    },
    content: {
      fontSize: 14,
      color: yours ? 'white' : '#071013',
    },
  });

export default MessageContent;
