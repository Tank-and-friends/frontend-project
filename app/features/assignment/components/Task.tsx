import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../navigation';
import {Servey} from '../type';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Assuming you're using FontAwesome icons

type TaskNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskDetailScreen'
>;
interface TaskProps {
  title: string;
  status: string;
  statusColor: string;
  hasBadge: boolean;
  badgeText?: string;
  badgeColor?: string;
  date: string;
  content: string;
  serveyData: Servey;
  checked?: boolean;
  setChecked: (value: boolean) => void;
  showFooter: boolean;
  setShowFooter: (value: boolean) => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  status,
  statusColor,
  hasBadge,
  badgeText,
  badgeColor,
  date,
  content,
  serveyData,
  checked,
  setChecked,
  showFooter,
  setShowFooter,
}) => {
  const navigation = useNavigation<TaskNavigationProp>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [unConflic, setUnConflic] = useState(false);

  const handlePress2 = () => {
    setChecked(!checked);
    setUnConflic(false);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!showFooter) {
      navigation.navigate('TaskDetailScreen', {
        title,
        date,
        deadline: status,
        content,
        formattedDate,
        serveyData,
      });
    } else {
      handlePress2();
    }
  };

  const formatDateTime = (inputString: string) => {
    // Chuyển chuỗi thành đối tượng Date
    const date2 = new Date(inputString);

    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();

    // Lấy các phần cần thiết từ Date
    const hours = date2.getHours().toString().padStart(2, '0'); // Lấy giờ
    const minutes = date2.getMinutes().toString().padStart(2, '0'); // Lấy phút
    const day = date2.getDate().toString().padStart(2, '0'); // Lấy ngày
    const month = (date2.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (lưu ý tháng bắt đầu từ 0)

    // Kiểm tra nếu năm hiện tại
    if (date2.getFullYear() === currentYear) {
      return `${hours}:${minutes} ngày ${day}-${month}`;
    } else {
      return `${hours}:${minutes} ngày ${day}-${month}-${date2.getFullYear()}`;
    }
  };

  const formattedDate = formatDateTime(serveyData.deadline);

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={() => setShowFooter(true)}
      activeOpacity={0.99}>
      <Animated.View
        style={[styles.container, {transform: [{scale: scaleAnim}]}]}>
        <View style={styles.taskContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.status, {color: statusColor}]}>
            {formattedDate}
          </Text>
        </View>
        <View style={styles.click}>
          {hasBadge && badgeText && (
            <View style={[styles.badge, {backgroundColor: badgeColor}]}>
              <Text style={styles.badgeText}>{badgeText}</Text>
            </View>
          )}
          <View style={styles.click2}>
            {!unConflic && showFooter && !checked && (
              <TouchableOpacity onPress={handlePress2}>
                <View style={styles.mark}>
                  <Icon name="circle-notch" size={20} color="#C02135" />
                </View>
              </TouchableOpacity>
            )}
            {!unConflic && showFooter && checked && (
              <TouchableOpacity onPress={() => setChecked(!checked)}>
                <View style={styles.mark}>
                  <Icon name="circle-check" size={20} color="#C02135" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  click: {
    marginTop: 28,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: -15,
  },

  click2: {
    marginTop: -8,
  },

  mark: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    // marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  taskContent: {
    flex: 1,
  },
  title: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  status: {
    color: '#071013',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 5,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 10,
    marginBottom: 16,
    marginTop: -40,
    backgroundColor: '#FF7F11',
  },
  badgeText: {
    color: '#EFF2EF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default Task;
