import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

const TaskDetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Back Icon */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phát triển ứng dụng đa nền tảng</Text>

        <Text style={styles.headerTitle}>Phát triển ứng dụng đa nền tảng</Text>

        <Text style={styles.headerTitle}>Phát triển ứng dụng đa nền tảng</Text>

        <Text style={styles.headerTitle}>Phát triển ứng dụng đa nền tảng</Text>
        <TouchableOpacity style={styles.settingsButton}>
          {/* Settings Icon */}
        </TouchableOpacity>
      </View>

      {/* Task Title */}

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.taskTitleContainer}>
          <View>
            <View style={styles.title}>
              <Text style={styles.taskTitle}>Bài tập số 1</Text>
              <View style={[styles.badge, {backgroundColor: '#FF7F11'}]} /* eslint-disable-line react-native/no-inline-styles */>
                <Text style={styles.badgeText}>Chưa nộp bài</Text>
                <EvilIcons name="clock" size={24} color="black" />
              </View>
            </View>
            <Text style={styles.deadline}>
              Đến hạn vào ngày 28/10/2024 lúc 23:59
            </Text>
            <View style={styles.line} />
            <Text style={styles.text}>Nội dung</Text>
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
              <Text style={styles.text1}>
                Dưới đây là nội dung bài tập bla bla Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. tetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborumww.
              </Text>
            </ScrollView>

            <Text style={styles.text}>Tài liệu liên quan</Text>
          </View>
        </View>

        <View style={styles.taskTitleContainer}>
          <View>
            <View style={styles.title}>
              <Text style={styles.text}>Bài nộp của tôi</Text>
              <TouchableOpacity>
                <Text style={styles.addAssignment}>Thêm +</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            {/* Cuộn các tài liệu đã nộp (Có thể đổi thành tăng dần kích thước) */}
            {/* <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>

            </ScrollView> */}
            <View style={styles.button1}>
              <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText}>Nộp bài</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.taskTitleContainer}>
          <View>
            <View style={styles.title}>
              <Text style={styles.taskTitle}>Bài tập số 2</Text>
              <View style={[styles.badge, {backgroundColor: '#FF7F11'}]} /* eslint-disable-line react-native/no-inline-styles */>
                <Text style={styles.badgeText}>Chưa nộp bài</Text>
                <EvilIcons name="clock" size={24} color="black" />
              </View>
            </View>
            <Text style={styles.deadline}>
              Đến hạn vào ngày 28/10/2024 lúc 23:59
            </Text>
            <View style={styles.line} />
            <Text style={styles.text}>Nội dung</Text>
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
              <Text style={styles.text1}>
                Dưới đây là nội dung bài tập bla bla Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. tetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborumww.
              </Text>
            </ScrollView>

            <Text style={styles.text}>Tài liệu liên quan</Text>
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
    borderWidth: 2,
    borderColor: 'green',
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
});

export default TaskDetailScreen;
