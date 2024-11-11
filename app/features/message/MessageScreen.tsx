import React, {PropsWithChildren} from 'react';
import {FlatList, ScrollView, StyleSheet, View, Image} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import MessageListItem from './components/MessageListItem';
import NoteImage from '../../assets/images/pensquare.png';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation()
  return (
    <View style={{flex: 1}}>
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
      <IconButton
        icon={() => (
          <Image
            source={NoteImage}
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        )}
        mode="contained"
        containerColor="#C02135"
        size={30}
        style={styles.newMessageButton}
        onPress={()=>navigation.navigate('NewMessageScreen')}
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

export default MessageScreen;
