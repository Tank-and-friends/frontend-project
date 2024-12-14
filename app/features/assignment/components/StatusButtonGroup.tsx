import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface StatusButtonProps {
  label: string;
  backgroundColor: string;
  onPress: () => void; // Thêm thuộc tính onPress
}

interface StatusButtonGroupProps {
  setLabelStatus: (label: string) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  label,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const StatusButtonGroup: React.FC<StatusButtonGroupProps> = ({
  setLabelStatus,
}) => {
  const [selectedButton, setSelectedButton] = useState<string>('All');

  const handlePress = (label: string) => {
    setSelectedButton(label);
    setLabelStatus(label);
  };

  return (
    <View style={styles.container}>
      <StatusButton
        label="All"
        backgroundColor={selectedButton === 'All' ? '#FF7F11' : '#C62828'}
        onPress={() => handlePress('All')}
      />
      <StatusButton
        label="Sắp tới"
        backgroundColor={selectedButton === 'Sắp tới' ? '#FF7F11' : '#C62828'}
        onPress={() => handlePress('Sắp tới')}
      />
      <StatusButton
        label="Quá hạn"
        backgroundColor={selectedButton === 'Quá hạn' ? '#FF7F11' : '#C62828'}
        onPress={() => handlePress('Quá hạn')}
      />
      <StatusButton
        label="Đã hoàn thành"
        backgroundColor={
          selectedButton === 'Đã hoàn thành' ? '#FF7F11' : '#C62828'
        }
        onPress={() => handlePress('Đã hoàn thành')}
      />
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
