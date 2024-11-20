import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Assuming you're using FontAwesome icons

interface NotificationProps {
  subject: string;
  time: string;
  notificationName: string;
  notificationText: string;
  onMarkRead?: boolean;
  showFooter: boolean;
  setShowFooter: (value: boolean) => void;
  unConflic?: boolean;
  checked?: boolean;
  setChecked: (value: boolean) => void;
}

const TaskNotification: React.FC<NotificationProps> = ({
  subject,
  time,
  notificationName,
  notificationText,
  onMarkRead, // Default text if not provided
  showFooter,
  setShowFooter,
  unConflic,
  checked, // Nhận trạng thái checked
  setChecked, // Nhận hàm cập nhật trạng thái
}) => {
  const [unRead, setUnRead] = useState(onMarkRead);
  const textColor = unRead ? '#B6B6B6' : '#020202'; // Change text color based on unread state

  const toggleFooter = () => {
    setShowFooter(true); // Toggle footer state
    // alert(showFooter),
  };

  useEffect(() => {
    setUnRead(onMarkRead);
  }, [onMarkRead]);

  return (
    <View style={styles.taskTitleContainer}>
      <TouchableOpacity
        onLongPress={toggleFooter}
      >
        <View>
          <View style={styles.title}>
            <Text style={styles.subject}>{subject}</Text>
            <Text style={[styles.time, {color: textColor}]}>{time}</Text>
          </View>
          <View style={styles.notification}>
            <Icon name="arrow-up-from-bracket" size={30} color="black" />
            <Text style={styles.notificationName}>{notificationName}</Text>
          </View>
          <View style={styles.line} />
          <Text style={styles.text}>{notificationText}</Text>
          {!unRead && unConflic && (
            <TouchableOpacity onPress={() => setUnRead(!unRead)}>
              <View style={styles.mark}>
                <Text style={styles.text2}>Đánh dấu là đã đọc</Text>
                <Icon name="arrow-up-from-bracket" size={20} color="black" />
              </View>
            </TouchableOpacity>
          )}
          {!unConflic && showFooter && !checked && (
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={styles.mark}>
              <Icon name="circle-notch" size={20} color="#C02135" />
              </View>
            </TouchableOpacity>
          )}
          {!unConflic && showFooter && checked && (
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={styles.mark}>
                <Icon name="circle-check" size={20} color="#C02135" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

  subject: {
    color: 'red',
  },
  time: {
    color: '#020202',
  },

  notification: {
    // borderWidth: 2,
    marginTop: 8,
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
    marginTop: 8,
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
});

export default TaskNotification;
