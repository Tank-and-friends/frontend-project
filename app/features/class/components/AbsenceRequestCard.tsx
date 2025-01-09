import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { AbsenceRequestReponse } from '../type';
import { Badge } from './Badge';

type ParamsList = {
  ClassFeaturesStacks: {
    screen: string;
    params: {
      screen: string;
      params: {
        absenceRequest: AbsenceRequestReponse;
      }
    };
  };
};

export const AbsenceRequestCard = ({
  absenceRequest,
}: {
  absenceRequest: AbsenceRequestReponse;
}) => {
  const navigation = useNavigation<NavigationProp<ParamsList>>();

  const statusMarkup =
    absenceRequest.status === 'ACCEPTED' ? (
      <Badge mode="success">Chấp nhận</Badge>
    ) : absenceRequest.status === 'PENDING' ? (
      <Badge mode="warning">Chưa duyệt</Badge>
    ) : (
      <Badge mode="critical">Từ chối</Badge>
    );

  return (
    <Card
      elevation={4}
      style={styles.card}
      onPress={() =>
        navigation.navigate('ClassFeaturesStacks', {
          screen: 'AbsenceRequest',
          params: {
            screen: 'AbsenceRequestManage',
            params: {
              absenceRequest,
            },
          },
        })
      }>
      <Card.Title
        title={<Text style={styles.cardTitle}>{absenceRequest.title}</Text>}
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
