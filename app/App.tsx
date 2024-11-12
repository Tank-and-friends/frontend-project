import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TaskDetailScreen from './features/assignment/TaskDetailScreen';
// import AssignmentScreen from './features/assignment/AssignmentScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,  // Ensures it takes up full height
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <TaskDetailScreen />
        {/* <AssignmentScreen /> */}
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
