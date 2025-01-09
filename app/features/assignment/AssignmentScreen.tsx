import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopNavWithoutAvatar from '../../components/TopComponent/TopNavWithoutAvatar';
import Assignment from './components/Assignment';
import StatusButtonGroup from './components/StatusButtonGroup';
import {Survey} from './type';
import {Text} from 'react-native-paper';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {deleteAssignment, getAllSurveys, getStudentAssignments} from './api';
import NoTasks from './components/NoTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    return token || 'default_token'; // Giá trị mặc định nếu token không có
  } catch (error) {
    console.error('Error retrieving token:', error);
    return 'default_token'; // Giá trị mặc định khi lỗi xảy ra
  }
};

const AssignmentScreen = () => {
  const [role, setRole] = useState(''); // Giá trị mặc định

  // Lấy giá trị role từ AsyncStorage khi khởi chạy
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error('Error fetching role from AsyncStorage:', error);
      }
    };

    fetchRole();
  }, []);

  // Lưu giá trị role vào AsyncStorage khi role thay đổi
  useEffect(() => {
    const saveRole = async () => {
      try {
        await AsyncStorage.setItem('role', role);
      } catch (error) {
        console.error('Error saving role to AsyncStorage:', error);
      }
    };

    saveRole();
  }, [role]);
  const [dataServey, setDataSurvey] = useState<Survey[]>([]);

  const [labelStatus, setLabelStatus] = useState('All');
  const navigation = useNavigation();
  const [isDataEmpty, setIsDataEmpty] = useState(true);

  useEffect(() => {
    if (role !== 'LECTURER') {
      return;
    }
    const fetchData = async () => {
      const data = await getAllSurveys();

      setDataSurvey(data);
      setIsDataEmpty(data.length === 0);
    };

    fetchData();
    setRole(role);
  }, [role]);

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

  const [typeStatus, setTypeStatus] = useState<string | null>('');

  useEffect(() => {
    if (role !== 'STUDENT') {
      return;
    }
    // Xác định typeStatus dựa trên labelStatus
    const mapLabelToTypeStatus = (label: string): string | null => {
      switch (label) {
        case 'Sắp tới':
          return 'UPCOMING';
        case 'Quá hạn':
          return 'PASS_DUE';
        case 'Đã hoàn thành':
          return 'COMPLETED';
        default:
          return null;
      }
    };

    const newTypeStatus = mapLabelToTypeStatus(labelStatus);
    setTypeStatus(newTypeStatus);
    // console.log('niu leey bồ: ', newTypeStatus);

    const fetchData = async () => {
      const data = await getStudentAssignments('000254', newTypeStatus);

      setDataSurvey(data);
      setIsDataEmpty(data.length === 0);
    };

    fetchData();
  }, [labelStatus, role]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (role !== 'LECTURER') {
        return;
      }

      const fetchData = async () => {
        const data = await getAllSurveys();
        setDataSurvey(data);
        setIsDataEmpty(data.length === 0);
      };

      fetchData(); // Gọi API khi màn hình focus
      setRole(role); // Cập nhật role nếu cần (nếu không cần, có thể bỏ dòng này)
    });

    return unsubscribe; // Dọn dẹp listener khi component bị unmount
  }, [navigation, role]);

  const [showFooter, setShowFooter] = useState(false);

  const handleEdit = () => {
    setShowFooter(false);
  };

  const handleCreateAssignment = () => {
    navigation.navigate('CreateAssignmentScreen');
  };

  const [deleteDone, setDeleteDone] = useState(
    Array(dataServey.length).fill(false), // Khởi tạo mảng với tất cả giá trị `false`
  );

  const [checkedStates, setCheckedStates] = useState(
    Array(dataServey.length).fill(false), // Khởi tạo mảng với tất cả giá trị `false`
  );

  useEffect(() => {
    if (showFooter) {
      // Reset all checked states to false when showFooter is true
      setCheckedStates(Array(dataServey.length).fill(false));
      setDeleteDone(Array(dataServey.length).fill(false));
    }
  }, [showFooter, dataServey.length]);

  const deleteSurvey = async (survey_id: number, index: number) => {
    if (role !== 'LECTURER') {
      console.warn('Hành động này chỉ dành cho giảng viên (LECTURER).');
      return;
    }
    const token = await getToken();
    console.log('token: ', token);

    const fetchData = async () => {
      await deleteAssignment(token, survey_id.toString()).then(res => {
        if (!res) {
          setDeleteDone(prevState => {
            const updatedDeleteDone = [...prevState];
            updatedDeleteDone[index] = true;

            return updatedDeleteDone;
          });
        }
      });
    };

    fetchData();
  };

  useEffect(() => {
    if (showFooter) {
      // Reset all checked states to false when showFooter is true
      setCheckedStates(Array(dataServey.length).fill(false));
      setDeleteDone(Array(dataServey.length).fill(false));
    }
  }, [showFooter, dataServey.length]);

  const handleDeleteSelected = async () => {
    const selectedIndexes = checkedStates
      .map((checked, index) => (checked ? index : null)) // Lấy index nếu checked là true
      .filter(index => index !== null); // Loại bỏ các giá trị null
    // console.log('Danh sách các index được chọn:', selectedIndexes);
    const updatedNotifications = dataServey.map((notification, index) => {
      if (checkedStates[index]) {
        // markNotificationAsRead(String(notification.id));
        deleteSurvey(notification.id, index);
        return {...notification}; // Đánh dấu đã đọc
      }
      return notification; // Không thay đổi nếu không được chọn
    });
    setDataSurvey(updatedNotifications);
    if (selectedIndexes.length > 0) {
      setShowFooter(false);
      //console.log('check: ', checkedStates);

      const updatedSurveys = dataServey.filter(_ => true);

      // Cập nhật lại trạng thái dataServey
      setDataSurvey(updatedSurveys);

      // Reset checkedStates tương ứng với danh sách mới
      setCheckedStates(Array(updatedSurveys.length).fill(false));
    } else {
    }

    if (role !== 'LECTURER') {
      return;
    }

    const fetchData = async () => {
      const data = await getAllSurveys();
      setDataSurvey(data);
      setIsDataEmpty(data.length === 0);
    };

    fetchData(); // Gọi API khi màn hình focus
    setRole(role); // Cập nhật role nếu cần (nếu không cần, có thể bỏ dòng này)
  };

  useEffect(() => {
    //console.log('deleteDone has changed:', deleteDone);
  }, [deleteDone]);

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

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (role === 'LECTURER') {
        const fetchData = async () => {
          const data = await getAllSurveys(); // Gọi API để lấy dữ liệu

          setDataSurvey(data); // Cập nhật dữ liệu
          setIsDataEmpty(data.length === 0); // Kiểm tra xem dữ liệu có rỗng hay không
        };

        await fetchData(); // Đợi hàm fetchData hoàn thành
      } else {
        const mapLabelToTypeStatus = (label: string): string | null => {
          switch (label) {
            case 'Sắp tới':
              return 'UPCOMING';
            case 'Quá hạn':
              return 'PASS_DUE';
            case 'Đã hoàn thành':
              return 'COMPLETED';
            default:
              return null;
          }
        };

        const newTypeStatus = mapLabelToTypeStatus(labelStatus);
        setTypeStatus(newTypeStatus);
        // console.log('niu leey bồ: ', newTypeStatus);

        const fetchData = async () => {
          const data = await getStudentAssignments('000254', newTypeStatus);

          setDataSurvey(data);
          setIsDataEmpty(data.length === 0);
        };

        fetchData();
      }
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setRefreshing(false);
    }
  };

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

        {role === 'STUDENT' && (
          <View style={styles.statusGroup}>
            <StatusButtonGroup setLabelStatus={setLabelStatus} />
          </View>
        )}
        {false && <Text>{typeStatus}</Text>}
        <View style={styles.listAssgnment}>
          {!isDataEmpty && (
            <ScrollView
              contentContainerStyle={{}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }>
              {dataServey.map((item, index) => (
                <Pressable key={index}>
                  <Assignment
                    key={index}
                    date={assignments[0].date}
                    day={assignments[0].date}
                    tasks={assignments[0].tasks}
                    serveyData={item}
                    checked={checkedStates[index]}
                    setChecked={value => {
                      const updatedStates = [...checkedStates];
                      updatedStates[index] = value;
                      setCheckedStates(updatedStates);
                    }}
                    showFooter={showFooter}
                    setShowFooter={setShowFooter}
                  />
                </Pressable>
              ))}
            </ScrollView>
          )}

          {isDataEmpty && <NoTasks />}

          {/* Button Create Assignment */}
          {role === 'LECTURER' && !showFooter && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleCreateAssignment()}>
              <Text style={styles.createButtonText}>Create Assignment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Footer */}
      {showFooter && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={handleEdit}>
            <Icon3 name="pencil-outline" size={25} color="white" />
            <Text style={styles.footerText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleDeleteSelected}>
            <Icon3 name="trash-can-outline" size={25} color="white" />
            <Text style={styles.footerText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon3 name="dots-horizontal" size={25} color="white" />
            <Text style={styles.footerText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      )}
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

  footerText: {
    color: 'white',
    opacity: 0.6,
  },
  createButton: {
    backgroundColor: '#C02135',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssignmentScreen;
