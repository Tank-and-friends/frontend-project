import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ClassRect from './ClassRect';
import { IconButton } from 'react-native-paper';

export default function TeacherClasses() {
  const classData = [
    {
      classTitle: 'Phát triển ứng dụng đa nền tảng',
      classTime: 'Sáng thứ 3, 6:45 - 10:05',
      classCode: '154052',
      status: 'Thành công',
    },
    {
      classTitle: 'Lập trình web',
      classTime: 'Chiều thứ 5, 13:30 - 17:00',
      classCode: '154056',
      status: 'Chờ xét duyệt',
    },
    {
      classTitle: 'Giải tích I',
      classTime: 'Sáng thứ 7, 8:00 - 12:00',
      classCode: '154053',
      status: 'Hủy lớp',
    },
    {
      classTitle: 'Phát triển ứng dụng đa nền tảng',
      classTime: 'Sáng thứ 3, 6:45 - 10:05',
      classCode: '154052',
      status: 'Thành công',
    },
    {
      classTitle: 'Lập trình web',
      classTime: 'Chiều thứ 5, 13:30 - 17:00',
      classCode: '154056',
      status: 'Chờ xét duyệt',
    },
    {
      classTitle: 'Giải tích I',
      classTime: 'Sáng thứ 7, 8:00 - 12:00',
      classCode: '154053',
      status: 'Hủy lớp',
    },
  ];

  return (
    <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.classGroupContainer}>
          {classData.map((classItem, index) => (
            <ClassRect
              key={index}
              classTitle={classItem.classTitle}
              classTime={classItem.classTime}
              classCode={classItem.classCode}
              status={classItem.status}
            />
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  classGroupContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingVertical: 10,
  },
});
