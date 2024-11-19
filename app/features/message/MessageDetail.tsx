import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import React, {PropsWithChildren, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, IconButton, TextInput} from 'react-native-paper';
import DeletedMessage from './components/DeletedMessage';
import EmptyBodyMessage from './components/EmptyBodyMessage';
import ImageMessage from './components/ImageMessage';
import MessageContent from './components/MessageContent';
import MessageTime from './components/MessageTime';
import TopNavBar from './components/TopNavBar';
type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

type ParamList = {
  MessageNavigation: {
    screen: string;
  };
};

type RouteProps = {
  MessageDetail: {
    newMessage: boolean;
  };
};

const MessageDetail = ({route}: Props) => {
  const [isBlock, setIsBlock] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTextFocus, setIsTextFocus] = useState(false);
  const [isOpenUtilities, setIsOpenUtilities] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const scrollView = useRef<ScrollView | null>();
  const {newMessage} = route.params;
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const toggleUtilities = () => {
    setIsOpenUtilities(!isOpenUtilities);
  };
  const toggleBlock = () => {
    setIsBlock(!isBlock);
  };
  const handleLongPress = () => {
    setIsOpenUtilities(!isOpenUtilities);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <TopNavBar
        title="Nguyen Viet Hoang 20210000"
        // avatarSource={'../../assets/images/pensquare.png'}
        onOpenPopup={togglePopup}
      />
      {isPopupOpen && (
        <Pressable style={styles.overlay} onPress={togglePopup}>
          <View>
            <View style={styles.moreInfoPopup}>
              <Button
                contentStyle={{
                  justifyContent: 'flex-start',
                  overflow: 'visible',
                }}
                style={styles.moreInfoItem}
                textColor="black"
                icon="account"
                onPress={() =>
                  navigation.navigate('MessageNavigation', {
                    screen: 'FriendPersonalInfo',
                  })
                }>
                Thông tin tài khoản
              </Button>
              {!isBlock ? (
                <Button
                  contentStyle={{justifyContent: 'flex-start'}}
                  style={styles.moreInfoItem}
                  textColor="black"
                  icon="minus-circle"
                  onPress={toggleBlock}>
                  Chặn
                </Button>
              ) : (
                <Button
                  contentStyle={{justifyContent: 'flex-start'}}
                  style={styles.moreInfoItem}
                  textColor="black"
                  icon="minus-circle-off"
                  onPress={toggleBlock}>
                  Bỏ chặn
                </Button>
              )}
            </View>
          </View>
        </Pressable>
      )}

      {!newMessage ? (
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
            <MessageTime time="10 tháng 9, 9:00" />
            <MessageContent
              yours={false}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageContent
              yours={false}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />

            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <MessageTime time="10 tháng 9, 9:00" />
            <MessageContent
              yours={false}
              content="alooo"
              onLongPress={handleLongPress}
            />
            <ImageMessage />

            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />

            <MessageContent
              yours={true}
              content="alooo"
              onLongPress={handleLongPress}
            />

            <DeletedMessage />
            <View style={styles.status}>
              <Icon source="eye-outline" size={15} color="#C02135" />
            </View>
          </ScrollView>
        </View>
      ) : (
        <EmptyBodyMessage />
      )}
      {isOpenUtilities && (
        <Pressable style={styles.overlay} onPress={handleLongPress} />
      )}
      {isBlock ? (
        <View style={styles.blockWrapper}>
          <Text style={styles.blockNotification}>Bạn đã chặn Hoang</Text>
          <Text style={styles.blockNotification2}>
            Các bạn sẽ không thể nhắn tin cho nhau trong đoạn chat này
          </Text>
          <Button
            style={styles.unBlockButton}
            textColor="white"
            onPress={toggleBlock}>
            Bỏ chặn
          </Button>
        </View>
      ) : !isOpenUtilities ? (
        <View style={styles.messageInput}>
          <IconButton
            icon="image"
            size={24}
            iconColor="#C02135"
            style={{marginHorizontal: 0}}
          />
          <IconButton
            icon="camera"
            size={24}
            iconColor="#C02135"
            style={{marginHorizontal: 0}}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              outlineStyle={{
                borderRadius: 20,
                borderColor: '#C02135',
                height: 'auto',
              }}
              contentStyle={{}}
              style={styles.textInput}
              placeholder="Nhập tin nhắn"
              onFocus={() => {
                setIsTextFocus(true);
                scrollView.current?.scrollToEnd();
              }}
              onBlur={() => {
                setIsTextFocus(false);
              }}
              right={
                <TextInput.Icon
                  icon={'emoticon-happy-outline'}
                  color={'#C02135'}
                />
              }
              // multiline
            />
          </View>
          <IconButton
            icon={!isTextFocus ? 'heart' : 'send'}
            size={24}
            iconColor="#C02135"
            style={{marginHorizontal: 0}}
          />
        </View>
      ) : (
        <View style={styles.utilities}>
          <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
            <Icon
              source="reply"
              size={30}
              color="white"
              // style={styles.utilityIcon}
            />
            <Text style={styles.utilityText}>Phản hồi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
            <Icon
              source="text-box-multiple"
              size={27}
              color="white"
              // style={styles.utilityIcon}
            />
            <Text style={styles.utilityText}>Sap chép</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
            <Icon
              source="trash-can-outline"
              size={30}
              color="white"
              // style={styles.utilityIcon}
            />
            <Text style={styles.utilityText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.utility} onPress={handleLongPress}>
            <Icon
              source="dots-horizontal"
              size={30}
              color="white"
              // style={styles.utilityIcon}
            />
            <Text style={styles.utilityText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageDetail: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    paddingVertical: 6,
    rowGap: 6,
  },
  messageInput: {
    minHeight: 48,
    borderTopColor: '#C02135',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    // backgroundColor: 'black',
    borderRadius: 0,
  },
  blockWrapper: {
    minHeight: 146,
    borderTopColor: '#C02135',
    borderTopWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  blockNotification: {
    fontSize: 16,
    color: '#C02135',
    fontWeight: '800',
    marginTop: 15,
  },
  blockNotification2: {
    fontSize: 13,
    color: '#b6b6b6',
    width: 252,
    textAlign: 'center',
    marginTop: 7,
  },
  unBlockButton: {
    width: 300,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '600',
    height: 45,
    marginTop: 13,
    backgroundColor: '#C02135',
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
    width: '25%',
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
