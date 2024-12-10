/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import MessageListItem from './components/MessageListItem';
import {ConversationInfo} from '../../models/Message';
import {getListConversations} from '../../apis/MessageApi';
type SectionProps = PropsWithChildren<{}>;

const MessageScreen = ({}: SectionProps) => {
  const [listConversation, setListConversation] = useState<
    ConversationInfo[] | null
  >();
  const fetchListConversation = () => {
    getListConversations().then(res => {
      setListConversation(res);
    });
  };
  useEffect(() => {
    fetchListConversation();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Tin nhắn" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />

        <FlatList
          data={listConversation}
          style={styles.listMessage}
          renderItem={({item}) => <MessageListItem item={item} />}
          keyExtractor={({id}) => id.toString()}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    position: 'relative',
  },
  listMessage: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  noteIcon: {
    width: 30,
    height: 30,
  },
});

export default MessageScreen;
