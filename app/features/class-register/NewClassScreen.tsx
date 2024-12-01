/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Text } from 'react-native-paper';
import ClassRect from './components/ClassRect';
import { TextField } from '../../components/TextField/TextField';
import navigation from '../auth/navigation';

export default function NewClassScreen({route, navigation}: any) {
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
            <Text style={styles.headerTitle}>Danh sách lớp</Text>
            <Text style={styles.headerSubtitle}>Đăng ký mở lớp</Text>
          </View>
          <View style={styles.actionBtn}>
            <IconButton icon="cog-outline" iconColor="white" size={30} />
          </View>
        </Appbar.Header>

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.formTitle}>

            </View>
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
    paddingTop: 24,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 30,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2
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
    height: 500,
    borderRadius: 10,
    padding: 20,

  },
  formTitle:{

  }
  
});
