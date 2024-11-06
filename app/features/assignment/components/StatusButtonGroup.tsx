import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StatusButtonProps {
  label: string;
  backgroundColor: string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ label, backgroundColor }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const StatusButtonGroup: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusButton label="Sắp tới" backgroundColor="#FF7F11" />
      <StatusButton label="Quá hạn" backgroundColor="#C62828" />
      <StatusButton label="Đã hoàn thành" backgroundColor="#C62828" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StatusButtonGroup;
