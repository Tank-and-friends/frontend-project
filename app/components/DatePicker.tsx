import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  isRequired?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  isRequired = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: any, date?: Date) => {
    console.log('handleDateChange triggered', date);
    if (date) {
      const currentDate = date || selectedDate;
      setShowPicker(false);
      setSelectedDate(currentDate);
      onChange(currentDate.toISOString().split('T')[0]);
    } else {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && <Text style={styles.asterisk}>*</Text>}
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('Date picker opened');
          setShowPicker(true);
        }}>
        <TextInput
          style={styles.input}
          value={value}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingLeft: 10,
    color: 'black'
  },
  labelContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  asterisk: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#737077',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default DatePicker;
