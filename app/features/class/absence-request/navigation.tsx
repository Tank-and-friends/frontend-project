import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AbsenceRequestManage } from './AbsenceRequestManage';
import { CreateAbsenceRequest } from './CreateAbsenceRequest';

const Stack = createStackNavigator();

const AbsenceRequestManageWrapper = (props: any) => <AbsenceRequestManage {...props} />;

export const AbsenceRequestStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAbsenceRequest"
        component={CreateAbsenceRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AbsenceRequestManageWrapper}
        name="AbsenceRequestManage"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
