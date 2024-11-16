import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TaskDetailScreen from './features/assignment/TaskDetailScreen';
import AssignmentScreen from './features/assignment/AssignmentScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAssignmentScreen from './features/assignment/CreateAssignmentScreen';
import NotificationScreen from './features/notification/NotificationScreen';

export type RootStackParamList = {
  CreateAssignmentScreen: undefined;
  AssignmentScreen: undefined;
  NotificationScreen: undefined;
  TaskDetailScreen: {
    title: string;
    date: string;
    deadline: string;
    content: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Ensures it takes up full height
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        {/* <TaskDetailScreen
          title="Bài tập số 3"
          date="28/10/2023"
          deadline="23:59"
          content="Dưới đây là nội dung bài tập bla bla Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. tetur
                adipiscingF elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborumww."
        /> */}
        {/* <AssignmentScreen /> */}

        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
            />
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
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 0,
  },
  container: {
    flex: 1,
    padding: 0,
  },
});

export default App;
