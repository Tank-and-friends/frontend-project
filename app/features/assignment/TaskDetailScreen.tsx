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
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FileItem} from '../../components/FileItem';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import axios from 'axios';
import {TextField} from '../../components/TextField/TextField';
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
  const [submissionData, setSubmissionData] = useState<any>(null); // Dữ liệu bài nộp
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error2, setError] = useState<string | null>(null); // Lỗi khi gọi API

  const formatDateTime = (isoString: string) => {
    const dateObj = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateObj.toLocaleString('vi-VN', options);
  };

  // Gọi API lấy thông tin bài nộp
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          'http://157.66.24.126:8080/it5023e/get_submission',
          {
            token: 'SkmzMU',
            assignment_id: serveyData.id,
          },
        );

        if (response.data.meta.code === '1000') {
          setSubmissionData(response.data.data);
        } else {
          setError('Không thể tải thông tin bài nộp.');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi kết nối với máy chủ.');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissionData();
  }, [serveyData.id]);

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
      console.log(error2);

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

  const [textResponse, setTextResponse] = useState('');

  const handleSubmitSurvey = async () => {
    if (!file || file.length === 0) {
      console.error('No file selected');
      return;
    }

    if (isSubmitting) {
      return; // Ngăn chặn nếu đang xử lý
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', {
      uri: file[0].uri, // URI của file
      type: file[0].type, // Loại file (MIME type)
      name: file[0].name, // Tên file
    });
    console.log('responeText', textResponse);

    formData.append('token', 'oqddVp');
    formData.append('assignmentId', serveyData.id);
    formData.append('textResponse', textResponse);
    console.log(formData);

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
      console.error('Error during survey submission:', error);
    } finally {
      setIsSubmitting(false); // Hoàn tất, đảm bảo trạng thái được đặt lại
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
              {serveyData.file_url && (
                <View style={{marginRight: 15, marginTop: 10}}>
                  <FileItem
                    file={{title: 'Bài tập', file_url: serveyData.file_url}}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Tài liệu liên quan */}

          {/* Hiển thị thông tin bài nộp */}
          {isLoading ? (
            <Text style={styles.loadingText}>
              Đang tải thông tin bài nộp...
            </Text>
          ) : submissionData ? (
            <>
              <View style={styles.line} />
              <View style={styles.submissionInfoContainer}>
                <Text style={styles.submissionHeader}>Thông tin bài nộp</Text>

                {/* Điểm */}
                <View style={styles.row}>
                  <Text style={styles.label}>Điểm:</Text>
                  <Text style={styles.value}>
                    {submissionData.grade ?? 'Chưa chấm điểm'}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Thời gian nộp bài:</Text>
                  <Text style={styles.value}>
                    {submissionData.submission_time
                      ? formatDateTime(submissionData.submission_time)
                      : 'Chưa nộp'}
                  </Text>
                </View>

                {/* File đã nộp */}
                <View>
                  <Text style={styles.label}>File đã nộp:</Text>
                  {submissionData.file_url ? (
                    <View>
                      <Text style={styles.url}>{submissionData.file_url}</Text>

                      {submissionData.file_url && (
                        <FileItem
                          file={{
                            title: 'đã nộp',
                            file_url: serveyData.file_url,
                          }}
                        />
                      )}
                    </View>
                  ) : (
                    <Text style={styles.value}>Chưa có file</Text>
                  )}
                </View>

                {/* Nhận xét từ giáo viên */}
                <View style={styles.row}>
                  <Text style={styles.label}>Nhận xét từ giáo viên:</Text>
                </View>
                <Text style={styles.commentText}>
                  {submissionData.text_response || 'Chưa có nhận xét'}
                </Text>
              </View>
            </>
          ) : (
            <View>
              <View style={styles.line} />
              <Text style={styles.text}>Không có thông tin bài nộp.</Text>
            </View>
          )}

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
                    {/* Hiển thị text nếu có file */}
                    <Text
                      style={{
                        fontWeight: 400,
                        marginBottom: 10,
                        color: 'green',
                      }}>
                      Đã nhận được file
                    </Text>
                  </View>
                )}
              </View>

              <View style={{marginTop: 0}}>
                <Text
                  style={{marginBottom: 5, fontWeight: 400, color: 'black'}}>
                  Nhập phản hồi:
                </Text>

                <TextField
                  placeholder="Nhập nội dung phản hồi..."
                  onChange={text => setTextResponse(text)}
                />
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

  preview: {
    borderWidth: 2,
    borderColor: 'green',
  },
  submissionInfoContainer: {
    padding: 6,
    marginTop: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submissionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: '40%', // Điều chỉnh để label căn trái
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Căn đều phần còn lại
  },
  url: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  loadingText: {},
});

export default TaskDetailScreen;
