/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MessageDetail from './features/message/MessageDetail';
import NewMessageScreen from './features/message/NewMessageScreen';
import MessageScreen from './features/message/MessageScreen';
import FriendPersonalInfo from './features/message/FriendPersonalInfo';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ListMaterial from './features/material/ListMaterial';
import DetailMaterial from './features/material/DetailMaterial';
import {UniqueIdProvider} from './utils/uniqueId';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UserInfoNavigator from './features/userInfo/UserInfoNavigator';
import AuthNavigator from './features/auth/AuthNavigator';
import TaskDetailScreen from './features/assignment/TaskDetailScreen';
import AssignmentScreen from './features/assignment/AssignmentScreen';
import CreateAssignmentScreen from './features/assignment/CreateAssignmentScreen';
import NotificationScreen from './features/notification/NotificationScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

// Tab Navigation with Custom Tab Bar
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomNavBar {...props} />}>
      <Tab.Screen name="Notifications" component={DummyScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Classes" component={DummyScreen} />
      <Tab.Screen name="Register" component={ListMaterial} />
      <Tab.Screen name="Calendar" component={DummyScreen} />
    </Tab.Navigator>
  );
};

// Dummy screen for unused routes
const DummyScreen = () => (
  <View style={styles.center}>
    <Text>Coming Soon!</Text>
  </View>
);

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

const AssignmentStack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Ensures it takes up full height
  };

  return (
    <SafeAreaProvider>
      <UniqueIdProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            {/* tab navigation */}
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={TabNavigation}
                options={{headerShown: false}}
              />
              {/* message navigation */}
              <Stack.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MessageDetail"
                component={MessageDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FriendPersonalInfo"
                component={FriendPersonalInfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewMessageScreen"
                component={NewMessageScreen}
                options={{headerShown: false}}
              />
              {/* material navigation */}
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

            <UserInfoNavigator />
            <AuthNavigator />
            {/* assignment and notification navigator */}
            <AssignmentStack.Navigator>
              <AssignmentStack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
              <AssignmentStack.Screen
                name="CreateAssignmentScreen"
                component={CreateAssignmentScreen}
              />
              <AssignmentStack.Screen
                name="AssignmentScreen"
                component={AssignmentScreen}
                options={{title: 'Assignments'}}
              />
              <AssignmentStack.Screen
                name="TaskDetailScreen"
                component={TaskDetailScreen}
                options={({route}) => ({title: route.params.title})}
              />
            </AssignmentStack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UniqueIdProvider>
    </SafeAreaProvider>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
