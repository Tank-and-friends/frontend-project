import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ClassRegisterListScreen from './ClassRegisterListScreen';
import ClassRegisterScreen from './ClassRegisterScreen';

const Stack = createStackNavigator();

export const ClassRegisterStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ClassRegisterScreen">
      <Stack.Screen
        name="ClassRegisterScreen"
        component={ClassRegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ClassRegisterList" component={ClassRegisterListScreen} />
    </Stack.Navigator>
  );
};
