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
import AsyncStorage from '@react-native-async-storage/async-storage';

type AccountInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountInfoScreen'
>;


const AccountInfoScreen: React.FC = () => {
  const navigation = useNavigation<AccountInfoScreenNavigationProp>();

  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedRole = await AsyncStorage.getItem('role');
        const storedName = await AsyncStorage.getItem('name');

        setEmail(storedEmail);
        setRole(storedRole);
        setName(storedName);
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);
  
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
            source={require('../../assets/avt.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.onlineStatusIndicator} />
          <Text style={styles.userName}>{name}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="mail" size={24} color="#C02135" />
            <Text style={styles.detailText}>
              Email{' : '}
              <Text style={styles.detailTextBold}>{email}</Text>
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="person-circle" size={24} color="#C02135" />
            <Text style={styles.detailText}>
              Role{' : '}
              <Text style={styles.detailTextBold}>{role}</Text>
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Icon name="lock-closed-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
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
    height: 2,
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
    fontSize: 18,
  },
  detailTextBold: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 250,
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
