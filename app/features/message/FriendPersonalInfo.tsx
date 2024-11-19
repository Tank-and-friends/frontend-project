import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {Appbar, Button, Divider, IconButton} from 'react-native-paper';
import avatarImage from '../../assets/images/bachmahoangtu.jpg';
import coverImage from '../../assets/images/11.jpg';
import chatIcon from '../../assets/images/chat.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const FriendPersonalInfo = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header style={styles.customAppBar}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color="white"
        />
        <Appbar.Content title="Thông tin tài khoản" color="white" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image
            source={coverImage}
            height={20}
            width={20}
            resizeMode="stretch"
            style={styles.coverImage}
          />
          <View>
            <Image source={avatarImage} style={styles.avatarImage} />
            <View style={styles.status} />
          </View>
        </View>
        <View
          style={{
            padding: 20,
          }}>
          <Text style={{fontSize: 22, fontWeight: '700'}}>
            Nguyen Thi Ngan 20210000
          </Text>
          <Text style={{fontSize: 16, marginTop: 3}}>
            <Text style={{fontWeight: '700'}}>420</Text> người bạn
          </Text>
          <Text style={{fontSize: 16, fontStyle: 'italic', marginTop: 3}}>
            Fan thầy Bean tổng nè
          </Text>
        </View>
        <Divider style={{borderColor: '#b6b6b6', borderWidth: 0.2}} />
        <View>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '700',
              paddingLeft: 20,
              paddingTop: 10,
            }}>
            Chi tiết
          </Text>
          <View style={styles.detailInfo}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <IconButton
                icon="calendar-month"
                iconColor="white"
                containerColor="#FF7F11"
                size={25}
                style={{marginRight: 17}}
              />
              <Text style={{fontSize: 16, width: 250}}>
                Tham gia{' '}
                <Text style={{fontWeight: '700'}}>
                  ngày 15 tháng 4 năm 2024
                </Text>
              </Text>
            </View>
            <Divider style={{width: 250}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <IconButton
                icon="home"
                iconColor="white"
                containerColor="#21A366"
                size={25}
                style={{marginRight: 17}}
              />
              <Text style={{fontSize: 16, width: 250}}>
                Sống tại{' '}
                <Text style={{fontWeight: '700'}}>
                  Thị xã Kinh Môn, tỉnh Hải Dương,Việt Nam
                </Text>
              </Text>
            </View>
            <Divider style={{width: 250}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <IconButton
                icon="link"
                iconColor="white"
                containerColor="#42A4EE"
                size={25}
                style={{marginRight: 17}}
              />
              <Text
                style={{
                  fontSize: 16,
                  width: 250,
                  textDecorationLine: 'underline',
                  color: '#42A4EE',
                }}>
                https://abcdxyz
              </Text>
            </View>
            <Button
              textColor="white"
              buttonColor="#C02135"
              style={{borderRadius: 4, width: 290, marginTop: 20}}
              icon={() => <Image source={chatIcon} width={24} height={24} />}>
              Nhắn tin
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  customAppBar: {
    backgroundColor: '#C02135',
  },
  imageWrapper: {
    height: 235,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  avatarImage: {
    position: 'absolute',
    bottom: -49,
    left: 12,
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  status: {
    position: 'absolute',
    bottom: -40,
    left: 120,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#21A366',
  },
  detailInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default FriendPersonalInfo;
