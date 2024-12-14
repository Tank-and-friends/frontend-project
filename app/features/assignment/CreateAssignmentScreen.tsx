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
import {Checkbox, TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import axiosInstance from '../../apis/apiConfig';

// interface TaskDetailData {
//   title: string;
//   date: string;
//   deadline: string;
//   content: string;
// }

const CreateAssignmentScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [uploadedFile, setUploadedFile] =
    useState<DocumentPickerResponse | null>(null); // Cập nhật kiểu dữ liệu

  const handleUploadMaterial = async () => {
    if (!uploadedFile) {
      Alert.alert('Thông báo', 'Vui lòng chọn tài liệu.');
      return;
    }

    const title = 'example-title'; // Thay bằng giá trị thực tế
    const classId = '000254'; // Thay bằng giá trị thực tế
    const description = 'example-description'; // Thay bằng giá trị thực tế
    const deadline = '2024-12-19T14:30:00'; // Thay bằng giá trị thực tế

    try {
      const formData = new FormData();

      // Thêm file
      formData.append('file', {
        uri: uploadedFile.uri,
        name: uploadedFile.name,
        type: uploadedFile.type,
      });

      // Thêm các trường khác
      formData.append('classId', classId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('deadline', deadline); // Thêm thời hạn nộp bài

      const response = await axiosInstance.post(
        '/it5023e/create_survey',
        formData,
      );

      Alert.alert('Thành công', 'Tài liệu đã được tải lên.');
      console.log('Upload response:', response.data);

      // Xóa trạng thái sau khi tải lên
      setUploadedFile(null);
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
      setUploadedFile(res); // Lưu thông tin tệp được chọn
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
      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.taskTitleContainer}>
          <View>
            <View style={styles.title}>
              <TextInput
                placeholder={isFocused ? '' : 'Tên bài tập'}
                style={styles.textInput}
                underlineColor="transparent"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor="rgba(7, 16, 19, 0.5)"
              />
            </View>

            <View style={styles.line} />
            <Text style={styles.text}>Nội dung</Text>

            <TextInput
              style={styles.input}
              underlineColor="transparent"
              multiline
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
                <Text>Tên tài liệu: {uploadedFile.name}</Text>
                {uploadedFile.type?.includes('image') && (
                  <Image
                    source={{uri: uploadedFile.uri}}
                    style={styles.previewImage}
                  />
                )}
                {!uploadedFile.type?.includes('image') && (
                  <Text style={styles.previewText}>
                    Tệp không thể xem trước.
                  </Text>
                )}
              </View>
            )}

            <Text style={styles.text}>Thời hạn nộp bài</Text>

            <View style={styles.timeOfDeadline}>
              <View style={styles.day}>
                <Text style={styles.text1}>Ngày</Text>
                <TextInput style={styles.input} underlineColor="transparent" />
              </View>
              <View style={styles.day}>
                <Text style={styles.text1}>Giờ</Text>
                <TextInput style={styles.input} underlineColor="transparent" />
              </View>
            </View>

            <View style={styles.checkBox}>
              <Text style={styles.text}>Cho phép nộp bài muộn</Text>
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsChecked(!isChecked)}
              />
            </View>

            <View style={styles.button1}>
              <TouchableOpacity
                style={styles.button2}
                onPress={handleUploadMaterial}>
                <Text style={styles.buttonText}>Đăng bài tập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Tin nhắn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Lớp học</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Đăng ký lớp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text>Xem thêm</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 10,
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
    height: 35,
    marginBottom: 20,
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
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 8,
  },
  previewText: {
    marginTop: 8,
    color: '#555',
  },
});

export default CreateAssignmentScreen;
// import React, {useState} from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from 'react-native';
// import {Checkbox, TextInput} from 'react-native-paper';
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from 'react-native-document-picker';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const CreateAssignmentScreen = () => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [uploadedFile, setUploadedFile] =
//     useState<DocumentPickerResponse | null>(null);
//   const [classId, setClassId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [materialType, setMaterialType] = useState('');

//   const uploadDocument = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setUploadedFile(res); // Lưu tệp được chọn
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the upload');
//       } else {
//         console.error('Unknown error: ', err);
//       }
//     }
//   };

//   const handleUploadMaterial = async () => {
//     if (!uploadedFile || !classId || !title || !materialType) {
//       Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin và chọn tệp.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', {
//       uri: uploadedFile.uri,
//       name: uploadedFile.name,
//       type: uploadedFile.type,
//     });
//     formData.append('classId', classId);
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('materialType', materialType);

//     try {
//       const response = await axios.post('/it5023e/upload_material', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       Alert.alert('Thành công', 'Tải lên tài liệu thành công.');
//       console.log('Response:', response.data);
//       // Reset trạng thái sau khi upload
//       setUploadedFile(null);
//       setClassId('');
//       setTitle('');
//       setDescription('');
//       setMaterialType('');
//     } catch (error) {
//       console.error('Error uploading material:', error);
//       Alert.alert('Lỗi', 'Tải lên tài liệu thất bại.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.contentContainer}>
//         <View style={styles.taskTitleContainer}>
//           <TextInput
//             placeholder="Mã lớp"
//             value={classId}
//             onChangeText={setClassId}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Tên tài liệu"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Mô tả tài liệu"
//             value={description}
//             onChangeText={setDescription}
//             style={styles.input}
//             multiline
//           />
//           <TextInput
//             placeholder="Loại tài liệu (ví dụ: PDF, Image, Video)"
//             value={materialType}
//             onChangeText={setMaterialType}
//             style={styles.input}
//           />

//           <TouchableOpacity style={styles.button4} onPress={uploadDocument}>
//             <Icon name="upload" size={20} />
//             <Text style={styles.buttonText}>Tải lên tài liệu</Text>
//           </TouchableOpacity>

//           {uploadedFile && (
//             <View style={styles.previewContainer}>
//               <Text>
//                 Tên tài liệu: {uploadedFile.name || 'Không có tên tài liệu'}
//               </Text>
//               {uploadedFile.type?.includes('image') ? (
//                 <Image
//                   source={{uri: uploadedFile.uri}}
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.previewText}>
//                   Không thể xem trước (Loại: {uploadedFile.type})
//                 </Text>
//               )}
//             </View>
//           )}

//           <TouchableOpacity
//             style={styles.button2}
//             onPress={handleUploadMaterial}>
//             <Text style={styles.buttonText}>Đăng tài liệu</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   taskTitleContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 16,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   button4: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: '#007BFF',
//   },
//   previewContainer: {
//     marginVertical: 16,
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: 150,
//     height: 150,
//     marginTop: 8,
//   },
//   previewText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   button2: {
//     backgroundColor: '#007BFF',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default CreateAssignmentScreen;
