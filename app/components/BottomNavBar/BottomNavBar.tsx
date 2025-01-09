import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';

import IonIcons from 'react-native-vector-icons/Ionicons';
import { getUnreadNotificationsCount } from '../../features/notification/api';
const BottomNavBar = ({state, navigation}: any) => {
  const icons = [
    {name: 'notifications-outline', label: 'Thông báo', route: 'Notifications'},
    {name: 'message-outline', label: 'Tin nhắn', route: 'Messages'},
    {name: 'account-group', label: 'Lớp học', route: 'Classes'},
    {name: 'plus', label: 'Đăng ký lớp', route: 'Register'},
    {name: 'calendar', label: 'Lịch', route: 'Calendar'},
  ];

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch unread notification count when component mounts
    const fetchUnreadNotifications = async () => {
      try {
        const count = await getUnreadNotificationsCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Error fetching unread notifications count:', error);
      }
    };

    fetchUnreadNotifications();
    const unsubscribeFocus = navigation.addListener('focus', () => {
      fetchUnreadNotifications(); // Cập nhật mỗi khi BottomNavBar được focus
    });

    return unsubscribeFocus;
  }, [navigation, unreadCount]);

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
            {icon.name === 'notifications-outline' && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 2,
  },
  badgeText: {
    fontSize: 12,
    color: '#C02135',
  },
});

export default BottomNavBar;
