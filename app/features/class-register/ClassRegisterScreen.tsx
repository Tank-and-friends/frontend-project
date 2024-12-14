/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import OpenClasses from './components/OpenClasses';
import RegisteredClasses from './components/RegisteredClasses';
import TeacherClasses from './components/TeacherClasses';

const ClassRegisterScreen = ({navigation, route}: {navigation: any; route: any}) => {
  console.log('Route Params:', route.params);
  const {userRole} = route.params;
  
  const [activeScreen, setActiveScreen] = useState('Screen1');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TopComponent title="Đăng ký lớp" />
        <TextField
          prefix={<IonIcons name="search" size={20} />}
          placeholder="Bạn muốn tìm gì ..."
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => setActiveScreen('Screen1')}
            style={[
              styles.switchButton,
              activeScreen === 'Screen1' && styles.activeButton,
            ]}
            labelStyle={[
              {fontSize: 12},
              activeScreen === 'Screen1' && {fontSize: 12, fontWeight: 'bold'},
            ]}>
            Danh sách lớp mở
          </Button>
          <Button
            mode="contained"
            onPress={() => setActiveScreen('Screen2')}
            style={[
              styles.switchButton,
              activeScreen === 'Screen2' && styles.activeButton,
            ]}
            labelStyle={[
              {fontSize: 12},
              activeScreen === 'Screen2' && {fontSize: 12, fontWeight: 'bold'},
            ]}>
            {userRole === 'student' ? 'Lớp đã đăng ký' : 'Lớp phụ trách'}
          </Button>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollableContent}
          style={styles.scrollableContent}
          showsHorizontalScrollIndicator={false}>
          {activeScreen === 'Screen1' ? (
            <OpenClasses/>
          ) : userRole === 'student' ? (
            <RegisteredClasses />
          ) : (
            <TeacherClasses/>
          )}
        </ScrollView>

        {userRole === 'teacher' && activeScreen === 'Screen2' && (
          <IconButton
              icon="plus"
              mode="contained"
              containerColor="#C02135"
              size={60}
              style={styles.newClassButton}
              iconColor='white'
              onPressIn={() => {
                styles.newClassButton.backgroundColor = '#FF5722';
              }}
              onPressOut={() => {
                styles.newClassButton.backgroundColor = '#C02135';
              }}
              onPress={() =>
                navigation.navigate('NewClassForm')
              }
          />
        )}
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
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  switchButton: {
    marginHorizontal: 5,
    width: '45%',
    backgroundColor: '#BA1B30',
  },
  activeButton: {
    backgroundColor: '#FF7F11',
  },
  scrollableContent: {
    paddingVertical: 10,
    width: '100%',
    paddingBottom: 120,
  },
  newClassButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,

    backgroundColor: '#C02135',
    borderRadius: 100, // Ensure it looks rounded (optional)

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
    zIndex: 1,
  },
});

export default ClassRegisterScreen;
