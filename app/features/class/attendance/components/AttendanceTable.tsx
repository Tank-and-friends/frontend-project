import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Checkbox, DataTable} from 'react-native-paper';
import {PageInfo, Student} from '../../type';
import {TablePagination} from './TablePagination';

interface Props {
  data: Student[];
  pageInfo: PageInfo | null;
  handleCheckPresent: (index: number) => void;
  handleCheckExcused: (index: number) => void;
  handleCheckUnexcused: (index: number) => void;
  onChangePage: (page: number) => void;
  onChangePageSize: (pageSize: number) => void;
}

export const AttendanceTable = ({
  data,
  handleCheckExcused,
  handleCheckPresent,
  handleCheckUnexcused,
  pageInfo,
  onChangePage,
  onChangePageSize,
}: Props) => {
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  const {page, pageSize} = useMemo(() => {
    return {
      page: pageInfo?.page ?? 0,
      pageSize: pageInfo?.page_size ?? 5,
    };
  }, [pageInfo]);

  useEffect(() => {
    setStudentsList(data);
  }, [data]);

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title style={styles.indexColumn}> </DataTable.Title>
        <DataTable.Title style={styles.idColumn}>MSSV</DataTable.Title>
        <DataTable.Title style={styles.nameColumn}>Họ tên</DataTable.Title>
        <DataTable.Title style={styles.attendanceColumn}>
          Có mặt
        </DataTable.Title>
        <DataTable.Title style={styles.attendanceColumn}>
          Có phép
        </DataTable.Title>
      </DataTable.Header>

      {Array.from({length: pageSize}, (_, index) => index).map(index => {
        const itemIndex = pageSize * page + index;
        return (
          <DataTable.Row key={index}>
            {studentsList?.[itemIndex] ? (
              <>
                <DataTable.Cell style={styles.indexColumn}>
                  {itemIndex + 1}
                </DataTable.Cell>
                <DataTable.Cell style={styles.idColumn}>
                  {studentsList[itemIndex]?.account_id}
                </DataTable.Cell>
                <DataTable.Cell style={styles.nameColumn}>
                  {studentsList[itemIndex]?.name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.attendanceColumn}>
                  <Checkbox
                    status={
                      studentsList[itemIndex].status === 'PRESENT'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      if (studentsList[itemIndex].status === 'PRESENT') {
                        handleCheckUnexcused(itemIndex);
                      } else {
                        handleCheckPresent(itemIndex);
                      }
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.attendanceColumn}>
                  <Checkbox
                    status={
                      studentsList[itemIndex].status === 'EXCUSED_ABSENCE'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      if (
                        studentsList[itemIndex].status === 'EXCUSED_ABSENCE'
                      ) {
                        handleCheckUnexcused(itemIndex);
                      } else {
                        handleCheckExcused(itemIndex);
                      }
                    }}
                  />
                </DataTable.Cell>
              </>
            ) : null}
          </DataTable.Row>
        );
      })}
      <TablePagination
        page={pageInfo?.page ?? 0}
        numberOfItemsPerPage={pageInfo?.page_size ?? 5}
        onItemsPerPageChange={newPageSize => {
          onChangePageSize(newPageSize);
          onChangePage(0);
        }}
        numberOfPages={pageInfo?.total_page ?? 0}
        onPageChange={onChangePage}
        showFastPaginationControls
        selectPageDropdownLabel="Số học sinh"
        numberOfItemsPerPageList={[5, 10, 15, 20]}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d5d7',
  },
  indexColumn: {
    flex: 0.5, // Chiều rộng nhỏ cho cột STT
  },
  idColumn: {
    flex: 1.25, // Chiều rộng mặc định cho cột MSSV
  },
  attendanceColumn: {
    flex: 0.7, // Chiều rộng lớn cho cột điểm danh
    justifyContent: 'center',
  },
  nameColumn: {
    flex: 2, // Chiều rộng lớn cho cột họ tên
  },
});
