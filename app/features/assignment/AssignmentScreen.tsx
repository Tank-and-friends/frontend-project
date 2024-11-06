import React from 'react';
import {TextInput} from 'react-native-paper';
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import StatusButtonGroup from './components/StatusButtonGroup';
import Assignment from './components/Assignment';

const AssignmentScreen = () => {
  // const sampleAssignment = {
  //   date: '28 tháng 10',
  //   day: 'Thứ 2',
  //   tasks: [
  //     {
  //       title: 'Bài tập số 1',
  //       status: 'Đến hạn lúc 23:59',
  //       statusColor: '#FF7F11',
  //       hasBadge: true,
  //       badgeText: 'Đã nộp',
  //       badgeColor: '#FF7F11',
  //     },
  //     {
  //       title: 'Read Chapter 5 - History',
  //       status: 'Overdue',
  //       statusColor: '#C62828',
  //       hasBadge: true,
  //       badgeText: 'Late',
  //       badgeColor: '#C62828',
  //     },
  //     {
  //       title: 'Finish Science Project',
  //       status: 'Completed',
  //       statusColor: '#388E3C',
  //       hasBadge: false,
  //     },
  //   ],
  // };

  const assignments = [
    {
      date: '28 tháng 10',
      day: 'Thứ 2',
      tasks: [
        {
          title: 'Bài tập số 1',
          status: 'Đến hạn lúc 23:59',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Đã nộp',
          badgeColor: '#FF7F11',
        },
        {
          title: 'Đọc chương 5 - Lịch sử',
          status: 'Quá hạn',
          statusColor: '#C62828',
          hasBadge: true,
          badgeText: 'Trễ hạn',
          badgeColor: '#C62828',
        },
        {
          title: 'Hoàn thành dự án Khoa học',
          status: 'Đã hoàn thành',
          statusColor: '#388E3C',
          hasBadge: false,
        },
      ],
    },
    {
      date: '29 tháng 10',
      day: 'Thứ 3',
      tasks: [
        {
          title: 'Bài tập số 2',
          status: 'Đến hạn lúc 17:00',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Ưu tiên cao',
          badgeColor: '#C62828',
        },
        {
          title: 'Chuẩn bị cho buổi thuyết trình',
          status: 'Đến hạn hôm nay',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Quan trọng',
          badgeColor: '#FF7F11',
        },
        {
          title: 'Nghiên cứu đề tài khoa học',
          status: 'Đã hoàn thành',
          statusColor: '#388E3C',
          hasBadge: false,
        },
      ],
    },
    {
      date: '30 tháng 10',
      day: 'Thứ 4',
      tasks: [
        {
          title: 'Viết báo cáo',
          status: 'Đến hạn lúc 14:00',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Cần hoàn thành',
          badgeColor: '#FF7F11',
        },
        {
          title: 'Làm bài tập toán',
          status: 'Quá hạn',
          statusColor: '#C62828',
          hasBadge: true,
          badgeText: 'Trễ hạn',
          badgeColor: '#C62828',
        },
        {
          title: 'Đọc sách văn học',
          status: 'Đã hoàn thành',
          statusColor: '#388E3C',
          hasBadge: false,
        },
      ],
    },
    {
      date: '31 tháng 10',
      day: 'Thứ 5',
      tasks: [
        {
          title: 'Bài tập số 3',
          status: 'Đến hạn lúc 20:00',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Ưu tiên trung bình',
          badgeColor: '#FFA000',
        },
        {
          title: 'Ôn tập kiểm tra tiếng Anh',
          status: 'Đến hạn hôm nay',
          statusColor: '#FF7F11',
          hasBadge: true,
          badgeText: 'Quan trọng',
          badgeColor: '#FF7F11',
        },
        {
          title: 'Hoàn thành đề cương môn học',
          status: 'Đã hoàn thành',
          statusColor: '#388E3C',
          hasBadge: false,
        },
      ],
    },
  ];

  return (
    <ImageBackground
      source={require('./MessageBackground.png')}
      style={styles.backgroundImage}
      resizeMode="stretch">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TextInput
            placeholder="Bạn muốn tìm gì..."
            left={<TextInput.Icon icon={'menu'} />}
            right={<TextInput.Icon icon={'search-web'} />}
            style={styles.textInput}
          />

          <StatusButtonGroup />
        </View>

        {/* Body */}

        <View style={styles.body}>
          <View style={styles.listAssgnment}>
            <ScrollView contentContainerStyle={{}}>
              {assignments.map((item, index) => (
                <Pressable key={index}>
                  <Assignment
                    key={index}
                    date={item.date}
                    day={item.day}
                    tasks={item.tasks}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
        {/* Footer */}
        {/* <View></View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  backgroundImage: {
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
    width: '100%',
    height: '100%',
  },
  textInput: {
    margin: 16,
    borderRadius: 10,
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 217,
    // borderWidth: 1,
    // borderColor: 'green',
  },

  body: {
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'absolute',
    width: '100%',
    flex: 1,
    top: 218,
    height: '100%',
  },

  listAssgnment: {
    flex: 1,
    height: '80%',
    // borderWidth: 2,
    // borderColor: 'black',
    marginBottom: 200,
  },

  footer: {},
});

export default AssignmentScreen;
