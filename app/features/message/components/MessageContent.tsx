import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DeletedMessage from './DeletedMessage';

type Props = PropsWithChildren<{
  yours: boolean;
  content: string;
  id: string;
  onLongPress: (messageId: string) => void;
}>;

const MessageContent = ({yours, content, id, onLongPress}: Props) => {
  const styles = createStyles(yours);
  return (
    <View style={styles.contentFrame}>
      {content ? (
        <Pressable onLongPress={() => onLongPress(id)}>
          <View style={styles.contentWrapper}>
            <Text style={styles.content}>{content}</Text>
          </View>
        </Pressable>
      ) : (
        <DeletedMessage />
      )}
    </View>
  );
};

const createStyles = (yours: boolean) =>
  StyleSheet.create({
    contentFrame: {
      width: '100%',
      marginTop: 4,
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
