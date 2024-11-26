import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import {AssignmentStacks} from './features/assignment/navigation';
import {AuthStacks} from './features/auth/navigation';
import ClassRegisterScreen from './features/class-register/ClassRegisterScreen';
import ClassListScreen from './features/class/ClassListScreen';
import {ClassFeaturesStacks, ClassStacks} from './features/class/navigation';
import {MaterialStacks} from './features/material/navigation';
import MessageScreen from './features/message/MessageScreen';
import {MessageFeaturesStacks} from './features/message/navigation';
import NotificationScreen from './features/notification/NotificationScreen';
import {UserInfoStacks} from './features/user-info/navigation';
import {ClassRegisterStacks} from './features/class-register/navigation';

export type RootStackParamList = {
  Home: undefined;
  ClassFeaturesStacks: undefined;
  MessageFeaturesStacks: undefined;
  MaterialStacks: undefined;
  UserInfoStacks: undefined;
  AuthStacks: undefined;
  AssignmentStacks: undefined;
  NotificationScreen: undefined;
  ClassRegisterScreen: undefined;
  ClassStacks: undefined;
  ClassNavigator: undefined;
  ClassRegisterStacks: undefined;
};

const Tab = createBottomTabNavigator();

const renderBottomNavBar = (props: any) => <BottomNavBar {...props} />;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={renderBottomNavBar}>
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Classes" component={ClassListScreen} />
      <Tab.Screen name="Register" component={ClassRegisterScreen} />
      <Tab.Screen name="Calendar" component={ClassListScreen} />
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
        name="MessageFeaturesStacks"
        component={MessageFeaturesStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MaterialStacks"
        component={MaterialStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserInfoStacks"
        component={UserInfoStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStacks"
        component={AuthStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AssignmentStacks"
        component={AssignmentStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassFeaturesStacks"
        component={ClassFeaturesStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassStacks"
        component={ClassStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassRegisterStacks"
        component={ClassRegisterStacks}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
