/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TextField } from '../../components/TextField/TextField';
import ClassRectTab from './components/ClassRectTab';

export type ParamList = {
  ClassStacks: {
    screen: string;
  };
  MaterialStacks: {
    screen: string;
    params: {
      classId: string;
    };
  };
  AssignmentStacks: {
    screen: string;
    params: {
      classId: string;
    };
  };
  ClassDetailsScreen: {classId: string; className: string};
  AbsenceRequestsList: {
    classId: string;
  };
  ClassFeaturesStacks: {
    screen: string;
    params: {
      classId: string;
    };
  };
};

const ClassDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const route = useRoute<RouteProp<ParamList, 'ClassDetailsScreen'>>();
  const {classId, className} = route.params;
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      const _role = await AsyncStorage.getItem('role');
      console.log(_role);

      setRole(_role || '');
    };
    fetchRole();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch">
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.BackAction
            size={30}
            color="red"
            containerColor="white"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{className}</Text>
            <Text style={styles.headerSubtitle}>{classId}</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="cog-outline" iconColor="white" size={30} />
          </View>
        </Appbar.Header>
        <View style={{paddingTop: 30}}>
          <TextField
            prefix={<IonIcons name="search" size={20} />}
            placeholder="Bạn muốn tìm gì ..."
          />
        </View>
        <View style={styles.container}>
          {/* <Text style={styles.title}>Class: {className}</Text> */}
          {/* <Text style={styles.details}>Class ID: {classId}</Text> */}
          <ClassRectTab
            title="Tài liệu"
            subtitle="Xem những tài liệu chung liên quan đến lớp học"
            imageSource={require('../../assets/images/TaiLieu.png')}
            reverse={false}
            onPress={() =>
              navigation.navigate('MaterialStacks', {
                screen: 'ListMaterial',
                params: {
                  classId: classId,
                },
              })
            }
          />
          {role === 'LECTURER' ? (
            <ClassRectTab
              title="Điểm danh"
              subtitle="Điểm danh cho buổi học"
              imageSource={require('../../assets/images/XinNghiPhep.png')}
              reverse={true}
              onPress={() =>
                navigation.navigate('ClassFeaturesStacks', {
                  screen: 'Attendance',
                  params: {
                    classId: classId,
                  },
                })
              }
            />
          ) : (
            <ClassRectTab
              title="Xin nghỉ phép"
              subtitle="Gửi đơn xin vắng mặt cho buổi học sắp tới"
              imageSource={require('../../assets/images/XinNghiPhep.png')}
              reverse={true}
              onPress={() =>
                navigation.navigate('AbsenceRequestsList', {classId})
              }
            />
          )}

          <ClassRectTab
            title="Bài tập"
            subtitle="Những bài tập trong lớp học"
            imageSource={require('../../assets/images/BaiTap.png')}
            reverse={false}
            onPress={() =>
              navigation.navigate('AssignmentStacks', {
                screen: 'AssignmentScreen',
                params: {
                  classId: classId,
                },
              })
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'semibold',
    paddingLeft: 10,
    width: '90%',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D7C3B1',
    paddingLeft: 12,
  },
  actionBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    height: '70%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default ClassDetailsScreen;
