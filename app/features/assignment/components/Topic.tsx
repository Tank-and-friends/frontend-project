import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Topic = () => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContent}>
        <Text style={styles.title}>{}</Text>
        <Text
          style={[
            styles.status,
            {color: 'white'},/* eslint-disable-line react-native/no-inline-styles */
          ]}
        >
          {}
        </Text>
      </View>
      <View
        style={[
          styles.badge,
          {backgroundColor: '#FF7F11'}, /* eslint-disable-line react-native/no-inline-styles */
        ]}
      >
        <Text style={styles.badgeText}>Chưa nộp bài à</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  status: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 5,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: -40,
    backgroundColor: '#FF7F11',
  },
  badgeText: {
    color: '#EFF2EF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default Topic;
