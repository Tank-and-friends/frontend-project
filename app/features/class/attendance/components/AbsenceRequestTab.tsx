import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { formatDateTime } from '../../../../utils/datetime';
import { getAbsenceRequests } from '../../absence-request/api';
import { AbsenceRequestReponse } from '../../type';
import { getDayOfWeek } from '../../utils/date-time-util';

export const AbsenceRequestTab = () => {
  const [absenceRequests, setAbsenceRequests] = useState<
    AbsenceRequestReponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAbsenceRequests();
      setAbsenceRequests(data);
    };

    fetchData();
  }, []);

  const absenceRequestGroups = useMemo(() => {
    const groups: {[key: string]: AbsenceRequestReponse[]} = {};

    absenceRequests.forEach(item => {
      const key = formatDateTime(item.date);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
    });

    return Object.keys(groups)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime();
      })
      .map(key => {
        return {
          title: key,
          subtitle: getDayOfWeek(
            formatDateTime(key, 'dd/MM/yyyy', 'yyyy-MM-dd'),
          ),
          items: groups[key],
        };
      });
  }, [absenceRequests]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {absenceRequestGroups.map((group, index) => (
          <List.Accordion
            key={index}
            title={
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{group.title}</Text>
                <Text style={styles.subtitle}>{group.subtitle}</Text>
              </View>
            }
            id={index}>
            {group.items.map((item, i) => (
              <List.Item
                key={i}
                title={item.title}
                titleStyle={styles.itemTitle}
                description={
                  <View>
                    <Text style={styles.nameSubtitle}>
                      {item.student_account.first_name}{' '}
                      {item.student_account.last_name}{' '}
                      {item.student_account.student_id}
                    </Text>
                  </View>
                }
              />
            ))}
          </List.Accordion>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#000',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  nameSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
});
