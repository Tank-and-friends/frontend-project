/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  item: {
    name: string;
    time?: string;
    lastestMessage?: string;
  };
}>;

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
    params: {
      newMessage: boolean;
    };
  };
};

const MessageListItem = ({item}: SectionProps) => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MessageFeaturesStacks', {
          screen: 'MessageDetail',
          params: {
            newMessage: item.time === undefined,
          },
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
    marginBottom:10,
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
