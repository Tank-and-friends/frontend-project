import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, DataTable } from 'react-native-paper';
import { AttendanceStatus } from '../types';
import { TablePagination } from './TablePagination';

// test data
const data = [{id: 100, mssv: '17020001', name: 'Nguyễn Văn A'}];

export const AttendanceTable = () => {
  const [status, setStatus] = useState<AttendanceStatus>('UNEXCUSED_ABSENCE');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

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
            {data[itemIndex] ? (
              <>
                <DataTable.Cell style={styles.indexColumn}>
                  {itemIndex + 1}
                </DataTable.Cell>
                <DataTable.Cell style={styles.idColumn}>
                  {data[itemIndex]?.mssv}
                </DataTable.Cell>
                <DataTable.Cell style={styles.nameColumn}>
                  {data[itemIndex]?.name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.attendanceColumn}>
                  <Checkbox
                    status={status === 'PRESENT' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      if (status === 'PRESENT') {
                        setStatus('UNEXCUSED_ABSENCE');
                      } else {
                        setStatus('PRESENT');
                      }
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.attendanceColumn}>
                  <Checkbox
                    status={
                      status === 'EXCUSED_ABSENCE' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      if (status === 'EXCUSED_ABSENCE') {
                        setStatus('UNEXCUSED_ABSENCE');
                      } else {
                        setStatus('EXCUSED_ABSENCE');
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
        page={page}
        numberOfPages={3}
        onPageChange={newPage => setPage(newPage)}
        label={`${page * pageSize + 1}-${Math.min(
          (page + 1) * pageSize,
          data.length,
        )} trong 10`}
        numberOfItemsPerPageList={[2, 5, 10]}
        numberOfItemsPerPage={pageSize}
        onItemsPerPageChange={newPageSize => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        showFastPaginationControls
        selectPageDropdownLabel="Số học sinh"
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
