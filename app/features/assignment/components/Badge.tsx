import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BadgeProps {
  content: string;
  color: string;
}

const Badge: React.FC<BadgeProps> = ({content, color}) => {
  const styles = createStyles(color);

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const createStyles = (color: string) =>
  StyleSheet.create({
    badge: {
      backgroundColor: color,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
      alignItems: 'center',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Badge;
