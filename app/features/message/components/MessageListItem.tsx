/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {ConversationInfo, SenderInfo} from '../../../models/Message';
import {formatMessageDate} from '../../../utils/datetime/date';
import {getDirectImageLink} from '../../../utils/image';

type SectionProps = PropsWithChildren<{
  item: ConversationInfo;
}>;

type ParamList = {
  MessageFeaturesStacks: {
    screen: string;
    params: {
      conversationId: string;
      partner: SenderInfo;
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
            partner: item.partner,
            conversationId: item.id.toString(),
          },
        });
      }}>
      <View style={styles.itemContainer}>
        {item.partner.avatar ? (
          <Image
            source={{uri: getDirectImageLink(item.partner.avatar)}}
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.avatarImage}>
            <Text>{item.partner.name.substring(0, 1)}</Text>
          </View>
        )}
        <View style={styles.textContentContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
            {item.partner.name}
          </Text>
          {item.last_message && (
            <Text
              style={[
                {fontSize: 10, marginTop: 3},
                item.last_message.unread ? {fontWeight: '500'} : {},
              ]}>
              {item.last_message.sender.id.toString() === '277' ? 'Bạn: ' : ''}
              {item.last_message.message || (
                <Text style={{fontStyle: 'italic'}}>Tin nhắn đã bị xóa</Text>
              )}
            </Text>
          )}
        </View>
        <Text style={styles.time}>
          {formatMessageDate(item.last_message.created_at)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
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
