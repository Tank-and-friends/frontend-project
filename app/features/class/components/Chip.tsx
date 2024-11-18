import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  content: string;
  selected: boolean;
  onPress: () => void;
}

export const Chip = ({content, selected, onPress}: Props) => {
  const getStyle = ($selected?: boolean) =>
    StyleSheet.create({
      chip: {
        backgroundColor: $selected ? '#ff7f11' : '#a01c2d',
        cursor: 'pointer',
        flex: 1,
        minHeight: 30,
        textAlign: 'center',
        borderRadius: 100,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        fontSize: 12,
        fontWeight: 'semibold',
      },
    });

  return (
    <Pressable style={getStyle(selected).chip} onPress={onPress}>
      <Text style={getStyle().content}>{content}</Text>
    </Pressable>
  );
};
