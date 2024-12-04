import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AbsenceRequestsGroup } from '../type';
import { getDayOfWeek } from '../utils/date-time-util';
import { AbsenceRequestCard } from './AbsenceRequestCard';

interface Props {
  groups: AbsenceRequestsGroup[];
}

export const AbsenceRequestsList = ({groups}: Props) => {
  return (
    <View style={styles.groupsList}>
      {groups.map(group => {
        return (
          <View key={group.title} style={styles.groupContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{group.title}</Text>
              <Text style={styles.subtitle}>{getDayOfWeek('2024-10-27')}</Text>
            </View>
            <View style={styles.listContainer}>
              {group.items.map(item => {
                return (
                  <AbsenceRequestCard
                    key={item.title}
                    title={item.title}
                    date={item.date}
                    status={item.status}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  groupsList: {
    flexDirection: 'column',
    gap: 30,
  },
  groupContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'baseline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eff2ef',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 13,
    color: '#eff2ef',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  listContainer: {
    flexDirection: 'column',
    gap: 10,
  },
});
