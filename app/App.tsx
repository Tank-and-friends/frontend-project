/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStacks} from './navigation';
import {UniqueIdProvider} from './utils/uniqueId';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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
