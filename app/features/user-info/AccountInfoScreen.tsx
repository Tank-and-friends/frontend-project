/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserInfo} from '../../models/User';
import {getUserInfo} from '../../apis/UserApi';

type AccountInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountInfoScreen'
>;

const AccountInfoScreen: React.FC = () => {
  const [accountData, setAccountData] = useState<UserInfo | null>(null);
  const navigation = useNavigation<AccountInfoScreenNavigationProp>();

  useEffect(() => {
    getUserInfo().then(res => {
      setAccountData(res);
    });
  }, []);

  if (!accountData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Không có dữ liệu tài khoản.</Text>
      </View>
    );
  }
  const handleEditInfo = () => {
    navigation.navigate('AccountUpdateScreen');
  };
  const handlePasswordChange = () => {
    navigation.navigate('PasswordChangeScreen');
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cover Image */}
        <View style={styles.coverImageContainer}>
          <Image
            source={require('../../assets/bg.jpg')}
            style={styles.coverImage}
          />
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{uri: accountData.avatar}}
            style={styles.profileImage}
          />
          <View style={styles.onlineStatusIndicator} />
          <Text style={styles.userName}>{accountData.name}</Text>
          <Text style={styles.friendCount}>{accountData.role}</Text>
          <Text style={styles.statusText}>{accountData.id}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={20} color="#f57c00" />
            <Text style={styles.detailText}>{accountData.email}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={20} color="#f57c00" />
            <Text style={styles.detailText}>{accountData.status}</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Icon name="lock-closed-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditInfo}>
          <Icon name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#C02135',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  coverImageContainer: {
    height: 200,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    marginTop: -180,
    padding: 20,
  },
  profileImage: {
    width: 190,
    height: 190,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  onlineStatusIndicator: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#4caf50',
    position: 'absolute',
    top: 175,
    right: '60%',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  friendCount: {
    fontSize: 16,
    color: '#757575',
  },
  statusText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 2,
    marginHorizontal: 20,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  detailItemLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 50,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  detailTextBold: {
    fontWeight: 'bold',
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1e88e5',
    textDecorationLine: 'underline',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C02135',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AccountInfoScreen;
