import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClassStacks} from '../class/navigation';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Class" screenOptions={{
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    }}>
      <Tab.Screen name="Class" component={ClassStacks} />
    </Tab.Navigator>
  );
};
