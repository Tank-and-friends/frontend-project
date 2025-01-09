import {useFocusEffect} from '@react-navigation/core';
import {format} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {formatDateTime} from '../../../../utils/datetime';
import {
  getAttendanceDates,
  getAttendanceList,
  getStudentsList,
  setAttendanceStatus,
  takeAttendance,
} from '../../api';
import {
  AttendanceStudentDetails,
  PageInfo,
  Student,
  StudentAccount,
} from '../../type';
import {AttendanceTable} from './AttendanceTable';
import {FilterTab} from './FilterTab';

interface Props {
  classId?: string;
}

export const AttendanceTab = ({classId}: Props) => {
  const [lessonsList, setLessonsList] = useState(['Hôm nay']);
  const [lesson, setLesson] = useState(lessonsList[0]);
  const [studentsList, setStudentsList] = useState<StudentAccount[]>([]);
  const [attendanceList, setAttendanceList] = useState<
    AttendanceStudentDetails[]
  >([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    const fetchStudentsList = async () => {
      const data = await getStudentsList(classId);

      setStudentsList(data);
    };

    fetchStudentsList();
  }, [classId]);

  useFocusEffect(
    useCallback(() => {
      const fetchAttendanceDates = async () => {
        const data = await getAttendanceDates(classId);

        const formattedData = data.reverse().map((date, index) => {
          const formattedDate = formatDateTime(date);
          return `Buổi ${data.length - index} - ${formattedDate}`;
        });

        const isNow = formattedData[0]?.includes(
          format(new Date(), 'dd/MM/yyyy'),
        );

        let list = [...formattedData];
        if (!isNow) {
          list.splice(0, 0, 'Hôm nay');
        }

        setLessonsList([...list]);
      };

      fetchAttendanceDates();
    }, [classId]),
  );

  useEffect(() => {
    const date = lesson.split(' - ')[1];

    const fetchAttendanceList = async () => {
      const data = await getAttendanceList(
        classId,
        formatDateTime(date, 'dd/MM/yyyy', 'yyyy-MM-dd'),
        page,
        pageSize,
      );

      setAttendanceList(data.attendanceStudentDetails);
      setPageInfo(data.page_info);
    };

    if (date) {
      fetchAttendanceList();
    }
  }, [classId, lesson, page, pageSize]);

  useEffect(() => {
    const list = studentsList.map(student => {
      const attendance = attendanceList.find(
        item => item.student_id === student.student_id,
      );

      return {
        attendance_id: attendance?.attendance_id ?? undefined,
        account_id: student.account_id,
        student_id: student.student_id,
        name: `${student.first_name} ${student.last_name}`,
        status:
          lesson !== 'Hôm nay'
            ? attendance?.status ?? 'UNEXCUSED_ABSENCE'
            : 'UNEXCUSED_ABSENCE',
      };
    });

    setStudents(list);
  }, [studentsList, attendanceList, lesson]);

  const handleCheckPresent = (index: number) => {
    const updatedList = [...students];
    updatedList[index].status = 'PRESENT';
    setStudents(updatedList);
  };

  const handleCheckExcused = (index: number) => {
    const updatedList = [...students];
    updatedList[index].status = 'EXCUSED_ABSENCE';
    setStudents(updatedList);
  };

  const handleCheckUnexcused = (index: number) => {
    const updatedList = [...students];
    updatedList[index].status = 'UNEXCUSED_ABSENCE';
    setStudents(updatedList);
  };

  const handleSaveAttendance = useCallback(async () => {
    let attendanceDetails: AttendanceStudentDetails[];
    if (lesson === 'Hôm nay') {
      const attendanceListDetails = students
        .filter(student => student.status !== 'UNEXCUSED_ABSENCE')
        .map(student => student.attendance_id ?? '');

      await takeAttendance(
        classId,
        format(new Date(), 'yyyy-MM-dd'),
        attendanceListDetails,
      );

      const data = await getAttendanceList(
        classId,
        format(new Date(), 'yyyy-MM-dd'),
        page,
        pageSize,
      );

      attendanceDetails = data.attendanceStudentDetails;
    } else {
      attendanceDetails = [...attendanceList];
    }

    for (const student of students) {
      const attendance = attendanceDetails.find(
        item => item.student_id === student.student_id,
      );

      if (attendance) {
        await setAttendanceStatus(attendance.attendance_id, student.status);
      }
    }
  }, [lesson, students, classId, page, pageSize, attendanceList]);

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <FilterTab
            lessonsList={lessonsList}
            value={lesson}
            onChange={value => {
              setLesson(value);
              setPage(0);
            }}
            onSave={handleSaveAttendance}
          />
          <AttendanceTable
            data={students}
            pageInfo={pageInfo}
            handleCheckPresent={handleCheckPresent}
            handleCheckExcused={handleCheckExcused}
            handleCheckUnexcused={handleCheckUnexcused}
            onChangePage={_page => setPage(_page)}
            onChangePageSize={_pageSize => setPageSize(_pageSize)}
          />
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
