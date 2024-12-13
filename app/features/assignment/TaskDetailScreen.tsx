/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import axios from 'axios';
// import DrivePreview from './components/DrivePreview';
// interface TaskDetailData {
//   title: string;
//   date: string;
//   deadline: string;
//   content: string;
// }

const TaskDetailScreen: React.FC = ({route}: any) => {
  const {title, date, deadline, content, formattedDate, serveyData} =
    route.params;
  const [late, setLate] = useState(false);
  const [processedDeadline, setProcessedDeadline] = useState('');

  useEffect(() => {
    const processDeadline = () => {
      const match = deadline.match(/\d{2}:\d{2}/); // Tìm chuỗi có định dạng HH:mm
      if (match) {
        setProcessedDeadline(match[0]); // Lưu giá trị giờ vào state
      } else {
        setLate(true); // Đặt late là true nếu không có thông tin giờ
        setProcessedDeadline(deadline); // Lưu thông báo nếu không có thông tin giờ
      }
    };

    processDeadline();
  }, [deadline]);

  const [file, setFile] = useState<DocumentPickerResponse[] | null>(null);

  const handleAddFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Chọn tất cả các loại file
      });
      console.log('File picked:', res);
      setFile(res); // Đặt giá trị state là danh sách file được chọn
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitSurvey = async () => {
    if (!file || file.length === 0) {
      console.error('No file selected');
      return;
    }

    if (isSubmitting) {
      return;
    } // Ngăn chặn nếu đang xử lý
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', {
      uri: file[0].uri, // URI của file
      type: file[0].type, // Loại file (MIME type)
      name: file[0].name, // Tên file
    });
    formData.append('token', 'Mq9YoW');
    formData.append('assignmentId', serveyData.id);
    formData.append('textResponse', 'Tạm thời chưa có');
    console.log('Submit button clicked');

    try {
      const response = await axios.post(
        'http://157.66.24.126:8080/it5023e/submit_survey',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);

      // Sửa lại ngoại lệ (sai role, giáo viên không được nộp bài)
      // (nộp bài nhiều lần)
    } finally {
      setIsSubmitting(false); // Hoàn tất
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* Task Title */}
        <TopNavWithoutAvatar title="Chi tiết bài tập" />
        {/* Content */}
        {false && (
          <View>
            <Text>{date}</Text>
            <Text>{processedDeadline}</Text>
          </View>
        )}
        <ScrollView style={styles.contentContainer}>
          <View style={styles.taskTitleContainer}>
            <View>
              <View style={styles.title}>
                <Text style={styles.taskTitle}>{title}</Text>
                {false && (
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: '#FF7F11',
                      },
                    ]}>
                    <Text style={styles.badgeText}>Chưa nộp bài</Text>
                    <FeatherIcon name="clock" size={24} color="black" />
                  </View>
                )}
              </View>
              {!late && <Text style={styles.deadline}>{formattedDate}</Text>}
              {late && <Text style={styles.deadline}>{formattedDate}</Text>}
              <View style={styles.line} />
              <Text style={styles.text}>Nội dung</Text>
              <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
                <Text style={styles.text1}>{content}</Text>
              </ScrollView>

              <Text style={styles.text}>Tài liệu liên quan</Text>
              <View>
                <Text style={styles.url}>{serveyData.file_url}</Text>
              </View>

              <View style={styles.preview}>
                {/* <DrivePreview driveUrl={serveyData.file_url} type="image" /> */}
              </View>
            </View>
          </View>

          <View style={styles.taskTitleContainer}>
            <View>
              <View style={styles.title}>
                <Text style={styles.text}>Bài nộp của tôi</Text>
                <TouchableOpacity onPress={handleAddFile}>
                  <Text style={styles.addAssignment}>Thêm +</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.title}>
                {file && (
                  <View>
                    {file.map((f, index) => (
                      <View key={index}>
                        <Text>File Name: {f.name}</Text>
                        <Text>File Type: {f.type}</Text>
                        <Text>File URI: {f.uri}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.line} />
              {/* Cuộn các tài liệu đã nộp (Có thể đổi thành tăng dần kích thước) */}
              {/* <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>

            </ScrollView> */}
              <View style={styles.button1}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={handleSubmitSurvey}>
                  <Text style={styles.buttonText}>Nộp bài</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
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
    flexWrap: 'wrap',
    width: '65%',
  },
  deadline: {
    color: '#21A366',
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
    maxHeight: 200,
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
    fontFamily: 'Inter', // Make sure the font is installed or linked properly
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
    paddingVertical: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#FF7F11',
    paddingHorizontal: 20,
    borderRadius: 10, // bo tròn các góc cho giống nút trong ảnh\
    width: 240,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  url: {
    color: 'black',
  },

  preview: {
    borderWidth: 2,
    borderColor: 'green',
  },
});

export default TaskDetailScreen;
