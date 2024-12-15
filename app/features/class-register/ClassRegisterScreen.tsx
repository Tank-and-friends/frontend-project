import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import OpenClasses from './components/OpenClasses';
import TeacherClasses from './components/TeacherClasses';

const ClassRegisterScreen = ({route}: {route: any}) => {
  const userRole = 'LECTURER';
  return (
    <PaperProvider>
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

          {/* <ScrollView
            contentContainerStyle={styles.scrollableContent}
            style={styles.scrollableContent}
            showsHorizontalScrollIndicator={false}>
            {activeScreen === 'Screen1' ? (
              <OpenClasses navigation={navigation} />
            ) : (
            )}
          </ScrollView> */}
          <ScrollView
            contentContainerStyle={styles.scrollableContent}
            style={styles.scrollableContent}
            showsHorizontalScrollIndicator={false}>
            {userRole === 'LECTURER' ? <TeacherClasses /> : <OpenClasses />}
          </ScrollView>
        </ImageBackground>
      </View>
    </PaperProvider>
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
});

export default ClassRegisterScreen;
