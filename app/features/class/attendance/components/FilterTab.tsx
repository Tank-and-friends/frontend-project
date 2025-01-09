import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Menu, TouchableRipple } from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useToggle } from '../../../../utils/useToggle';

interface Props {
  lessonsList: string[];
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
}

export const FilterTab = ({lessonsList, value, onChange, onSave}: Props) => {
  const {
    value: isOpenMenu,
    setTrue: openMenu,
    setFalse: closeMenu,
  } = useToggle(false);
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const btnRef = useRef<View>(null);

  const handleOpenMenu = () => {
    if (btnRef.current) {
      btnRef.current.measureInWindow((x, y) => {
        setAnchorPosition({x: x, y: y});
        openMenu();
      });
    }
  };

  return (
    <View style={styles.filterTab}>
      <View>
        <TouchableRipple
          ref={btnRef}
          style={styles.btnContainer}
          borderless
          onPress={handleOpenMenu}>
          <View style={styles.toggleBtn}>
            <Text style={styles.textBtn} numberOfLines={1}>
              {value}
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
          {lessonsList.map((item, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                onChange(item);
                closeMenu();
              }}
              title={item}
            />
          ))}
        </Menu>
      </View>
      <Button
        mode="contained"
        textColor="white"
        buttonColor="#c02135"
        style={styles.btnSubmit}
        labelStyle={styles.btnContent}
        onPress={onSave}>
        Lưu
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
