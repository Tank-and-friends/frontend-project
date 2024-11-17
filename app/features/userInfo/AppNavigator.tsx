// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountInfoScreen from './AccountInfoScreen';
import AccountUpdateScreen from './AccountUpdateScreen2';
import PasswordChangeScreen from './PasswordChangeScreen';

export type RootStackParamList = {
  AccountInfoScreen: undefined;
  AccountUpdateScreen: undefined;
  PasswordChangeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="AccountInfoScreen">
    <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AccountUpdateScreen" component={AccountUpdateScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen} options={{ headerShown: false }} />

  </Stack.Navigator>
);

export default AppNavigator;
