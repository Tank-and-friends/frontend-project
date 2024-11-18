import React from 'react';
import {StyleSheet, View} from 'react-native';

export interface ConnectedProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  segmented?: boolean;
}

export const Connected = ({
  left,
  right,
  children,
  segmented,
}: ConnectedProps) => {
  const leftItemMarkup = left ? <View>{left}</View> : null;
  const rightItemMarkup = right ? <View>{right}</View> : null;
  const primaryItemMarkup = children ? <View>{children}</View> : null;
  const isSegmented = (!!leftItemMarkup || !!rightItemMarkup) && segmented;

  return (
    <View style={[styles.container, isSegmented && styles.segmented]}>
      <View style={[styles.segmentControl, isSegmented && styles.firstSegment]}>
        {leftItemMarkup}
      </View>
      <View style={[styles.primarySegment, isSegmented && styles.segmentControl]}>{primaryItemMarkup}</View>
      <View style={[styles.segmentControl, isSegmented && styles.lastSegment]}>
        {rightItemMarkup}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  segmented: {
    gap: 0,
  },
  segmentControl: {
    borderRadius: 0,
  },
  primarySegment: {
    flex: 1
  },
  firstSegment: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    minWidth: 10,
  },
  lastSegment: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    minWidth: 10,
  },
});
