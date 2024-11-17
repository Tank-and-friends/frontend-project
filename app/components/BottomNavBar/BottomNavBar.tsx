import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
const BottomNavBar = () => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomBarOption}>
        <IonIcons name="notifications-outline" size={28} color="white" />
        <Text style={styles.utilityText}>Thông báo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarOption}>
        <Icon source="message-outline" size={28} color="white" />
        <Text style={styles.utilityText}>Tin nhắn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarOption}>
        <Icon source="account-group" size={28} color="white" />
        <Text style={styles.utilityText}>Lớp học</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarOption}>
        <Icon source="plus" size={28} color="white" />
        <Text style={styles.utilityText}>Đăng ký lớp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomBarChosenOption}>
        <Icon source="calendar" size={28} color="#C02135" />
        <Text style={styles.utilityTextClick}>Lịch</Text>
      </TouchableOpacity>
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
    zIndex: 10,
    elevation: 10,
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
});
export default BottomNavBar;
