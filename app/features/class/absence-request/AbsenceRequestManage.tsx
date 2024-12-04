import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { Badge } from '../components/Badge';

export const AbsenceRequestManage = () => {
  const navigation = useNavigation();
  const [absenceRequest, setAbsenceRequest] = useState({
    title: 'Nghỉ ốm',
    status: 'ACCEPTED',
    date: '20/09/2021',
    reason: 'Em bị ốm do bệnh lười học nên xin thầy cho phép em nghỉ ạ',
    file: 'https://www.google.com',
    review: 'Chưa có',
    createdAt: '20/09/2021',
  });

  const statusMarkup =
    absenceRequest.status === 'ACCEPTED' ? (
      <Badge mode="success">Chấp nhận</Badge>
    ) : absenceRequest.status === 'PENDING' ? (
      <Badge mode="warning">Chưa duyệt</Badge>
    ) : (
      <Badge mode="critical">Từ chối</Badge>
    );

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small" style={styles.header}>
        <Appbar.BackAction
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          titleStyle={styles.headerTitle}
          title="Chi tiết đơn xin nghỉ phép"
        />
        <Appbar.Action icon={'square-edit-outline'} size={20} color="white" />
      </Appbar.Header>
      <View style={styles.body}>
        <View style={styles.preview}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{absenceRequest.title}</Text>
            {statusMarkup}
          </View>
          <Text
            style={
              styles.previewDate
            }>{`Ngày tạo: ${absenceRequest.createdAt}`}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Ngày nghỉ phép</Text>
          <Text style={styles.content}>{absenceRequest.date}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Lý do</Text>
          <Text style={styles.content}>{absenceRequest.reason}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Minh chứng</Text>
          <Pressable style={styles.uploadArea}>
            <FontAwesome6Icon name="image" color="#46515f" size={16} />
            <Text style={styles.uploadContent}>ảnh_minh_chứng.jpg</Text>
          </Pressable>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Phản hồi từ giảng viên</Text>
          <Text style={styles.content}>{absenceRequest.review}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="outlined"
          textColor="#c02135"
          buttonColor="white"
          theme={{colors: {outline: '#c02135'}}}
          style={styles.btn}
          labelStyle={styles.btnContent}>
          Từ chối
        </Button>
        <Button
          mode="contained"
          textColor="white"
          buttonColor="#c02135"
          style={styles.btn}
          labelStyle={styles.btnContent}>
          Chấp nhận
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#c02135',
    height: 76,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  body: {
    padding: 20,
    gap: 16,
  },
  preview: {
    flexDirection: 'column',
    gap: 4,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  previewDate: {
    fontSize: 12,
    color: '#46515f',
    fontWeight: '500',
  },
  boxInfo: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: '#46515F',
  },
  uploadArea: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#46515f',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadContent: {
    fontSize: 16,
    color: '#46515f',
  },
  btnContainer: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    gap: 20,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  btnContent: {
    fontSize: 16,
  },
});
