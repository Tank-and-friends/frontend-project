/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Appbar, Button, IconButton, Text} from 'react-native-paper';
import {TextField} from '../../components/TextField/TextField';
import DatePickerInput from '../../components/DatePicker';
import {CreateClassReq} from '../../models/Register';
import {createClass} from '../../apis/RegisterApi';
import {RouteProp, useNavigation} from '@react-navigation/native';

type RouteProps = {
  NewClassScreen: {
    onUpdate: () => void;
  };
};

type Props = PropsWithChildren<{route: RouteProp<RouteProps>}>;

export default function NewClassScreen({route}: Props) {
  const {onUpdate} = route.params;
  const navigation = useNavigation();
  const [classInfo, setClassInfo] = useState<CreateClassReq>({
    class_id: '',
    class_name: '',
    class_type: '',
    max_student_amount: '',
    start_date: '',
    end_date: '',
  });

  const handleDataChange = (field: string, value: string) => {
    setClassInfo({...classInfo, [field]: value});
  };

  const handleSubmit = () => {
    createClass(classInfo).then(res => {
      if (res) {
        onUpdate();
        navigation.goBack();
      }
    });
  };

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
            <Text style={styles.headerTitle}>Đăng ký lớp</Text>
            <Text style={styles.headerSubtitle}>Đăng ký mở lớp</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="cog-outline" iconColor="white" size={30} />
          </View>
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.formTitle}>
              <Text
                style={[
                  styles.headerTitle,
                  {color: '#071013', fontWeight: '700'},
                ]}>
                Thông tin lớp
              </Text>
            </View>
            <View style={styles.formTextField}>
              <View style={styles.formClassName}>
                <TextField
                  id="class_name"
                  name="class_name"
                  customLabel="Học phần"
                  onChange={value => handleDataChange('class_name', value)}
                />
              </View>
              <View style={styles.formTimePlace}>
                <View style={styles.formTime}>
                  <View style={{width: '50%'}}>
                    <TextField
                      id="class_id"
                      name="class_id"
                      onChange={value => handleDataChange('class_id', value)}
                      customLabel="Mã học phần"
                    />
                  </View>
                  <View style={{width: '50%'}}>
                    <TextField
                      id="class_type"
                      name="class_type"
                      customLabel="Loại lớp "
                      onChange={value => handleDataChange('class_type', value)}
                    />
                  </View>
                </View>
                <View style={styles.formTime}>
                  <View style={{width: '100%'}}>
                    <TextField
                      id="max_student_amount"
                      name="max_student_amount"
                      customLabel="Số lượng sinh viên tối đa "
                      type="integer"
                      onChange={value =>
                        handleDataChange('max_student_amount', value)
                      }
                    />
                  </View>
                </View>
                <View style={[styles.formTime, {justifyContent: 'center', paddingTop: 10}]}>
                  <View style={{width: '94%'}}>
                    <DatePickerInput
                      label="Thời gian bắt đầu"
                      value={classInfo.start_date}
                      onChange={value => handleDataChange('start_date', value)}
                    />
                  </View>
                </View>
                <View style={[styles.formTime, {justifyContent: 'center'}]}>
                  <View style={{width: '94%'}}>
                    <DatePickerInput
                      label="Thời gian kết thúc"
                      value={classInfo.end_date}
                      onChange={value => handleDataChange('end_date', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Button
              mode="contained"
              style={{margin: 10, borderRadius: 6, marginBottom: 20}}
              buttonColor="#FF7F11"
              textColor="white"
              onPress={handleSubmit}>
              Gửi yêu cầu
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundClassImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: 30,
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
  formContainer: {
    backgroundColor: '#EFF2EF',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  formTitle: {
    gap: 4,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  line: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 2,
  },
  formTextField: {
    padding: 0,
    width: '100%',
  },
  formClassName: {},
  formTimePlace: {
    width: '100%',
  },
  formTime: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
