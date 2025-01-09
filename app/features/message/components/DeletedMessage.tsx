import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = PropsWithChildren<{}>;

const DeletedMessage = ({}: Props) => {
  return (
    <View style={styles.contentWrapper}>
      <Text style={styles.content}>Tin nhắn này đã bị xóa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    borderRadius: 20,
    padding: 12,
    borderColor: '#C02135',
    borderWidth: 1,
  },
  content: {
    fontSize: 14,
    color: '#C02135',
    fontStyle: 'italic',
  },
});

export default DeletedMessage;
