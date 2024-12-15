import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AssignmentScreen from './AssignmentScreen';
import CreateAssignmentScreen from './CreateAssignmentScreen';
import TaskDetailScreen from './TaskDetailScreen';
import {Survey} from './type';

export type RootStackParamList = {
  CreateAssignmentScreen: undefined;
  AssignmentScreen: undefined;
  TaskDetailScreen: {
    title: string;
    date: string;
    deadline: string;
    content: string;
    formattedDate: string;
    serveyData: Survey;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AssignmentStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AssignmentScreen"
        component={AssignmentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAssignmentScreen"
        component={CreateAssignmentScreen}
      />
      <Stack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={({route}) => ({
          headerShown: false, // Ẩn header
          // Các tùy chọn khác nếu cần
          title: route.params?.title || '', // (nếu vẫn muốn sử dụng tiêu đề trong tương lai)
        })}
      />
    </Stack.Navigator>
  );
};
