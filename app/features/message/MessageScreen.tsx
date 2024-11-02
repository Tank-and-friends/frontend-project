import React, {PropsWithChildren} from 'react';
import {FlatList, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MessageListItem from './components/MessageListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import {Image} from 'react-native-paper/lib/typescript/components/im';
type SectionProps = PropsWithChildren<{}>;

const DATA = [
  {
    name: 'Nguyen Viet Hoang 20210000',
    time: '15:00',
    lastestMessage: 'First Item',
  },
  {
    name: 'Nguyen Thi Ngan 20210000',
    time: '15:00',
    lastestMessage: 'Second Item',
  },
  {
    name: 'Quach Huu Tung Anh 20210000',
    time: '15:00',
    lastestMessage: 'Third Item',
  },
  {
    name: 'Nguyen Trong Duc 20210000',
    time: '15:00',
    lastestMessage: 'Fourth Item',
  },
];

const MessageScreen = ({}: SectionProps) => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/MessageBackground.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <Icon name={'cog'} color={'black'} size={24} />
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
      <Button style={styles.newMessageButton}>
        {/* <Image source={require('../../assets/images/pen-square.png')}></Image> */}
        dfd
      </Button>
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
  newMessageButton: {
    position: 'static',
    top: 711,
    left: 350,
    borderRadius: 28,
    backgroundColor: '#C02135',
    height: 56,
    width: 56,
    display: 'flex',
    alignItems: 'center',
  },
  listMessage: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
});

export default MessageScreen;
