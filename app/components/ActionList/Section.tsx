import React from 'react';
import {ActionListItemDescriptor, ActionListSection} from '../../types';
import {Item} from './Item';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface SectionProps {
  section: ActionListSection;
  hasMultipleSections: boolean;
  isFirst?: boolean;
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export const Section = ({
  section,
  hasMultipleSections,
  isFirst,
  onActionAnyItem,
}: SectionProps) => {
  const handleAction = (itemOnAction: ActionListItemDescriptor['onAction']) => {
    return () => {
      itemOnAction?.();
      onActionAnyItem?.();
    };
  };

  const actionMarkup = section.items.map(
    ({content, helpText, onAction, ...item}, index) => {
      return (
        <View key={item.id ?? `${content}-${index}`}>
          <Item
            {...item}
            content={content} 
            helpText={helpText}
            onAction={handleAction(onAction)}
          />
        </View>
      );
    },
  );

  const titlemarkup = section.title ? (
    <View style={styles.textWrapper}>
      <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>{section.title}</Text>
    </View>
  ) : null;

  const sectionMarkup = (
    <>
      {titlemarkup}
      <View
        style={hasMultipleSections && titlemarkup !== null && {paddingTop: 0}}>
        {actionMarkup}
      </View>
    </>
  );

  return hasMultipleSections ? (
    <View style={!isFirst && styles.otherSection}>{sectionMarkup}</View>
  ) : (
    sectionMarkup
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 4,
  },
  // subSection: {
  //   padding: 8,
  // },
  otherSection: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 10,
  },

});
