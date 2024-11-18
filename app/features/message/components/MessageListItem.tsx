import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Pressable} from 'react-native-gesture-handler';

type SectionProps = PropsWithChildren<{
  item: {
    name: string;
    time?: string;
    lastestMessage?: string;
  };
}>;

const MessageListItem = ({item}: SectionProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MessageDetail', {
          newMessage: item.time == undefined,
        });
      }}>
      <View style={styles.itemContainer}>
        <View style={styles.avatarImage} />
        <View style={styles.textContentContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{item.name}</Text>
          {item.lastestMessage && (
            <Text style={{fontSize: 10, marginTop: 3}}>
              {item.lastestMessage}
            </Text>
          )}
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#eff2ef',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarImage: {
    borderRadius: 17.5,
    backgroundColor: '#d9d9d9',
    height: 35,
    width: 35,
  },
  textContentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
  },
});
export default MessageListItem;
