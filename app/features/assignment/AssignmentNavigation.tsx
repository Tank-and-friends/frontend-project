import {createStackNavigator} from '@react-navigation/stack';
import CreateAssignmentScreen from './CreateAssignmentScreen';
import AssignmentScreen from './AssignmentScreen';
import TaskDetailScreen from './TaskDetailScreen';

export type RootStackParamList = {
  CreateAssignmentScreen: undefined;
  AssignmentScreen: undefined;
  TaskDetailScreen: {
    title: string;
    date: string;
    deadline: string;
    content: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AssignmentNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAssignmentScreen"
        component={CreateAssignmentScreen}
      />
      <Stack.Screen
        name="AssignmentScreen"
        component={AssignmentScreen}
        options={{title: 'Assignments'}}
      />
      <Stack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={({route}) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
};

export default AssignmentNavigation;
