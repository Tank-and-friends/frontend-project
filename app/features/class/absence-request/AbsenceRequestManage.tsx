import { RouteProp, useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Badge } from '../components/Badge';
import { AbsenceRequestReponse, AbsenceRequestStatus } from '../type';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ParamListBase } from '@react-navigation/native';
import { FileItem } from '../../../components/FileItem';
import { reviewAbsenceRequest } from '../api';

interface Props {
  route: RouteProp<ParamListBase, 'AbsenceRequestManage'> & {
    params: {
      absenceRequest: AbsenceRequestReponse;
    };
  };
}

export const AbsenceRequestManage: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const {absenceRequest} = route.params;
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [status, setStatus] = useState<AbsenceRequestStatus | undefined>(
    absenceRequest.status,
  );

  const role = useAsyncStorage('role');

  const handleReviewAbsenceRequest = async (_status: AbsenceRequestStatus) => {
    try {
      await reviewAbsenceRequest(absenceRequest.id, _status);
      setStatus(_status);
      setMode('view');
    } catch (error) {
      console.log(error);
    }
  };

  const statusMarkup =
    status === 'ACCEPTED' ? (
      <Badge mode="success">Chấp nhận</Badge>
    ) : status === 'PENDING' ? (
      <Badge mode="warning">Chưa duyệt</Badge>
    ) : status === 'REJECTED' ? (
      <Badge mode="critical">Từ chối</Badge>
    ) : null;

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
        {mode === 'view' ? (
          <Appbar.Action
            icon={'square-edit-outline'}
            size={20}
            color="white"
            onPress={async () =>
              (await role.getItem()) === 'LECTURER' ? setMode('edit') : null
            }
          />
        ) : null}
      </Appbar.Header>
      <View style={styles.body}>
        <View style={styles.preview}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{absenceRequest?.title}</Text>
            {mode === 'view' ? statusMarkup : null}
          </View>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Ngày nghỉ phép</Text>
          <Text style={styles.content}>{absenceRequest?.date}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Lý do</Text>
          <Text style={styles.content}>{absenceRequest?.reason}</Text>
        </View>
        <View style={styles.boxInfo}>
          <Text style={styles.infoTitle}>Minh chứng</Text>
          {absenceRequest?.file_url ? (
            <FileItem
              file={{title: 'Minh chứng', file_url: absenceRequest.file_url}}
            />
          ) : (
            <Text style={styles.content}>Không có minh chứng</Text>
          )}
        </View>
      </View>
      {mode === 'edit' ? (
        <View style={styles.btnContainer}>
          <Button
            mode="outlined"
            textColor="#c02135"
            buttonColor="white"
            theme={{colors: {outline: '#c02135'}}}
            style={styles.btn}
            labelStyle={styles.btnContent}
            onPress={() => handleReviewAbsenceRequest('REJECTED')}>
            Từ chối
          </Button>
          <Button
            mode="contained"
            textColor="white"
            buttonColor="#c02135"
            style={styles.btn}
            labelStyle={styles.btnContent}
            onPress={() => handleReviewAbsenceRequest('ACCEPTED')}>
            Chấp nhận
          </Button>
        </View>
      ) : null}
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
