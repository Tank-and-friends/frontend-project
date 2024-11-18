import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskNotification from './components/TaskNotification';

const NotificationScreen = () => {
  const notifications = [
    {
      subject: 'TKXDPM.20241',
      time: '15:15',
      notificationName: 'Bài tập',
      notificationText: 'Nguyen Thi Thu Trang đã tạo một bài tập mới',
      onMarkRead: false,
    },
  ];

  // const [unRead, setUnRead] = useState(false);
  // const textColor = unRead ? '#B6B6B6' : '#020202';
  return (
    <View style={styles.container}>
      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {notifications.map((item, index) => (
          <TaskNotification
            key={index}
            subject={item.subject}
            time={item.time}
            notificationName={item.notificationName}
            notificationText={item.notificationText}
            onMarkRead={item.onMarkRead}
          />
        ))}
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon3 name="pencil-outline" size={25} color="white" />
          <Text>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon3 name="trash-can-outline" size={25} color="white" />
          <Text>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon3 name="dots-horizontal" size={25} color="white" />
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
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 2,
  },

  taskTitleContainer: {
    backgroundColor: '#EFF2EF',
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 12,
    paddingBottom: 12,
    // borderWidth: 2,
    paddingRight: 15,
  },
  taskTitle: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#071013',
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  line: {
    height: 1, // Độ dày của đường line
    backgroundColor: '#D9D9D9', // Màu sắc của đường line
    marginVertical: 10, // Khoảng cách trên và dưới
    marginBottom: 20,
  },
  text: {
    color: '#000',
    fontFamily: 'Inter', // Đảm bảo rằng bạn đã cài font 'Inter' trong dự án của mình
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16, // Chỉnh lineHeight tùy vào nhu cầu của bạn (ví dụ: 16px)
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

  subject: {
    color: 'red',
  },
  time: {
    color: '#020202',
  },

  notification: {
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationName: {
    color: '#071013',
    fontFamily: 'Inter', // Đảm bảo rằng bạn đã cài font 'Inter' trong project của bạn
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20, // Chỉnh lineHeight tùy thuộc vào khoảng cách bạn muốn
    marginLeft: 10,
  },

  mark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  text2: {
    color: '#42A4EE', // Màu xanh dương, thay thế `var(--Blue)` bằng mã màu hex
    fontFamily: 'Inter', // Đảm bảo bạn đã cài font 'Inter' trong dự án
    fontSize: 9, // Kích thước font 9px
    fontStyle: 'normal', // Font style bình thường
    fontWeight: '400', // Đặt trọng lượng font là '400' (normal weight)
    lineHeight: 12, // Bạn cần chỉ định lineHeight cụ thể (ví dụ: 12px)
    marginRight: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#C02135',
  },
  footerButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    /* Footer button styling */
  },
});

export default NotificationScreen;
