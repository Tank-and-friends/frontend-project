// /* eslint-disable react-native/no-inline-styles */
// import {
//   NavigationProp,
//   RouteProp,
//   useNavigation,
// } from '@react-navigation/native';
// import React, {PropsWithChildren, useRef, useState} from 'react';
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Button, Icon, IconButton, TextInput} from 'react-native-paper';
// import DeletedMessage from './components/DeletedMessage';
// import EmptyBodyMessage from './components/EmptyBodyMessage';
// import ImageMessage from './components/ImageMessage';
// import MessageContent from './components/MessageContent';
// import MessageTime from './components/MessageTime';
// import TopNavBar from './components/TopNavBar';
// type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

// type ParamList = {
//   MessageStacks: {
//     screen: string;
//   };
// };

// type RouteProps = {
//   MessageDetail: {
//     newMessage: boolean;
//   };
// };

// const MessageDetail = ({route}: Props) => {
//   const [isBlock, setIsBlock] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isTextFocus, setIsTextFocus] = useState(false);
//   const [isOpenUtilities, setIsOpenUtilities] = useState(false);
//   const navigation = useNavigation<NavigationProp<ParamList>>();
//   const scrollView = useRef<ScrollView | null>(null);
//   const {newMessage} = route.params;
//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };
//   const toggleBlock = () => {
//     setIsBlock(!isBlock);
//   };
//   const handleLongPress = () => {
//     setIsOpenUtilities(!isOpenUtilities);
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'white',
//         position: 'relative',
//       }}>
//       <TopNavBar
//         title="Nguyen Viet Hoang 20210000"
//         // avatarSource={'../../assets/images/pensquare.png'}
//         onOpenPopup={togglePopup}
//       />
//       {isPopupOpen && (
//         <Pressable style={styles.overlay} onPress={togglePopup}>
//           <View>
//             <View style={styles.moreInfoPopup}>
//               <Button
//                 contentStyle={{
//                   justifyContent: 'flex-start',
//                   overflow: 'visible',
//                 }}
//                 style={styles.moreInfoItem}
//                 textColor="black"
//                 icon="account"
//                 onPress={() =>
//                   navigation.navigate('MessageStacks', {
//                     screen: 'FriendPersonalInfo',
//                   })
//                 }>
//                 Thông tin tài khoản
//               </Button>
//               {!isBlock ? (
//                 <Button
//                   contentStyle={{justifyContent: 'flex-start'}}
//                   style={styles.moreInfoItem}
//                   textColor="black"
//                   icon="minus-circle"
//                   onPress={toggleBlock}>
//                   Chặn
//                 </Button>
//               ) : (
//                 <Button
//                   contentStyle={{justifyContent: 'flex-start'}}
//                   style={styles.moreInfoItem}
//                   textColor="black"
//                   icon="minus-circle-off"
//                   onPress={toggleBlock}>
//                   Bỏ chặn
//                 </Button>
//               )}
//             </View>
//           </View>
//         </Pressable>
//       )}

//       {!newMessage ? (
//         <View style={styles.messageDetail}>
//           <ScrollView
//             ref={scrollView}
//             onContentSizeChange={() =>
//               scrollView.current?.scrollToEnd({animated: false})
//             }
//             showsVerticalScrollIndicator={false}
//             style={{
//               position: 'relative',
//               paddingHorizontal: 20,
//             }}>
//             <MessageTime time="10 tháng 9, 9:00" />
//             <MessageContent
//               yours={false}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageContent
//               yours={false}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />

//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <MessageTime time="10 tháng 9, 9:00" />
//             <MessageContent
//               yours={false}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />
//             <ImageMessage />

//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />

//             <MessageContent
//               yours={true}
//               content="alooo"
//               onLongPress={handleLongPress}
//             />

