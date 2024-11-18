import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, Text, View} from 'react-native';

export const ClassDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ClassDetailsScreen</Text>
      <Button
        title="Go to AbsenceList"
        onPress={() => {
          console.log('Go to AbsenceList"');
          navigation.navigate('AbsenceRequestsList' as never);
        }}
      />
    </View>
  );
};
