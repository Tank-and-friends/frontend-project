/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MessageDetail from './features/message/MessageDetail';
import NewMessageScreen from './features/message/NewMessageScreen';
import MessageScreen from './features/message/MessageScreen';
import FriendPersonalInfo from './features/message/FriendPersonalInfo';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ListMaterial from './features/material/ListMaterial';
import DetailMaterial from './features/material/DetailMaterial';
import {UniqueIdProvider} from './utils/uniqueId';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';

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

// App Component
const App = () => {
  return (
    <UniqueIdProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              options={{headerShown: false}}
            />
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
        </NavigationContainer>
      </SafeAreaProvider>
    </UniqueIdProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
