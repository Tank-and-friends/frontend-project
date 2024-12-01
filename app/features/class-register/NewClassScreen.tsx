/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, IconButton, Text } from 'react-native-paper';
import ClassRect from './components/ClassRect';
import { TextField } from '../../components/TextField/TextField';
import navigation from '../auth/navigation';

export default function NewClassScreen({route, navigation}: any) {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch">
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.BackAction
            size={30}
            color="red"
            containerColor="white"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Danh sách lớp</Text>
            <Text style={styles.headerSubtitle}>Đăng ký mở lớp</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="cog-outline" iconColor="white" size={30} />
          </View>
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.formTitle}>
              <Text style={[styles.headerTitle, {color: '#071013', fontWeight: '500'}]}>Đăng ký mở lớp</Text>
              <Text style={[styles.headerSubtitle, {color: '#41484A', fontWeight: '500'}]}>Vui lòng điền những thông tin cần thiết</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.formTextField}>
              <View style={styles.formClassName}>
                <TextField
                  id='className'
                  name='className'
                  customLabel='Môn học'/>
              </View>
              <View style={styles.formTimePlace}>
                <Text style={{color: '#071013', fontWeight: 'bold', fontSize: 16, paddingLeft: 18, paddingTop: 14}}>Thời gian</Text>
                <View style={styles.formTime}>
                  <View style={{width: '50%'}}>
                    <TextField
                      id='Day'
                      name='Day'
                      customLabel='Thứ'/>
                  </View>
                  <View style={{width: '50%'}}>
                    <TextField
                      id='Period'
                      name='Period'
                      customLabel='Tiết'/>
                  </View>
                </View>
                <Text style={{color: '#071013', fontWeight: 'bold', fontSize: 16, paddingLeft: 18, paddingTop: 14}}>Địa điểm</Text>
                <View style={styles.formTime}>
                  <View style={{width: '50%'}}>
                    <TextField
                      id='Building'
                      name='Building'
                      customLabel='Tòa'/>
                  </View>
                  <View style={{width: '50%'}}>
                    <TextField
                      id='Room'
                      name='Room'
                      customLabel='Phòng'/>
                  </View>
                </View>
              </View>
            </View>
            <Button
              mode="contained"
              style={{ margin: 20 }}
              buttonColor="#FF7F11"
              textColor="white"
              onPress={() => console.log('Đã gửi yêu cầu!')}>
              Gửi yêu cầu
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundClassImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: 20,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'semibold',
    paddingLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D7C3B1',
    paddingLeft: 12,
  },
  actionBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  formContainer: {
    backgroundColor: '#EFF2EF',
    width: '90%',
    borderRadius: 10,
  },
  formTitle:{
    gap: 4,
    padding: 20
  },
  line:{
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 2
  },
  formTextField:{
    padding: 10,
    width:'100%'
  },
  formClassName:{

  },
  formTimePlace:{
    width: '100%',
  },
  formTime:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
