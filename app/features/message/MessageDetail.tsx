import React, {PropsWithChildren} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, IconButton, TextInput} from 'react-native-paper';
import TopNavBar from './components/TopNavBar';
import MessageContent from './components/MessageContent';
import DeletedMessage from './components/DeletedMessage';
import MessageTime from './components/MessageTime';
import ImageMessage from './components/ImageMessage';
import blockImage from '../../assets/images/ooui_block.png';
import EmptyBodyMessage from './components/EmptyBodyMessage';
type Props = PropsWithChildren<{}>;

const MessageDetail = ({}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar
        title="Nguyen Viet Hoang 20210000"
        // avatarSource={'../../assets/images/pensquare.png'}
      />
      {/* <ScrollView style={styles.messageDetail}>
        <MessageTime time="10 tháng 9, 9:00" />
        <MessageContent yours={false} content="alooo" />
        <MessageContent yours={false} content="alooo" />
        <MessageContent yours={true} content="alooo" />
        <MessageTime time="10 tháng 9, 9:00" />
        <MessageContent yours={false} content="alooo" />
        <ImageMessage />
        <MessageContent yours={true} content="alooo" />
        <DeletedMessage />
        <View style={styles.status}>
          <Icon source="eye-outline" size={15} color="#C02135" />
        </View> */}
      {/* <View style={styles.moreInfoPopup}>
          <Button
            contentStyle={{justifyContent: 'flex-start', overflow: 'visible'}}
            style={styles.moreInfoItem}
            textColor="black"
            icon="account">
            Thông tin tài khoản
          </Button>
          <Button
            contentStyle={{justifyContent: 'flex-start'}}
            style={styles.moreInfoItem}
            textColor="black"
            icon="minus-circle">
            Chặn
          </Button>
          <Button
            contentStyle={{justifyContent: 'flex-start'}}
            style={styles.moreInfoItem}
            textColor="black"
            icon="minus-circle-off">
            Bỏ chặn
          </Button>
        </View> */}
      {/* </ScrollView> */}
      <EmptyBodyMessage />
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
          icon="heart"
          size={24}
          iconColor="#C02135"
          style={{marginHorizontal: 0}}
        />
      </View>
      {/* <View style={styles.blockWrapper}>
        <Text style={styles.blockNotification}>Bạn đã chặn Hoang</Text>
        <Text style={styles.blockNotification2}>
          Các bạn sẽ không thể nhắn tin cho nhau trong đoạn chat này
        </Text>
        <Button style={styles.unBlockButton} textColor="white">
          Bỏ chặn
        </Button>
      </View> */}
      {/* <View style={styles.utilities}>
        <TouchableOpacity style={styles.utility}>
          <Icon
            source="reply"
            size={30}
            color="white"
            // style={styles.utilityIcon}
          />
          <Text style={styles.utilityText}>Phản hồi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.utility}>
          <Icon
            source="text-box-multiple"
            size={27}
            color="white"
            // style={styles.utilityIcon}
          />
          <Text style={styles.utilityText}>Sap chép</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.utility}>
          <Icon
            source="trash-can-outline"
            size={30}
            color="white"
            // style={styles.utilityIcon}
          />
          <Text style={styles.utilityText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.utility}>
          <Icon
            source="dots-horizontal"
            size={30}
            color="white"
            // style={styles.utilityIcon}
          />
          <Text style={styles.utilityText}>Xem thêm</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  messageDetail: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'column-reverse',
    rowGap: 6,
    position: 'relative',
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
    bottom: -3,
  },
  moreInfoPopup: {
    position: 'absolute',
    top: -30,
    right: -16,
    minWidth: 186,
    paddingVertical: 5,
    backgroundColor: 'white',
    elevation: 10,
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
});

export default MessageDetail;
