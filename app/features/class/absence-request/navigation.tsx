import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AbsenceRequestManage } from './AbsenceRequestManage';
import { CreateAbsenceRequest } from './CreateAbsenceRequest';

const Stack = createStackNavigator();

export const AbsenceRequestStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAbsenceRequest"
        component={CreateAbsenceRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenceRequestManage"
        component={AbsenceRequestManage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
