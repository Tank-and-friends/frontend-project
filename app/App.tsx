/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStacks} from './navigation';
import {UniqueIdProvider} from './utils/uniqueId';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  AsyncStorage.setItem('token', 'p6mYzC');
  AsyncStorage.setItem('id', '277');
  AsyncStorage.setItem('role', 'LECTURER');

  return (
    <SafeAreaProvider>
      <UniqueIdProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <RootStacks />
          </NavigationContainer>
        </GestureHandlerRootView>
      </UniqueIdProvider>
    </SafeAreaProvider>
  );
}

export default App;
