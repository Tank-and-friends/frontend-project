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
  ReceivedMessage,
  SenderInfo,
} from '../../models/Message';
import {RouteProp} from '@react-navigation/native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TopNavBar from './components/TopNavBar';
import {
  Icon,
  IconButton,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
} from 'react-native-paper';
// import EmptyBodyMessage from './components/EmptyBodyMessage';
import {deleteMessage, getDetailConversation} from '../../apis/MessageApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransparentBackground from '../../components/TransparentBackground';
import EmptyBodyMessage from './components/EmptyBodyMessage';

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type RouteProps = {
  MessageDetail: {
    partner: SenderInfo;
  };
};

const MessageDetail = ({route}: Props) => {
  const [isOpenUtilities, setIsOpenUtilities] = useState(false);
  const scrollView = useRef<ScrollView | null>(null);
  const {partner} = route.params;
  const [token, setToken] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [userId, setUserId] = useState<String>('');
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  const [existedMessages, setExistedMessages] = useState<
    ConversationDetailInfo[] | []
  >([]);
  const [content, setContent] = useState<string>('');
  const stompClientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const showUtilities = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsOpenUtilities(true);
  };

  const hideUtilities = () => {
    setIsOpenUtilities(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId, partner.id.toString()).then(res => {
      if (res) {
        getDetailConversation(partner.id.toString()).then(response => {
          setExistedMessages(response);
        });
        setMessages([]);
      }
    });
    hideUtilities();
    fetchListMessages();
  };
  const fetchListMessages = () => {
    getDetailConversation(partner.id.toString()).then(res => {
      if (res != null) {
        setExistedMessages(res.reverse());
      }
    });
    setMessages([]);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserId = await AsyncStorage.getItem('id');
      const storedToken = await AsyncStorage.getItem('token');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedUserId) {
        setUserId(storedUserId);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedToken) {
        setToken(storedToken);
      }
      return storedUserId;
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchCredentials = async () => {
      connectWebSocket();
      fetchListMessages();
    };

    if (userId) {
      fetchCredentials();
    }
  }, [userId]);

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
    <PaperProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'relative',
        }}>
        <TopNavBar partner={partner} />
        {existedMessages.length > 0 || messages.length > 0 ? (
          <View style={styles.messageDetail}>
            <GestureHandlerRootView>
              <ScrollView
                ref={scrollView}
                onContentSizeChange={() =>
                  scrollView.current?.scrollToEnd({animated: false})
                }
                showsVerticalScrollIndicator={false}
                style={{
                  paddingHorizontal: 20,
                }}>
                {existedMessages?.map(message => (
                  <MessageContent
                    key={message.message_id}
                    content={message.message}
                    yours={message.sender.id === Number(userId)}
                    id={message.message_id}
                    onLongPress={() => showUtilities(message.message_id)}
                  />
                ))}
                {messages.length > 0 && (
                  <View>
                    <FlatList
                      data={messages}
                      renderItem={({item}) => (
                        <MessageContent
                          content={item.content}
                          yours={item.sender.id === Number(userId)}
                          id={item.conversation_id.toString()}
                          onLongPress={showUtilities}
                        />
                      )}
                      keyExtractor={(_, index) => index.toString()}
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                    />
                  </View>
                )}
              </ScrollView>
            </GestureHandlerRootView>
          </View>
        ) : (
          <EmptyBodyMessage />
        )}

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
        <Portal>
          <Modal
            visible={isOpenUtilities}
            onDismiss={hideUtilities}
            contentContainerStyle={styles.utilities}
            theme={TransparentBackground}>
            <TouchableOpacity style={styles.utility}>
              <Icon source="text-box-multiple" size={27} color="white" />
              <Text style={styles.utilityText}>Sao chép</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.utility}
              onPress={() => handleDeleteMessage(selectedMessageId || '')}>
              <Icon source="trash-can-outline" size={30} color="white" />
              <Text style={styles.utilityText}>Xóa</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
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
    position: 'absolute',
    bottom: 0,
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
