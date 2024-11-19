import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabs} from './features/home/navigation';
import {ClassStacks} from './features/class/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import NotificationScreen from './features/notification/NotificationScreen';
import MessageScreen from './features/message/MessageScreen';
import ClassScreen from './features/class/ClassScreen';
import ClassRegisterScreen from './features/classRegister/ClassRegisterScreen';
import LoginAccountScreen from './features/auth/LoginAccountScreen';
import MessageNavigation from './features/message/MessageNavigation';
import MaterialNavigation from './features/material/MaterialNavigation';
import UserInfoNavigator from './features/userInfo/UserInfoNavigator';
import AuthNavigator from './features/auth/AuthNavigator';
import AssignmentNavigation from './features/assignment/AssignmentNavigation';

export type RootStackParamList = {
  Home: undefined;
  ClassFeaturesStacks: undefined;
  MessageNavigation: undefined;
  MaterialNavigation: undefined;
  UserInfoNavigator: undefined;
  AuthNavigator: undefined;
  AssignmentNavigation: undefined;
  NotificationScreen: undefined;
  ClassRegisterScreen: undefined;
  ClassStacks: undefined;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomNavBar {...props} />}>
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Classes" component={ClassScreen} />
      <Tab.Screen name="Register" component={ClassRegisterScreen} />
      <Tab.Screen name="Calendar" component={ClassStacks} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStacks = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageNavigation"
        component={MessageNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MaterialNavigation"
        component={MaterialNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserInfoNavigator"
        component={UserInfoNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AssignmentNavigation"
        component={AssignmentNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassRegisterScreen"
        component={ClassRegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassStacks"
        component={ClassStacks}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
