import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailMaterial from './DetailMaterial';
import ListMaterial from './ListMaterial';
import {MaterialInfo} from '../../models/Material';

type ParamList = {
  ListMaterial: {
    classId: string;
  };
  DetailMaterial: {
    material: MaterialInfo;
  };
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
