import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { IconButton, Menu, TouchableRipple } from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useToggle } from '../../../../utils/useToggle';

interface Props {
  page: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  label?: string;
  numberOfItemsPerPageList?: number[];
  numberOfItemsPerPage?: number;
  onItemsPerPageChange?: (pageSize: number) => void;
  showFastPaginationControls?: boolean;
  selectPageDropdownLabel?: string;
}

export const TablePagination = ({
  page,
  numberOfPages,
  onPageChange,
  label,
  numberOfItemsPerPageList,
  numberOfItemsPerPage,
  onItemsPerPageChange,
  showFastPaginationControls,
  selectPageDropdownLabel,
}: Props) => {
  const {
    value: isOpenMenu,
    setTrue: openMenu,
    setFalse: closeMenu,
  } = useToggle(false);
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const btnRef = useRef<View>(null);

  const handleOpenMenu = () => {
    if (btnRef.current) {
      btnRef.current.measureInWindow((x, y, width, height) => {
        if (Dimensions.get('window').height < y + height + 200) {
          setAnchorPosition({x: x + width, y: y - 204});
        } else {
          setAnchorPosition({x: x + width, y: y});
        }
        openMenu();
      });
    }
  };

  const navigateMarkup = (
    <View style={styles.pageNav}>
      {showFastPaginationControls && (
        <IconButton
          icon="page-first"
          onPress={() => onPageChange(0)}
          disabled={Number(page) === 0}
        />
      )}
      <IconButton
        icon="chevron-left"
        onPress={() => onPageChange(page - 1)}
        disabled={Number(page) === 0}
      />
      <IconButton
        icon="chevron-right"
        onPress={() => onPageChange(page + 1)}
        disabled={Number(page) === numberOfPages - 1}
      />
      {showFastPaginationControls && (
        <IconButton
          icon="page-last"
          onPress={() => onPageChange(numberOfPages - 1)}
          disabled={Number(page) === numberOfPages - 1}
        />
      )}
    </View>
  );

  return (
    <View style={styles.pagination}>
      <Text style={styles.label}>{selectPageDropdownLabel}</Text>
      <View>
        <TouchableRipple
          ref={btnRef}
          style={styles.btnContainer}
          borderless
          onPress={handleOpenMenu}>
          <View style={styles.toggleBtn}>
            <Text style={styles.textBtn} numberOfLines={1}>
              {numberOfItemsPerPage}
            </Text>
            <FontAwesome6Icon
              style={styles.toggleIcon}
              name={isOpenMenu ? 'chevron-up' : 'chevron-down'}
              size={14}
              color="#a3a8af"
            />
          </View>
        </TouchableRipple>
        <Menu
          contentStyle={styles.menu}
          visible={isOpenMenu}
          onDismiss={closeMenu}
          anchor={{x: anchorPosition.x, y: anchorPosition.y - 80}}>
          {numberOfItemsPerPageList?.map((item, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                onItemsPerPageChange && onItemsPerPageChange(item);
                closeMenu();
              }}
              title={item}
            />
          ))}
        </Menu>
      </View>
      <Text style={styles.label}>{label}</Text>
      {navigateMarkup}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
    columnGap: 16,
    rowGap: 16,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 12,
  },
  btnContainer: {
    borderColor: '#d3d5d7',
    borderWidth: 1,
    borderRadius: 10,
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  textBtn: {
    fontSize: 16,
    color: 'black',
    paddingRight: 32,
  },
  toggleIcon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  menu: {
    backgroundColor: 'white',
    paddingVertical: 0,
  },
  btnSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnContent: {
    fontSize: 16,
  },
  pageNav: {
    flexDirection: 'row',
    marginBottom: -30,
    marginRight: -16,
  },
});
