import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ClassListScreen} from './ClassListScreen';
import {ClassDetailsScreen} from './ClassDetailsScreen';
import {AbsenceRequestsListScreen} from './AbsenceRequestsListScreen';
import {AbsenceRequestStacks} from './absence-request/navigation';

const Stack = createStackNavigator();

export const ClassStacks = () => {
  return (
    <Stack.Navigator initialRouteName="AbsenceRequestsList">
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
    </Stack.Navigator>
  );
};
