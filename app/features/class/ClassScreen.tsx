import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import {Button} from 'react-native-paper';

export type ParamList = {
  ClassStacks: {
    screen: string;
  };
  MaterialNavigation: {
    screen: string;
  };
  AssignmentNavigation: {
    screen: string;
  };
  ClassScreen: {classId: string, className: string};
};

const ClassScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const route = useRoute<RouteProp<ParamList, 'ClassScreen'>>();
  const {classId, className} = route.params;

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch">
        <View style={styles.container}>
          <Text style={styles.title}>Class: {className}</Text>
          <Text style={styles.details}>Class ID: {classId}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('AssignmentNavigation', {
              screen: 'AssignmentScreen',
            })
          }>
          Bài tập
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('MaterialNavigation', {
              screen: 'ListMaterial',
            })
          }>
          Tài liệu
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('ClassStacks', {
              screen: 'AbsenceRequestsListScreen',
            })
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

export default ClassScreen;
