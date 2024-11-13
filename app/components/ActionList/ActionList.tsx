import React from 'react';
import {ActionListItemDescriptor, ActionListSection} from '../../types';
import {Section} from './Section';
import {StyleSheet, View} from 'react-native';

export interface ActionListProps {
  /** Danh sách các hành động */
  items?: ActionListItemDescriptor[];
  /** Danh sách nhóm các hành động */
  sections?: ActionListSection[];
  /** Callback khi bất kì hành động nào được click */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

/**
 * Danh sách các hành động hoặc lựa chọn,
 * thường được đặt trong một Popover để tạo dropdown menu hoặc cho phép chủ shop lựa chọn từ danh sách lựa chọn.
 */
export const ActionList = ({
  items,
  sections = [],
  onActionAnyItem,
}: ActionListProps) => {
  let finalSections: ActionListSection[] = [];
  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;

  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
        section={section}
        hasMultipleSections={hasMultipleSections}
        onActionAnyItem={onActionAnyItem}
        isFirst={index === 0}
      />
    ) : null;
  });

  return <View style={styles.actionList}>{sectionMarkup}</View>;
};

const styles = StyleSheet.create({
  actionList: {
    margin: 0,
    padding: 10,
    maxWidth: '60%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
