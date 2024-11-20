// LabeledInput.tsx
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface LabeledInputProps {
  label: string;
  isRequired?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  isRequired = false,
  errorMessage,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && <Text style={styles.asterisk}>*</Text>}
      </View>
      <TextInput
        style={[styles.input, errorMessage && styles.inputError]}
        {...textInputProps}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  asterisk: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default LabeledInput;
