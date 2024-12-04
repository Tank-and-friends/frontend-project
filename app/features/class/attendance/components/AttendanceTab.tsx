import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { AttendanceTable } from './AttendanceTable';
import { FilterTab } from './FilterTab';

export const AttendanceTab = () => {
  const [lessonsList, setLessonsList] = useState([
    'Buổi 3 - 27/10/2024',
    'Buổi 2 - 27/10/2024',
    'Buổi 1 - 27/10/2024',
  ]);
  const [lesson, setLesson] = useState(lessonsList[0]);

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <FilterTab
            lessonsList={lessonsList}
            value={lesson}
            onChange={setLesson}
          />
          <AttendanceTable />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
