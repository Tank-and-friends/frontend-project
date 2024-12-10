// /* eslint-disable react-native/no-inline-styles */
import {WebSocket} from 'react-native-websocket';
global.WebSocket = WebSocket;
import 'text-encoding';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';

import MessageContent from './components/MessageContent';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {
  ConversationDetailInfo,
  IMessage,
  SenderInfo,
} from '../../models/Message';
import {RouteProp} from '@react-navigation/native';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TopNavBar from './components/TopNavBar';
import {Icon, IconButton, TextInput} from 'react-native-paper';
// import EmptyBodyMessage from './components/EmptyBodyMessage';
import {deleteMessage, getDetailConversation} from '../../apis/MessageApi';

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type RouteProps = {
  MessageDetail: {
    conversationId: string;
    partner: SenderInfo;
  };
};

const MessageDetail = ({route}: Props) => {
  const [isOpenUtilities, setIsOpenUtilities] = useState(false);
  const scrollView = useRef<ScrollView | null>(null);
  const {partner, conversationId} = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  const [existedMessages, setExistedMessages] = useState<
    ConversationDetailInfo[] | null
  >(null);
  const [content, setContent] = useState<string>('');
  const stompClientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const userId = '277';
  const token = 'BdZsuO';
  const email = 'PKL@hust.edu.vn';

  const handleLongPress = () => {
    setIsOpenUtilities(!isOpenUtilities);
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId, partner.id.toString(), conversationId).then(
      res => {
        if (res) {
          getDetailConversation(conversationId).then(response => {
            setExistedMessages(response);
          });
          setMessages([]);
        }
      },
    );
    setIsOpenUtilities(!isOpenUtilities);
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        if (userId && token && email) {
          connectWebSocket();
        } else {
          console.error('User credentials not found');
        }
      } catch (error) {
        console.error('Error fetching credentials:', error);
      }
    };

    fetchCredentials();

    getDetailConversation(conversationId).then(res => {
      if (res != null) {
        setExistedMessages(res.reverse());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // Connect to WebSocket

  const connectWebSocket = () => {
    const socket = new SockJS('http://157.66.24.126:8080/ws'); // SockJS URL

    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: str => console.log(str),
      onConnect: () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        stompClient.subscribe(`/user/${userId}/inbox`, message => {
          const msg = JSON.parse(message.body);
          setMessages(prevMessages => [...prevMessages, msg]);
        });
      },
      onStompError: frame => {
        console.error('Broker Error:', frame.headers.message);
      },
      onWebSocketClose: () => {
        console.warn('WebSocket closed');
        setIsConnected(false);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
  };

  const sendMessage = () => {
    if (!isConnected) {
      console.error('STOMP client is not connected.');
      return;
    }
    if (stompClientRef.current && content && partner.id) {
      const message = {
        receiver: {id: Number(partner.id)},
        content: content,
        sender: email,
        token: token,
      };

      stompClientRef.current.publish({
        destination: '/chat/message',
        body: JSON.stringify(message),
      });

      setContent('');
    } else {
      console.error('Message or receiver is missing.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <TopNavBar partner={partner} />
      <View style={styles.messageDetail}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView.current?.scrollToEnd({animated: false})
          }
          showsVerticalScrollIndicator={false}
          style={{
            position: 'relative',
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}>
          {existedMessages?.map(message => (
            <MessageContent
              key={message.message_id}
              content={message.message}
              yours={message.sender.id === Number(userId)}
              onLongPress={handleLongPress}
            />
          ))}
          <View>
            <FlatList
              data={messages}
              renderItem={({item}) => (
                <MessageContent
                  content={item.content}
                  yours={item.sender.id === Number(userId)}
                  onLongPress={handleLongPress}
                />
              )}
              style={{backgroundColor: 'red'}}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          </View>
        </ScrollView>
      </View>

      {/* {!newMessage ? (
        <View style={styles.messageDetail}>
          <ScrollView
            ref={scrollView}
            onContentSizeChange={() =>
              scrollView.current?.scrollToEnd({animated: false})
            }
            showsVerticalScrollIndicator={false}
            style={{
              position: 'relative',
              paddingHorizontal: 20,
            }}>
            <View style={styles.status}>
              <Icon source="eye-outline" size={15} color="#C02135" />
            </View>
          </ScrollView>
        </View>
      ) : (
        <EmptyBodyMessage />
      )} */}
      {isOpenUtilities && (
        <Pressable style={styles.overlay} onPress={handleLongPress} />
      )}
      {!isOpenUtilities ? (
        <View style={styles.messageInput}>
          <View style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              outlineStyle={{
                borderRadius: 20,
                borderColor: '#C02135',
                height: 'auto',
              }}
              style={styles.textInput}
              placeholder="Nhập tin nhắn"
              onFocus={() => {
                scrollView.current?.scrollToEnd();
              }}
              value={content}
              onChangeText={text => setContent(text)}

              // multiline
            />
          </View>
          <IconButton
            onPress={sendMessage}
            icon="send"
            size={24}
            iconColor="#C02135"
            style={{marginHorizontal: 0}}
          />
        </View>
      ) : (
        <View style={styles.utilities}>
          <TouchableOpacity
            style={styles.utility}
            onPress={() => handleDeleteMessage}>
            <Icon source="text-box-multiple" size={27} color="white" />
            <Text style={styles.utilityText}>Sao chép</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.utility}
            onPress={() => handleDeleteMessage}>
            <Icon source="trash-can-outline" size={30} color="white" />
            <Text style={styles.utilityText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageDetail: {
    flex: 1,
    paddingVertical: 6,
    rowGap: 6,
  },
  messageInput: {
    minHeight: 48,
    borderTopColor: '#C02135',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  inputWrapper: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 0,
    // height: 32,
  },
  textInput: {
    height: 36,
    width: '100%',
    paddingHorizontal: 0,
  },
  status: {
    position: 'absolute',
    right: -15,
    bottom: 0,
  },
  moreInfoPopup: {
    position: 'absolute',
    top: 65,
    right: 5,
    minWidth: 186,
    paddingVertical: 5,
    backgroundColor: 'white',
    elevation: 10,
    zIndex: 10,
  },
  moreInfoItem: {
    fontSize: 13,
    borderRadius: 0,
  },
  utilities: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    backgroundColor: '#C02135',
    zIndex: 10,
  },
  utility: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  utilityText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
});

export default MessageDetail;
