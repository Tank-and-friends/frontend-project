import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { AttendanceTable } from './AttendanceTable';
import { FilterTab } from './FilterTab';

export const AttendanceTab = () => {
  const [lessonsList, setLessonsList] = useState(['Chọn buổi học']);
  const [lesson, setLesson] = useState(lessonsList[0]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        // Fetch data here
      };

      fetchData();
    }, []),
  );

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
