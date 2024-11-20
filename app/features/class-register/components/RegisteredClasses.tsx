import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ClassRect from './ClassRect';

export default function RegisteredClasses() {
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
      status: 'Thất bại',
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
      status: 'Thất bại',
    },
  ];

  return (
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
