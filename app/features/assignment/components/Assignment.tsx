import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Task from './Task';

interface TaskData {
  title: string;
  status: string;
  statusColor: string;
  hasBadge: boolean;
  badgeText?: string;
  badgeColor?: string;
}

interface AssignmentProps {
  date: string;
  day: string;
  tasks: TaskData[];
}

const Assignment: React.FC<AssignmentProps> = ({date, day, tasks}) => {
  return (
    <View style={styles.assignmentContainer}>
      <View style={styles.abc}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          status={task.status}
          statusColor={task.statusColor}
          hasBadge={task.hasBadge}
          badgeText={task.badgeText}
          badgeColor={task.badgeColor}
          date={date}
          content="hahahahDưới đây là nội dung bài tập bla bla Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. tetur
                adipiscingF elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborumww."
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  assignmentContainer: {
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  date: {
    color: '#EFF2EF',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    marginLeft: 15,
  },
  day: {
    color: '#EFF2EF',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 20,
  },
  abc: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default Assignment;
