import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { AbsenceRequestInfo } from '../type';
import { Badge } from './Badge';

type ParamsList = {
  ClassFeatures: {
    screen: string;
    params: {
      screen: string;
    };
  };
};

export const AbsenceRequestCard = ({
  title,
  date,
  status,
}: AbsenceRequestInfo) => {
  const navigation = useNavigation<NavigationProp<ParamsList>>();

  const statusMarkup =
    status === 'ACCEPTED' ? (
      <Badge mode="success">Chấp nhận</Badge>
    ) : status === 'PENDING' ? (
      <Badge mode="warning">Chưa duyệt</Badge>
    ) : (
      <Badge mode="critical">Từ chối</Badge>
    );

  return (
    <Card
      elevation={4}
      style={styles.card}
      onPress={() =>
        navigation.navigate('ClassFeatures', {
          screen: 'AbsenceRequest',
          params: {
            screen: 'AbsenceRequestDetails',
          },
        })
      }>
      <Card.Title
        title={<Text style={styles.cardTitle}>{title}</Text>}
        subtitle={
          <Text style={styles.cardSubtitle}>{`Ngày tạo: ${date}`}</Text>
        }
      />
      {statusMarkup}
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
