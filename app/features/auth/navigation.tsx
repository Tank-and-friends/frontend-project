// AppNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginAccountScreen from './LoginAccountScreen';
import LoginScreen from './LoginScreen';
import PasswordScreen from './PasswordScreen';
import SignupCreateScreen from './SignupCreateScreen';
import SignupScreen from './SignupScreen';
import VerifyEmailScreen from './VerifyEmailScreen';
import ClassList from '../class/ClassListScreen';

export type ParamsList = {
  LoginAccountScreen: undefined;
  LoginScreen: {email: null | string};
  PasswordScreen: {email: string};
  SignupScreen: {email: null | string};
  SignupCreateScreen: {email: string};
  VerifyEmailScreen: {email: string};
  ClassList: undefined;
};

const Stack = createStackNavigator<ParamsList>();

export const AuthStacks = () => (
  <Stack.Navigator initialRouteName="LoginAccountScreen">
    <Stack.Screen
      name="LoginAccountScreen"
      component={LoginAccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignupCreateScreen"
      component={SignupCreateScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="VerifyEmailScreen"
      component={VerifyEmailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ClassList"
      component={ClassList}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AuthStacks;
