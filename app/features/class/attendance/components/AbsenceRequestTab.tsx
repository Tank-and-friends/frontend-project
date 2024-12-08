import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

export const AbsenceRequestTab = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <List.Accordion
          title={
            <View style={styles.titleContainer}>
              <Text style={styles.title}>28 tháng 10</Text>
              <Text style={styles.subtitle}>Thứ hai</Text>
            </View>
          }
          id="1">
          <List.Item
            title={<Text style={styles.itemTitle}>Nghỉ ốm</Text>}
            titleStyle={styles.itemTitle}
            description={
              <View>
                <Text style={styles.nameSubtitle}>Nguyễn Văn A 20242024</Text>
                <Text style={styles.itemSubtitle}>Ngày nộp: 17/10/2024</Text>
              </View>
            }
          />
          <List.Item
            title={<Text style={styles.itemTitle}>Nghỉ ốm</Text>}
            titleStyle={styles.itemTitle}
            description={
              <View>
                <Text style={styles.nameSubtitle}>Nguyễn Văn A 20242024</Text>
                <Text style={styles.itemSubtitle}>Ngày nộp: 17/10/2024</Text>
              </View>
            }
          />
          <List.Item
            title={<Text style={styles.itemTitle}>Nghỉ ốm</Text>}
            titleStyle={styles.itemTitle}
            description={
              <View>
                <Text style={styles.nameSubtitle}>Nguyễn Văn A 20242024</Text>
                <Text style={styles.itemSubtitle}>Ngày nộp: 17/10/2024</Text>
              </View>
            }
          />
        </List.Accordion>
        <List.Accordion title="Accordion 2" id="2">
          <List.Item title="Item 2" />
        </List.Accordion>
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
  itemSubtitle: {
    fontSize: 12,
  },
});
