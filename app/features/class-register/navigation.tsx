import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ClassRegisterListScreen from './ClassRegisterListScreen';
import ClassRegisterScreen from './ClassRegisterScreen';
import NewClassScreen from './NewClassScreen';

type ParamList = {
  ClassRegisterScreen: undefined;
  ClassRegisterList: undefined;
  NewClassScreen: {
    onUpdate: () => void;
  };
};
const Stack = createStackNavigator<ParamList>();

export const ClassRegisterStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ClassRegisterScreen">
      <Stack.Screen
        name="ClassRegisterScreen"
        component={ClassRegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClassRegisterList"
        options={{headerShown: false}}
        component={ClassRegisterListScreen}
      />
      <Stack.Screen
        name="NewClassScreen"
        options={{headerShown: false}}
        component={NewClassScreen}
      />
    </Stack.Navigator>
  );
};
