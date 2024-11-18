import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { Appbar, Button } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { TextField } from '../../../components/TextField/TextField';

export const CreateAbsenceRequest = () => {
  const navigation = useNavigation();
  const [requestForm, setRequestForm] = React.useState({
    title: '',
    date: '',
    reason: '',
  });
  const [file, setFile] = React.useState<DocumentPickerResponse | null>(null);

  const handleChangeForm = (key: string, value: string) => {
    setRequestForm({
      ...requestForm,
      [key]: value,
    });
  };

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Hủy chọn file');
      } else {
        console.error('Lỗi khi chọn file: ', err);
      }
    }
  };
  console.log('File', file);

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
          title="Tạo đơn xin nghỉ phép"
        />
      </Appbar.Header>
      <View style={styles.body}>
        <View style={styles.form}>
          <TextField
            customLabel="Tiêu đề"
            placeholder="Nhập tiêu đề"
            value={requestForm.title}
            onChange={value => handleChangeForm('title', value)}
          />
          <TextField
            customLabel="Ngày nghỉ phép"
            placeholder="Buổi 1 - 27/10/2024"
            value={requestForm.date}
            onChange={value => handleChangeForm('date', value)}
          />
          <TextField
            customLabel="Lí do"
            placeholder="Nhập lí do nghỉ học"
            multiline={4}
            value={requestForm.reason}
            onChange={value => handleChangeForm('reason', value)}
          />
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadTitle}>Minh chứng (bắt buộc)</Text>
            <Pressable style={styles.uploadArea} onPress={handleFilePicker}>
              <FontAwesomeIcon
                name={file ? 'image' : 'arrow-up-from-bracket'}
                color="#c02135"
                size={16}
              />
              <Text style={styles.uploadContent}>
                {file?.name || 'Tải lên minh chứng'}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            textColor="white"
            buttonColor="#c02135"
            style={styles.btnSubmit}
            labelStyle={styles.btnContent}>
            Xác nhận
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  form: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 8,
    flexDirection: 'column',
    gap: 8,
  },
  uploadContainer: {
    marginTop: 8,
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 12,
  },
  uploadTitle: {
    paddingLeft: 4,
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  uploadArea: {
    width: '100%',
    height: 80,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#c02135',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadContent: {
    fontSize: 16,
    color: '#c02135',
  },
  btnContainer: {
    padding: 20,
  },
  btnSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnContent: {
    fontSize: 16,
  },
});
