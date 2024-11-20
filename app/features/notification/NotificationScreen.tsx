/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskNotification from './components/TaskNotification';
const NotificationScreen = () => {
  // const notificationdata = [
  //   {
  //     subject: 'TKXDPM.20241',
  //     time: '15:15',
  //     notificationName: 'Bài tập',
  //     notificationText: 'Nguyen Thi Thu Trang đã tạo một bài tập mới',
  //     onMarkRead: false,
  //   },
  //   {
  //     subject: 'CTDLGT.20241',
  //     time: '09:30',
  //     notificationName: 'Thông báo',
  //     notificationText: 'Lịch kiểm tra giữa kỳ đã được cập nhật.',
  //     onMarkRead: true,
  //   },
  //   {
  //     subject: 'HTTTQL.20241',
  //     time: '11:00',
  //     notificationName: 'Tài liệu',
  //     notificationText: 'Thầy Nguyễn Văn A đã đăng tài liệu ôn tập cuối kỳ.',
  //     onMarkRead: false,
  //   },
  //   {
  //     subject: 'LTHDT.20241',
  //     time: '14:45',
  //     notificationName: 'Câu hỏi',
  //     notificationText:
  //       'Sinh viên cần hoàn thành bài thảo luận trước ngày 25/11.',
  //     onMarkRead: false,
  //   },
  //   {
  //     subject: 'PTTKHT.20241',
  //     time: '08:20',
  //     notificationName: 'Hướng dẫn',
  //     notificationText: 'Video hướng dẫn đồ án cuối kỳ đã được tải lên.',
  //     onMarkRead: true,
  //   },
  //   {
  //     subject: 'MKT.20241',
  //     time: '16:30',
  //     notificationName: 'Đánh giá',
  //     notificationText: 'Đánh giá bài tập nhóm đã được đăng.',
  //     onMarkRead: false,
  //   },
  //   {
  //     subject: 'THVP.20241',
  //     time: '10:15',
  //     notificationName: 'Bài học',
  //     notificationText: 'Bài giảng mới đã có trên hệ thống LMS.',
  //     onMarkRead: true,
  //   },
  // ];

  // const [unRead, setUnRead] = useState(false);
  // const textColor = unRead ? '#B6B6B6' : '#020202';

  // const [notifications, setNotifications] = useState(notificationdata);

  const [notifications, setNotifications] = useState([
    {
      subject: 'TKXDPM.20241',
      time: '15:15',
      notificationName: 'Bài tập',
      notificationText: 'Nguyen Thi Thu Trang đã tạo một bài tập mới',
      onMarkRead: false,
      iconName: 'file-invoice', // Thêm thuộc tính iconName
    },
    {
      subject: 'CTDLGT.20241',
      time: '09:30',
      notificationName: 'Thông báo',
      notificationText: 'Lịch kiểm tra giữa kỳ đã được cập nhật.',
      onMarkRead: true,
      iconName: 'bell', // Thêm thuộc tính iconName
    },
    {
      subject: 'HTTTQL.20241',
      time: '11:00',
      notificationName: 'Tài liệu',
      notificationText: 'Thầy Nguyễn Văn A đã đăng tài liệu ôn tập cuối kỳ.',
      onMarkRead: false,
      iconName: 'file', // Thêm thuộc tính iconName
    },
    {
      subject: 'LTHDT.20241',
      time: '14:45',
      notificationName: 'Câu hỏi',
      notificationText:
        'Sinh viên cần hoàn thành bài thảo luận trước ngày 25/11.',
      onMarkRead: false,
      iconName: 'clipboard-question', // Thêm thuộc tính iconName
    },
    {
      subject: 'PTTKHT.20241',
      time: '08:20',
      notificationName: 'Hướng dẫn',
      notificationText: 'Video hướng dẫn đồ án cuối kỳ đã được tải lên.',
      onMarkRead: true,
      iconName: 'readme', // Thêm thuộc tính iconName
    },
    {
      subject: 'MKT.20241',
      time: '16:30',
      notificationName: 'Đánh giá',
      notificationText: 'Đánh giá bài tập nhóm đã được đăng.',
      onMarkRead: false,
      iconName: 'star', // Thêm thuộc tính iconName
    },
  ]);

  const [showFooter, setShowFooter] = useState(false);
  const [unConflic, setUnConflic] = useState(true);

  useEffect(() => {
    const handleBackPress = () => {
      if (showFooter) {
        setShowFooter(false);
        return true; // Chặn hành động quay lại mặc định
      }
      return false; // Cho phép hành động quay lại mặc định
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Dọn dẹp listener khi component unmount
  }, [showFooter]);

  useEffect(() => {
    // Đảm bảo showFooter khác với unConflic
    if (unConflic === showFooter) {
      setUnConflic(!showFooter);
    }
  }, [unConflic, showFooter]); // Theo dõi thay đổi của cả hai

  const [checkedStates, setCheckedStates] = useState(
    Array(notifications.length).fill(false), // Khởi tạo mảng với tất cả giá trị `false`
  );

  useEffect(() => {
    if (showFooter) {
      // Reset all checked states to false when showFooter is true
      setCheckedStates(Array(notifications.length).fill(false));
    }
  }, [showFooter, notifications.length]);

  const handleMarkRead = () => {
    const selectedIndexes = checkedStates
      .map((checked, index) => (checked ? index : null)) // Lấy index nếu checked là true
      .filter(index => index !== null); // Loại bỏ các giá trị null
    // console.log('Danh sách các index được chọn:', selectedIndexes);

    const updatedNotifications = notifications.map((notification, index) => {
      if (checkedStates[index]) {
        return {...notification, onMarkRead: true}; // Đánh dấu đã đọc
      }
      return notification; // Không thay đổi nếu không được chọn
    });
    setNotifications(updatedNotifications); // Cập nhật trạng thái thông báo
    // const markedReadNotifications = updatedNotifications.filter((_, index) => checkedStates[index]);
    // console.log('Các thông báo đã đánh dấu là đã đọc:', markedReadNotifications);

    if (selectedIndexes.length > 0) {
      setShowFooter(false);
    } else {
    }
  };

  const handleDeleteSelected = () => {
    const selectedIndexes = checkedStates
      .map((checked, index) => (checked ? index : null)) // Lấy index nếu checked là true
      .filter(index => index !== null); // Loại bỏ các giá trị null

    // Lọc ra các thông báo không được chọn (xóa các phần được chọn)
    const updatedNotifications = notifications.filter(
      (_, index) => !checkedStates[index],
    );

    setNotifications(updatedNotifications); // Cập nhật danh sách thông báo sau khi xóa

    // Kiểm tra nếu không còn thông báo nào được chọn
    if (selectedIndexes.length > 0) {
      setShowFooter(false);
    } else {
      console.log('Không có mục nào được chọn để xóa.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.test}>
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{
            paddingBottom: 10,
          }}>
          {notifications.map((item, index) => (
            <TaskNotification
              key={index}
              subject={item.subject}
              time={item.time}
              notificationName={item.notificationName}
              notificationText={item.notificationText}
              onMarkRead={item.onMarkRead}
              showFooter={showFooter} // Truyền showFooter
              setShowFooter={setShowFooter} // Truyền setShowFooter
              unConflic={unConflic}
              checked={checkedStates[index]}
              setChecked={value => {
                const updatedStates = [...checkedStates];
                updatedStates[index] = value;
                setCheckedStates(updatedStates);
              }} // Truyền hàm cập nhật
              iconName={item.iconName}
            />
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      {showFooter && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleMarkRead}>
            <Icon3 name="pencil-outline" size={25} color="white" />
            <Text>Đánh dấu đã đọc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleDeleteSelected}>
            <Icon3 name="trash-can-outline" size={25} color="white" />
            <Text>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon3 name="dots-horizontal" size={25} color="white" />
            <Text>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 0,
    paddingVertical: 10,
    // paddingVertical: 10,
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
  test: {
    flex: 1,
  },
});

export default NotificationScreen;
