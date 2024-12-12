import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ClassRegisterListScreen from './ClassRegisterListScreen';
import ClassRegisterScreen from './ClassRegisterScreen';
import NewClassScreen from './NewClassScreen';

const Stack = createStackNavigator();

export const ClassRegisterStacks = () => {
  return (
    <Stack.Navigator initialRouteName="ClassRegisterScreen">
      <Stack.Screen
        name="ClassRegisterScreen"
        component={ClassRegisterScreen}
        options={{headerShown: false}}
        initialParams={{userRole: 'teacher'}}
      />
      <Stack.Screen name="ClassRegisterList" options={{headerShown: false}} component={ClassRegisterListScreen}/>
      <Stack.Screen name="NewClassForm" options={{headerShown: false}} component={NewClassScreen} />
    </Stack.Navigator>
  );
};
