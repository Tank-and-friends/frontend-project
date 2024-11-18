import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';

import IonIcons from 'react-native-vector-icons/Ionicons';
const BottomNavBar = ({state, descriptors, navigation}: any) => {
  const icons = [
    {name: 'notifications-outline', label: 'Thông báo', route: 'Notifications'},
    {name: 'message-outline', label: 'Tin nhắn', route: 'Messages'},
    {name: 'account-group', label: 'Lớp học', route: 'Classes'},
    {name: 'plus', label: 'Đăng ký lớp', route: 'Register'},
    {name: 'calendar', label: 'Lịch', route: 'Calendar'},
  ];

  return (
    <View style={styles.bottomBar}>
      {icons.map((icon, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={icon.route}
            style={
              isFocused ? styles.bottomBarChosenOption : styles.bottomBarOption
            }
            onPress={() => navigation.navigate(icon.route)}>
            {index === 0 ? (
              <IonIcons
                name={icon.name}
                size={28}
                color={isFocused ? '#C02135' : 'white'}
              />
            ) : (
              <Icon
                source={icon.name}
                size={28}
                color={isFocused ? '#C02135' : 'white'}
              />
            )}
            <Text
              style={isFocused ? styles.utilityTextClick : styles.utilityText}>
              {icon.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    padding: 5,
    bottom: 30,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 70,
    backgroundColor: '#C02135',
    borderRadius: 20,
    elevation: 10,
    position: 'absolute',
  },
  bottomBarOption: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  bottomBarChosenOption: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFF2EF',
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
  },
  utilityText: {
    fontSize: 9,
    color: 'white',
    marginTop: 6,
    fontWeight: '500',
  },
  utilityTextClick: {
    fontSize: 9,
    color: '#C02135',
    marginTop: 6,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavBar;
