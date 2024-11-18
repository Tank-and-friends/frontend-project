import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { CreateAbsenceRequest } from './CreateAbsenceRequest';

const Stack = createStackNavigator();

export const AbsenceRequestStacks = () => {
  return (
    <Stack.Navigator initialRouteName="CreateAbsenceRequest">
      <Stack.Screen
        name="CreateAbsenceRequest"
        component={CreateAbsenceRequest}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
