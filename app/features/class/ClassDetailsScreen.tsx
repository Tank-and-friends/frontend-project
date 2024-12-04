/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export type ParamList = {
  ClassStacks: {
    screen: string;
  };
  MaterialStacks: {
    screen: string;
  };
  AssignmentStacks: {
    screen: string;
  };
  ClassDetailsScreen: {classId: string; className: string};
  AbsenceRequestsList: undefined;
};

const ClassDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const route = useRoute<RouteProp<ParamList, 'ClassDetailsScreen'>>();
  const {classId, className} = route.params;

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch">
        <View style={styles.container}>
          <Text style={styles.title}>Class: {className}</Text>
          <Text style={styles.details}>Class ID: {classId}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('AssignmentStacks', {
              screen: 'AssignmentScreen',
            })
          }>
          Bài tập
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('MaterialStacks', {
              screen: 'ListMaterial',
            })
          }>
          Tài liệu
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('AbsenceRequestsList')
          }>
          Điểm danh
        </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
