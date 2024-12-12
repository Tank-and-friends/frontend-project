import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import Assignment from './components/Assignment';
import StatusButtonGroup from './components/StatusButtonGroup';
import axios from 'axios';
import {Servey} from './type';
import {Text} from 'react-native-paper';
const AssignmentScreen = () => {
  const [dataServey, setDataSurvey] = useState<Servey[]>([]);

  const [labelStatus, setLabelStatus] = useState('All');

  useEffect(() => {
    const getAllServeys = async () => {
      try {
        const response = await axios.post(
          'http://157.66.24.126:8080/it5023e/get_all_surveys',
          {
            token: 'Mq9YoW',
            class_id: '000254',
          },
        );

        // Log meta và data từ API
        // console.log('Data:', response.data.data);

        if (response.data && response.data.data) {
          const apiDataServey = response.data.data.map((item: Servey) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            lecturer_id: item.lecturer_id,
            deadline: item.deadline,
            file_url: item.file_url,
            class_id: item.class_id,
          }));
          setDataSurvey(apiDataServey);
        }
        // console.log(response.data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      } finally {
        // setLoading(false); // Tắt trạng thái loading
      }
    };

    getAllServeys();
  }, []);

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

  const [typeStatus, setTypeStatus] = useState('');

  useEffect(() => {
    // Xác định typeStatus dựa trên labelStatus
    const mapLabelToTypeStatus = (label: string): string => {
      switch (label) {
        case 'Sắp tới':
          return 'UPCOMING';
        case 'Quá hạn':
          return 'PASS_DUE';
        case 'Đã hoàn thành':
          return 'COMPLETED';
        case 'All':
          return 'All';
        default:
          return '';
      }
    };

    const newTypeStatus = mapLabelToTypeStatus(labelStatus);
    setTypeStatus(newTypeStatus);
    console.log('niu leey bồ: ', newTypeStatus);

    const getAllSurveys = async () => {
      try {
        const response = await axios.post(
          'http://157.66.24.126:8080/it5023e/get_student_assignments',
          {
            token: 'Mq9YoW',
            type: newTypeStatus,
            class_id: '000254',
          },
        );

        if (response.data && response.data.data) {
          const apiDataSurvey = response.data.data.map((item: Servey) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            lecturer_id: item.lecturer_id,
            deadline: item.deadline,
            file_url: item.file_url,
            class_id: item.class_id,
          }));
          setDataSurvey(apiDataSurvey);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      } finally {
        // Tắt trạng thái loading (nếu có)
        // setLoading(false);
      }
    };

    const getAllServeys2 = async () => {
      try {
        const response = await axios.post(
          'http://157.66.24.126:8080/it5023e/get_all_surveys',
          {
            token: 'Mq9YoW',
            class_id: '000254',
          },
        );

        // Log meta và data từ API
        // console.log('Data:', response.data.data);

        if (response.data && response.data.data) {
          const apiDataServey = response.data.data.map((item: Servey) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            lecturer_id: item.lecturer_id,
            deadline: item.deadline,
            file_url: item.file_url,
            class_id: item.class_id,
          }));
          setDataSurvey(apiDataServey);
        }
        // console.log(response.data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      } finally {
        // setLoading(false); // Tắt trạng thái loading
      }
    };

    // Gọi hàm lấy dữ liệu
    if (newTypeStatus !== 'All') {
      getAllSurveys();
    } else {
      getAllServeys2();
    }
  }, [labelStatus]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <TopNavWithoutAvatar title="Bài tập" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />

        <View style={styles.statusGroup}>
          <StatusButtonGroup setLabelStatus={setLabelStatus} />
        </View>
        {false && <Text>{typeStatus}</Text>}
        <View style={styles.listAssgnment}>
          <ScrollView contentContainerStyle={{}}>
            {dataServey.map((item, index) => (
              <Pressable key={index}>
                <Assignment
                  key={index}
                  date={assignments[0].date}
                  day={assignments[0].date}
                  tasks={assignments[0].tasks}
                  serveyData={item}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* Footer */}
      {/* <View>
        </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  textInput: {
    margin: 16,
    borderRadius: 10,
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 87,
    // borderWidth: 1,
    // borderColor: 'green',
  },

  body: {
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'absolute',
    width: '100%',
    flex: 1,
    top: 78,
    height: '91%',
  },

  listAssgnment: {
    flex: 1,
    height: '80%',
    // borderWidth: 2,
    // borderColor: 'black',
  },

  statusGroup: {
    marginBottom: 5,
  },

  footer: {},
});

export default AssignmentScreen;
