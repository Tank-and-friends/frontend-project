import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Assuming you're using FontAwesome icons

const NoTasks: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="clipboard-list" size={50} color="#C0C0C0" style={styles.icon} />
      <Text style={styles.title}>Không có công việc nào</Text>
      <Text style={styles.subtitle}>Hãy kiểm tra lại sau hoặc tạo công việc mới!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#071013',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});

export default NoTasks;
