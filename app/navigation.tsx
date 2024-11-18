import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabs} from './features/home/navigation';
import {ClassFeaturesStacks} from './features/class/navigation';

export type RootStackParamList = {
  Home: undefined;
  ClassFeatures: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStacks = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassFeatures"
        component={ClassFeaturesStacks}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
