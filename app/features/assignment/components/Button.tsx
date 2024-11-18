import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ButtonProps {
  content: string;
  color: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({content, color, onPress}) => {
  const styles = createStyles(color);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (color: string) =>
  StyleSheet.create({
    button: {
      backgroundColor: color,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 1000,
      alignItems: 'center',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
    },
  });

export default Button;
