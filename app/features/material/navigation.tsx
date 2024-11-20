import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailMaterial from './DetailMaterial';
import ListMaterial from './ListMaterial';

type ParamList = {
  ListMaterial: undefined;
  DetailMaterial: undefined;
};

const Stack = createStackNavigator<ParamList>();

export const MaterialStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ListMaterial">
      <Stack.Screen
        name="ListMaterial"
        component={ListMaterial}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMaterial"
        component={DetailMaterial}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
