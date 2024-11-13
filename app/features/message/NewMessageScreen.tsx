import React, {PropsWithChildren} from 'react';
import {FlatList, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Appbar, Button, IconButton, TextInput} from 'react-native-paper';
import MessageListItem from './components/MessageListItem';
import NoteImage from '../../assets/images/pensquare.png';
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Tin nhắn mới" />
      </Appbar.Header>
      <Image
        source={require('../../assets/images/MessageBackground.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <TextInput
        placeholder="Bạn muốn tìm gì..."
        left={<TextInput.Icon icon={'menu'} />}
        right={<TextInput.Icon icon={'search-web'} />}
      />
      <FlatList
        data={DATA}
        style={styles.listMessage}
        renderItem={({item}) => <MessageListItem item={item} />}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
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
