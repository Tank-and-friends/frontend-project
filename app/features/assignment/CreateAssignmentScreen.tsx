import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'; // Thêm import
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import axiosInstance from '../../apis/apiConfig';

const CreateAssignmentScreen = () => {
  const [uploadedFile, setUploadedFile] =
    useState<DocumentPickerResponse | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date()); // Hợp nhất ngày giờ
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date): void => {
    setShowDatePicker(false);
    if (selectedDate) {
      const updatedDeadline = new Date(deadline);
      updatedDeadline.setFullYear(selectedDate.getFullYear());
      updatedDeadline.setMonth(selectedDate.getMonth());
      updatedDeadline.setDate(selectedDate.getDate());
      setDeadline(updatedDeadline);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date): void => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updatedDeadline = new Date(deadline);
      updatedDeadline.setHours(selectedTime.getHours());
      updatedDeadline.setMinutes(selectedTime.getMinutes());
      updatedDeadline.setSeconds(selectedTime.getSeconds());
      setDeadline(updatedDeadline);
    }
  };

  const handleUploadMaterial = async () => {
    if (!title || !description) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!uploadedFile) {
      Alert.alert('Thông báo', 'Vui lòng chọn tài liệu.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uploadedFile.uri,
        name: uploadedFile.name,
        type: uploadedFile.type,
      });
      formData.append('title', title);
      formData.append('description', description);
      const formattedDeadline = deadline.toISOString().split('.')[0];
      formData.append('deadline', formattedDeadline);
      formData.append('classId', '000254');

      const response = await axiosInstance.post(
        '/it5023e/create_survey',
        formData,
      );

      Alert.alert('Thành công', 'Bài tập đã được đăng.');
      console.log('Upload response:', response.data);

      setUploadedFile(null);
      setTitle('');
      setDescription('');
      setDeadline(new Date());
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Lỗi', 'Không thể tải lên tài liệu.');
    }
  };

  const uploadDocument = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setUploadedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload');
      } else {
        console.error('Unknown error: ', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.taskTitleContainer}>
          <View>
            <Text style={styles.text}>Tên bài tập</Text>
            <TextInput
              style={styles.inputAssignment}
              underlineColor="transparent"
              placeholderTextColor="rgba(7, 16, 19, 0.5)"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.text}>Nội dung</Text>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.text}>Tài liệu liên quan</Text>
            <View style={styles.button3}>
              <TouchableOpacity style={styles.button4} onPress={uploadDocument}>
                <Icon name="upload" size={20} />
                <Text style={styles.buttonText}>Tải lên tài liệu</Text>
              </TouchableOpacity>
            </View>
            {uploadedFile && (
              <View style={styles.previewContainer}>
                {uploadedFile.type?.includes('image') && (
                  <Image
                    source={{uri: uploadedFile.uri}}
                    style={styles.previewImage}
                  />
                )}
                {!uploadedFile.type?.includes('image') && (
                  <Text style={styles.previewText}>{}</Text>
                )}
              </View>
            )}

            <Text style={styles.text}>Thời hạn nộp bài</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input1}>
                Ngày: {deadline.toLocaleDateString('vi-VN')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.input1}>
                Giờ: {deadline.toLocaleTimeString('vi-VN')}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={deadline}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <TouchableOpacity
              style={styles.button2}
              onPress={handleUploadMaterial}>
              <Text style={styles.buttonText}>Đăng bài tập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  header: {
    borderWidth: 2,
    borderColor: 'green',
  },
  backButton: {
    /* Back button styling */
  },
  headerTitle: {
    /* Header title styling */
  },
  settingsButton: {
    /* Settings button styling */
  },
  taskTitleContainer: {
    backgroundColor: '#EFF2EF',
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 12,
    paddingBottom: 12,
  },
  taskTitle: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#071013',
  },
  deadline: {
    color: '#071013',
    marginTop: 8,
  },
  statusText: {
    /* Status text styling */
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  contentTitle: {
    /* Content title styling */
  },
  contentText: {
    /* Content text styling */
  },
  sectionTitle: {
    /* Section title styling */
  },
  document: {
    /* Document preview styling */
  },
  submission: {
    /* Submission preview styling */
  },
  submitButton: {
    /* Submit button styling */
  },
  submitButtonText: {
    /* Submit button text styling */
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#d32f2f',
  },
  footerButton: {
    /* Footer button styling */
  },
  status: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 5,
  },
  badge: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: '#FF7F11',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeText: {
    color: '#EFF2EF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 12,
    marginRight: 8,
    paddingTop: 2,
  },
  line: {
    height: 1, // Độ dày của đường line
    backgroundColor: '#D9D9D9', // Màu sắc của đường line
    marginVertical: 10, // Khoảng cách trên và dưới
    marginRight: 15,
    marginBottom: 20,
  },
  text: {
    color: '#071013',
    fontFamily: 'Inter', // Make sure the font is installed or linked properly
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700', // React Native expects a string for fontWeight (not a number)
    lineHeight: 18, // Set lineHeight explicitly for better control
  },

  scrollView: {
    height: 200,
    width: '96%',
    padding: 0,
    borderColor: '#ccc',
    borderRadius: 0,
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 1,
    // borderWidth: 1,
    // borderRightColor: 'green'
  },

  text1: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600', // React Native expects a string for fontWeight (not a number)
    lineHeight: 18,
  },

  addAssignment: {
    color: '#FF7F11',
    fontFamily: 'Inter', // Make sure "Inter" is available or loaded in your project
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14, // 'normal' lineHeight typically matches font size for consistency
  },

  button: {
    paddingRight: 15,
  },

  button1: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button2: {
    marginTop: 100,
    marginBottom: 40,
    backgroundColor: '#FF7F11',
    paddingHorizontal: 20,
    borderRadius: 10, // bo tròn các góc cho giống nút trong ảnh\
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 300,
  },
  button3: {
    paddingVertical: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 15,
    marginBottom: 20,
  },
  button4: {
    flexDirection: 'row',
    backgroundColor: '#C02135',
    paddingHorizontal: 20,
    borderRadius: 10, // bo tròn các góc cho giống nút trong ảnh\
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  input: {
    margin: 0,
    flexShrink: 1,
    marginRight: 15,
    backgroundColor: '#EFF2EF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    marginTop: 8,
    paddingHorizontal: 4,
    height: 90,
    fontSize: 18,
    padding: 5,
    marginBottom: 30,
  },
  inputAssignment: {
    margin: 0,
    flexShrink: 1,
    marginRight: 15,
    backgroundColor: '#EFF2EF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    marginTop: 8,
    paddingHorizontal: 4,
    height: 40,
    fontSize: 18,
    padding: 5,
    marginBottom: 30,
  },
  input1: {
    margin: 0,
    flexShrink: 1,
    marginRight: 15,
    backgroundColor: '#EFF2EF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    marginTop: 8,
    paddingHorizontal: 4,
    height: 40,
    fontSize: 18,
    padding: 6,
    marginBottom: 10,
    paddingLeft: 15,
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: '#EFF2EF',
    borderWidth: 0,
    paddingRight: 0,
    width: '100%',
    paddingHorizontal: 0,
    fontSize: 24,
  },
  checkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  timeOfDeadline: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: '50%',
  },
  previewContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    alignContent: 'center',
    alignSelf: 'center',
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '20%',
    height: 60,
    resizeMode: 'contain',
    marginTop: 8,
  },
  previewText: {
    marginTop: 8,
    color: '#555',
  },
  preText: {
    marginTop: -10,
    color: '#555',
    alignSelf: 'center',
  },
});

export default CreateAssignmentScreen;
