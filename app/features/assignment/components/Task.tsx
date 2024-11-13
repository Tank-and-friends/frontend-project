import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import { useNavigation } from '@react-navigation/native';
type TaskNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;
interface TaskProps {
  title: string;
  status: string;
  statusColor: string;
  hasBadge: boolean;
  badgeText?: string;
  badgeColor?: string;
  date: string;
  content: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  status,
  statusColor,
  hasBadge,
  badgeText,
  badgeColor,
  date,
  content,
}) => {
  const navigation = useNavigation<TaskNavigationProp>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate('TaskDetailScreen', { title, date, deadline: status, content });
  };

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress} activeOpacity={0.99}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.taskContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
        </View>
        {hasBadge && badgeText && (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  taskContent: {
    flex: 1,
  },
  title: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  status: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 12,
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
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default Task;
