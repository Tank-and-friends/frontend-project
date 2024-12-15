import { ParamListBase, RouteProp, useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, TouchableRipple } from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { AbsenceRequestTab } from './components/AbsenceRequestTab';
import { AttendanceTab } from './components/AttendanceTab';

interface Props {
  route: RouteProp<ParamListBase, 'Attendance'> & {
    params: {
      classId: string;
    };
  };
}

export const AttendanceScreen = ({route}: Props) => {
  const {classId} = route.params;
  const navigation = useNavigation();
  const [tab, setTab] = useState('absence');

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small" style={styles.header}>
        <Appbar.BackAction
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content titleStyle={styles.headerTitle} title="Điểm danh" />
      </Appbar.Header>
      <View style={styles.body}>
        <View style={styles.tabBar}>
          <TouchableRipple
            style={styles.tab}
            onPress={() => setTab('attendance')}>
            <View style={styles.tabConent}>
              <Text style={styles.tabTitle}>DS điểm danh</Text>
              {tab === 'attendance' && (
                <FontAwesome6Icon
                  name="circle"
                  solid
                  size={6}
                  color="#c02135"
                  style={styles.tabActive}
                />
              )}
            </View>
          </TouchableRipple>
          <TouchableRipple style={styles.tab} onPress={() => setTab('absence')}>
            <View style={styles.tabConent}>
              <Text style={styles.tabTitle}>Xin nghỉ phép</Text>
              {tab === 'absence' && (
                <FontAwesome6Icon
                  name="circle"
                  solid
                  size={6}
                  color="#c02135"
                  style={styles.tabActive}
                />
              )}
            </View>
          </TouchableRipple>
        </View>
        {tab === 'attendance' ? <AttendanceTab classId={classId} /> : <AbsenceRequestTab />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#c02135',
    height: 76,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  body: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d5d7',
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabConent: {
    paddingTop: 16,
    paddingBottom: 6,
    flexDirection: 'column',
    gap: 4,
  },
  tabTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabActive: {
    textAlign: 'center',
  },
});
