import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = PropsWithChildren<{}>;

const DeletedMessage = ({}: Props) => {
  return (
    <View style={styles.contentFrame}>
      <View style={styles.contentWrapper}>
        <Text>Tin nhắn này đã bị xóa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentFrame: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  contentWrapper: {
    borderRadius: 20,
    padding: 12,
    borderColor: '#C02135',
  },
  content: {
    fontSize: 14,
    color: '#C02135',
  },
});

export default DeletedMessage;
