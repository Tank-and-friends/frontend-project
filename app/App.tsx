/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {UniqueIdProvider} from './utils/uniqueId';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStacks} from './navigation';

const App: React.FC = () => {
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
};

export default App;
