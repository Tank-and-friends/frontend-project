import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {TextField} from '../../components/TextField/TextField';
import TopComponent from '../../components/TopComponent/TopComponent';
import OpenClasses from './components/OpenClasses';
import RegisteredClasses from './components/RegisteredClasses';

const ClassRegisterMain = ({navigation}: any) => {
  const [activeScreen, setActiveScreen] = useState('Screen1');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
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
            Lớp đã đăng ký
          </Button>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollableContent}
          style={styles.scrollableContent}
          showsHorizontalScrollIndicator={false}>
          {activeScreen === 'Screen1' ? (
            <OpenClasses navigation={navigation} /> // Pass navigation here
          ) : (
            <RegisteredClasses />
          )}
        </ScrollView>
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
  },
});

export default ClassRegisterMain;
