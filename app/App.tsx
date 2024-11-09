/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  TextInput as NativeTextInput,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {TextField} from './components/TextField/TextField';
import {TextInput as DepsTextInput} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {UniqueIdProvider} from './utils/uniqueId';

function App(): React.JSX.Element {
  const [text, setText] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log(text);

  return (
    <UniqueIdProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <TextField helpText="hello world" value={text} onChange={setText} />
          <DepsTextInput
            mode="outlined"
            keyboardType="default"
            placeholder="Nhập văn bản"
            clearButtonMode="while-editing"
            selectTextOnFocus
            right={<DepsTextInput.Affix text="/100" />}
          />
          <IonIcons name="close-circle" size={20} color="#000" />
          <NativeTextInput />
        </ScrollView>
      </SafeAreaView>
    </UniqueIdProvider>
  );
}

export default App;
