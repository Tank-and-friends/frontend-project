import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
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
};

const ClassScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch">
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
});

export default ClassScreen;
