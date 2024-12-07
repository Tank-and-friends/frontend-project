/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import MessageListItem from './components/MessageListItem';
import {ConversationInfo} from '../../models/Message';
import {getListConversations} from '../../apis/MessageApi';
type SectionProps = PropsWithChildren<{}>;

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
  };
};

// const DATA = [
//   {
//     name: 'Nguyen Viet Hoang 20210000',
//     time: '15:00',
//     lastestMessage: 'First Item',
//   },
//   {
//     name: 'Nguyen Thi Ngan 20210000',
//     time: '15:00',
//     lastestMessage: 'Second Item',
//   },
//   {
//     name: 'Quach Huu Tung Anh 20210000',
//     time: '15:00',
//     lastestMessage: 'Third Item',
//   },
//   {
//     name: 'Nguyen Trong Duc 20210000',
//     time: '15:00',
//     lastestMessage: 'Fourth Item',
//   },
// ];

const NoteIcon = () => (
  <Image
    source={require('../../assets/images/pensquare.png')}
    style={styles.noteIcon}
  />
);

const MessageScreen = ({}: SectionProps) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
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
        <IconButton
          icon={NoteIcon}
          mode="contained"
          containerColor="#C02135"
          size={30}
          style={styles.newMessageButton}
          onPress={() =>
            navigation.navigate('MessageFeaturesStacks', {
              screen: 'NewMessageScreen',
            })
          }
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
  newMessageButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },
  noteIcon: {
    width: 30,
    height: 30,
  },
});

export default MessageScreen;
