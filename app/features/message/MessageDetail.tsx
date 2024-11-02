import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, IconButton, TextInput} from 'react-native-paper';
import TopNavBar from './components/TopNavBar';
import MessageContent from './components/MessageContent';
import DeletedMessage from './components/DeletedMessage';
import MessageTime from './components/MessageTime';
import ImageMessage from './components/ImageMessage';
type Props = PropsWithChildren<{}>;

const MessageDetail = ({}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
        <ImageMessage />
        <MessageContent yours={true} content="alooo" />
        <DeletedMessage />
        <View style={styles.status}>
          <Icon source="eye-outline" size={15} color="#C02135" />
        </View>
      </ScrollView>
      <View style={styles.messageInput}>
        <IconButton
          icon="image"
          size={24}
          iconColor="#C02135"
          style={{marginHorizontal: 0}}
        />
        <IconButton
          icon="camera"
          size={24}
          iconColor="#C02135"
          style={{marginHorizontal: 0}}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            mode="outlined"
            outlineStyle={{
              borderRadius: 20,
              borderColor: '#C02135',
              height: 'auto',
            }}
            contentStyle={{}}
            style={styles.textInput}
            placeholder="Nhập tin nhắn"
            right={
              <TextInput.Icon
                icon={'emoticon-happy-outline'}
                color={'#C02135'}
              />
            }
            // multiline
          />
        </View>
        <IconButton
          icon="heart"
          size={24}
          iconColor="#C02135"
          style={{marginHorizontal: 0}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageDetail: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'column-reverse',
    rowGap: 6,
    position: 'relative',
  },
  messageInput: {
    minHeight: 48,
    borderTopColor: '#C02135',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 0,
    // height: 32,
  },
  textInput: {
    height: 36,
    width: '100%',
    paddingHorizontal: 0,
  },
  status: {
    position: 'absolute',
    right: -15,
    bottom: -3,
  },
});

export default MessageDetail;
