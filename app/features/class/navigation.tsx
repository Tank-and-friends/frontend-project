import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AbsenceRequestStacks} from './absence-request/navigation';
import {AbsenceRequestsListScreen} from './AbsenceRequestsListScreen';
import ClassDetailsScreen from './ClassDetailsScreen';
import ClassListScreen from './ClassListScreen';
import {AttendanceScreen} from './attendance/AttendanceScreen';

const Stack = createStackNavigator();

export const ClassStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ClassList">
      <Stack.Screen
        name="ClassList"
        component={ClassListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassDetails"
        component={ClassDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenceRequestsList"
        component={AbsenceRequestsListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const ClassFeaturesStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AbsenceRequest"
        component={AbsenceRequestStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
