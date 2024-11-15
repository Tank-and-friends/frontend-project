import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, IconButton, Text, TextInput, Button } from 'react-native-paper';
import TopComponent from './components/TopComponent';
import OpenClasses from './components/OpenClasses';
import RegisteredClasses from './components/RegisteredClasses';

const ClassRegisterScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Screen1');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <TopComponent/>
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
          ]}
        >
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
          ]}
        >
          Lớp đã đăng ký
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent} 
        style={styles.scrollableContent}
        showsHorizontalScrollIndicator={false}
        > 
        {activeScreen === 'Screen1' ? (
          <OpenClasses/>
        ) : (
          <RegisteredClasses/>
        )}
      </ScrollView>
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
    width: '100%'
  },
  classContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%'
  },
  switchButton: {
    marginHorizontal: 5,
    width: '45%',
    backgroundColor: '#BA1B30'
  },
  activeButton: {
    backgroundColor: '#FF7F11',
  },
  scrollableContent: {
    paddingVertical: 10,
    width: '100%',
  },
  screenContent: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ClassRegisterScreen;