//             <DeletedMessage />
//             <View style={styles.status}>
//               <Icon source="eye-outline" size={15} color="#C02135" />
//             </View>
//           </ScrollView>
//         </View>
//       ) : (
//         <EmptyBodyMessage />
//       )}
//       {isOpenUtilities && (
//         <Pressable style={styles.overlay} onPress={handleLongPress} />
//       )}
//       {isBlock ? (
//         <View style={styles.blockWrapper}>
//           <Text style={styles.blockNotification}>Bạn đã chặn Hoang</Text>
//           <Text style={styles.blockNotification2}>
//             Các bạn sẽ không thể nhắn tin cho nhau trong đoạn chat này
//           </Text>
//           <Button
//             style={styles.unBlockButton}
//             textColor="white"
//             onPress={toggleBlock}>
//             Bỏ chặn
//           </Button>
//         </View>
//       ) : !isOpenUtilities ? (
//         <View style={styles.messageInput}>
//           {/* <IconButton
//             icon="image"
//             size={24}
//             iconColor="#C02135"
//             style={{marginHorizontal: 0}}
//           />
//           <IconButton
//             icon="camera"
//             size={24}
//             iconColor="#C02135"
//             style={{marginHorizontal: 0}}
//           /> */}
//           <View style={styles.inputWrapper}>
//             <TextInput
//               mode="outlined"
//               outlineStyle={{
//                 borderRadius: 20,
//                 borderColor: '#C02135',
//                 height: 'auto',
//               }}
//               contentStyle={{}}
//               style={styles.textInput}
//               placeholder="Nhập tin nhắn"
//               onFocus={() => {
//                 setIsTextFocus(true);
//                 scrollView.current?.scrollToEnd();
//               }}
//               onBlur={() => {
//                 setIsTextFocus(false);
//               }}
//               right={
//                 <TextInput.Icon
//                   icon={'emoticon-happy-outline'}
//                   color={'#C02135'}
//                 />
//               }
//               // multiline
//             />
//           </View>
//           <IconButton
//             icon={!isTextFocus ? 'heart' : 'send'}
//             size={24}
//             iconColor="#C02135"
//             style={{marginHorizontal: 0}}
//           />
//         </View>
//       ) : (
//         <View style={styles.utilities}>
//           <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
//             <Icon
//               source="reply"
//               size={30}
//               color="white"
//               // style={styles.utilityIcon}
//             />
//             <Text style={styles.utilityText}>Phản hồi</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
//             <Icon
//               source="text-box-multiple"
//               size={27}
//               color="white"
//               // style={styles.utilityIcon}
//             />
//             <Text style={styles.utilityText}>Sap chép</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
//             <Icon
//               source="trash-can-outline"
//               size={30}
//               color="white"
//               // style={styles.utilityIcon}
//             />
//             <Text style={styles.utilityText}>Xóa</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
//             <Icon
//               source="dots-horizontal"
//               size={30}
//               color="white"
//               // style={styles.utilityIcon}
//             />
//             <Text style={styles.utilityText}>Xem thêm</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   messageDetail: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column-reverse',
//     paddingVertical: 6,
//     rowGap: 6,
//   },
//   messageInput: {
//     minHeight: 48,
//     borderTopColor: '#C02135',
//     borderTopWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   inputWrapper: {
//     width: '100%',
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'row',
//     marginLeft: 0,
//     // height: 32,
//   },
//   textInput: {
//     height: 36,
//     width: '100%',
//     paddingHorizontal: 0,
//   },
//   status: {
//     position: 'absolute',
//     right: -15,
//     bottom: 0,
//   },
//   moreInfoPopup: {
//     position: 'absolute',
//     top: 65,
//     right: 5,
//     minWidth: 186,
//     paddingVertical: 5,
//     backgroundColor: 'white',
//     elevation: 10,
//     zIndex: 10,
//   },
//   moreInfoItem: {
//     fontSize: 13,
//     // backgroundColor: 'black',
//     borderRadius: 0,
//   },
//   blockWrapper: {
//     minHeight: 146,
//     borderTopColor: '#C02135',
//     borderTopWidth: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   blockNotification: {
//     fontSize: 16,
//     color: '#C02135',
//     fontWeight: '800',
//     marginTop: 15,
//   },
//   blockNotification2: {
//     fontSize: 13,
//     color: '#b6b6b6',
//     width: 252,
//     textAlign: 'center',
//     marginTop: 7,
//   },
//   unBlockButton: {
//     width: 300,
//     borderRadius: 20,
//     fontSize: 16,
//     fontWeight: '600',
//     height: 45,
//     marginTop: 13,
//     backgroundColor: '#C02135',
//   },
//   utilities: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 75,
//     backgroundColor: '#C02135',
//     zIndex: 10,
//   },
//   utility: {
//     width: '25%',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   utilityText: {
//     fontSize: 12,
//     color: 'white',
//     marginTop: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 9,
//   },
// });

// export default MessageDetail;
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function MessageDetail(): JSX.Element {
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const receiver = 355;
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const stompClient = useRef<any>(null);

  useEffect(() => {
    // Retrieve userId and token from AsyncStorage
    const loadUserData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('userId');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedId && storedToken) {
          setUserId(Number(storedId));
          setToken(storedToken);
          connectWebSocket(Number(storedId));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  const connectWebSocket = (id: number) => {
    const socket = new SockJS('http://157.66.24.126:8080/ws');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);

      // Subscribe to inbox for incoming messages
      stompClient.current.subscribe(`/user/${id}/inbox`, (message: any) => {
        const msg = JSON.parse(message.body);
        console.log('Received message:', msg);
        setMessages(prevMessages => [...prevMessages, msg]);
      });
    });
  };

  const sendMessage = () => {
    if (!receiver || !content) {
      Alert.alert('Error', 'Receiver ID and message content are required');
      return;
    }

    const message = {
      receiver: {id: receiver},
      content,
      sender: 'PKL@hust.edu.vn',
      token,
    };

    console.log('Sending message:', message);
    stompClient.current.send('/chat/message', {}, JSON.stringify(message));
    setContent('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <ScrollView style={styles.messages}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.sender.id === userId ? styles.sent : styles.received,
              ]}>
              <Text style={styles.messageInfo}>
                {msg.sender.id === userId ? 'You' : msg.sender.id} to{' '}
                {msg.receiver.id}:
              </Text>
              <Text>{msg.content}</Text>
              <Text style={styles.timestamp}>
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.messageForm}>
          <TextInput
            style={styles.inputLarge}
            placeholder="Type your message..."
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f4f4'},
  chatContainer: {flex: 1},
  messages: {flex: 1, padding: 10, backgroundColor: '#f9f9f9'},
  message: {marginVertical: 5, padding: 10, borderRadius: 5},
  sent: {backgroundColor: '#e0f7fa', alignSelf: 'flex-end'},
  received: {backgroundColor: '#ffe0b2', alignSelf: 'flex-start'},
  messageInfo: {fontSize: 12, color: '#555'},
  timestamp: {fontSize: 10, color: '#aaa', marginTop: 5},
  messageForm: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  inputSmall: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  inputLarge: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16},
});
