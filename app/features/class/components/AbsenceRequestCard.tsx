import React from 'react';
import {Card, Text} from 'react-native-paper';
import {Badge} from './Badge';
import {StyleSheet} from 'react-native';
import {AbsenceRequestInfo} from '../type';

export const AbsenceRequestCard = ({
  title,
  date,
  status,
}: AbsenceRequestInfo) => {
  return (
    <Card elevation={4} style={styles.card}>
      <Card.Title
        title={<Text style={styles.cardTitle}>{title}</Text>}
        subtitle={
          <Text style={styles.cardSubtitle}>{`Ngày tạo: ${date}`}</Text>
        }
      />
      <Badge
        mode={
          status === 'accepted'
            ? 'success'
            : status === 'pending'
            ? 'warning'
            : 'critical'
        }
        style={styles.badge}>
        {status === 'accepted'
          ? 'Chấp nhận'
          : status === 'pending'
          ? 'Chưa duyệt'
          : 'Từ chối'}
      </Badge>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eff2ef',
    flexDirection: 'column',
  },
  cardTitle: {
    color: '#071013',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#46515f',
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    top: '50%',
    right: 17,
  },
});
