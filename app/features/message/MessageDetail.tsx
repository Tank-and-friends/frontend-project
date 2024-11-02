import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import TopNavBar from './components/TopNavBar';
import MessageContent from './components/MessageContent';
import DeletedMessage from './components/DeletedMessage';
import MessageTime from './components/MessageTime';
type Props = PropsWithChildren<{}>;

const MessageDetail = ({}: Props) => {
  return (
    <View>
      <TopNavBar
        title="Nguyen Viet Hoang 20210000"
        // avatarSource={'../../assets/images/pensquare.png'}
      />
      <ScrollView style={styles.messageDetail}>
        <MessageTime time="10 tháng 9, 9:00" />
        <MessageContent yours={false} content="alooo" />
        <MessageContent yours={false} content="alooo" />
        <MessageContent yours={true} content="alooo" />
        <MessageTime time="10 tháng 9, 9:00" />
        <MessageContent yours={false} content="alooo" />
        <MessageContent yours={true} content="alooo" />
        <DeletedMessage />
      </ScrollView>
      <View style={styles.messageInput}>
        <IconButton icon="image" size={24} iconColor="#C02135" />
        <IconButton icon="camera" size={24} iconColor="#C02135" />
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn"
          right={<TextInput.Icon icon={'camera'} />}
        />
        <IconButton icon="heart" size={24} iconColor="#C02135" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageDetail: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    rowGap: 6,
    flexDirection: 'column-reverse',
  },
  messageInput: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 'auto',
  },
  textInput: {
    height: 32,
    borderRadius: 20,
    borderColor: '#C02135',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});

export default MessageDetail;
