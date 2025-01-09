import React from 'react';
import { StyleSheet } from 'react-native';
import { BadgeProps, Badge as PaperBadge } from 'react-native-paper';

interface Props {
  mode?: 'success' | 'warning' | 'critical' | 'default';
}

export const Badge = ({
  mode = 'default',
  ...props
}: Props & BadgeProps) => {
  const getStyle = ($mode: string) => {
    switch ($mode) {
      case 'success':
        return {
          backgroundColor: '#21a366',
          color: '#fff',
        };
      case 'warning':
        return {
          backgroundColor: '#e49c06',
          color: '#fff',
        };
      case 'critical':
        return {
          backgroundColor: '#ee4747',
          color: '#fff',
        };
      default:
        return {
          backgroundColor: '##EEEFEF',
          color: '#000',
        };
    }
  };

  return (
    <PaperBadge {...props} style={[styles.badge, getStyle(mode), props.style]}>
      {props.children}
    </PaperBadge>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 70,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    transform: [{translateY: -10}],
    fontSize: 10,
  },
});
