// AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountInfoScreen from './AccountInfoScreen';
import AccountUpdateScreen from './AccountUpdateScreen2';
import PasswordChangeScreen from './PasswordChangeScreen';

export type RootStackParamList = {
  AccountInfoScreen: undefined;
  AccountUpdateScreen: undefined;
  PasswordChangeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const UserInfoStacks = () => (
  <Stack.Navigator initialRouteName="AccountInfoScreen">
    <Stack.Screen
      name="AccountInfoScreen"
      component={AccountInfoScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AccountUpdateScreen"
      component={AccountUpdateScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PasswordChangeScreen"
      component={PasswordChangeScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
