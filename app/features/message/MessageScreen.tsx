import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Background from '../../assets/images/MessageBackground.png';
import NoteImage from '../../assets/images/pensquare.png';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import MessageListItem from './components/MessageListItem';
type SectionProps = PropsWithChildren<{}>;

type ParamList = {
  MessageNavigation: {
    screen: string;
  };
};

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
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Background}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Tin nhắn" />
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
          onPress={() =>
            navigation.navigate('MessageNavigation', {
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
});

export default MessageScreen;
