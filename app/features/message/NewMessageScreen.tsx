import React, { PropsWithChildren } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  View
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TextField } from '../../components/TextField/TextField';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import MessageListItem from './components/MessageListItem';

type SectionProps = PropsWithChildren<{}>;

const DATA = [
  {
    name: 'Nguyen Viet Hoang 20210000',
  },
  {
    name: 'Nguyen Thi Ngan 20210000',
  },
  {
    name: 'Quach Huu Tung Anh 20210000',
  },
  {
    name: 'Nguyen Trong Duc 20210000',
  },
];

const NewMessageScreen = ({}: SectionProps) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/MessageBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopNavWithoutAvatar title="Tin nhắn mới" />

        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />
        <FlatList
          data={DATA}
          style={styles.listMessage}
          renderItem={({item}) => <MessageListItem item={item} />}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    top: 570,
    left: 280,
  },
});

export default NewMessageScreen;
