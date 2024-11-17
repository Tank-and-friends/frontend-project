import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import LabeledInput from '../../components/LabeledInput';

type AccountUpdateScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountUpdateScreen'
>;

type AccountUpdateScreenProps = {
  coverImageUrl: string;
  profileImageUrl: string;
  userName: string;
  friendCount: number;
  statusText: string;
  joinDate: string;
  country: string;
  city: string;
  address: string;
  websiteUrl: string;
};
const AccountUpdateScreen: React.FC = () => {
  const [accountData, setAccountData] = useState<AccountUpdateScreenProps | null>(null);
  const navigation = useNavigation<AccountUpdateScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');



  const handleUserNameChange = (userName: string) => {
    setUserName(userName);
  };
  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };
  const handleAddressChange = (address: string) => {
     setAddress(address);
   };
   const handleLinkChange = (link: string) => {
     setLink(link);
   };

  useEffect(() => {
    const fakeAccountData = {
      coverImageUrl: '../../assets/avt.jpg',
      profileImageUrl: 'https://example.com/profile-image-url',
      userName: 'Bong 20210000',
      friendCount: 420,
      statusText: 'Fan thầy Bean tổng nè',
      joinDate: '15 tháng 4 năm 2024',
      country: "Việt Nam",
      city: "Hải Dương",
      address: "Thị xã Kinh Môn",
      websiteUrl: 'https://abcdexyz',
    };

    setTimeout(() => {
      setAccountData(fakeAccountData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#f57c00" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (!accountData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Không có dữ liệu tài khoản.</Text>
      </View>
    );
  }
  const handleEditInfo = () => {
    navigation.navigate('AccountUpdateScreen'); // Điều hướng sang màn hình AccountUpdate
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
        <Text style={styles.headerTitle}>Chỉnh sửa tài khoản</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.coverImageContainer}>
          <Image
            source={require('../../assets/bg.jpg')}
            style={styles.coverImage}
          />
        </View>
        <View style={styles.cameraIconCover}>
          <Icon name="camera" size={18} color="#fff" />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/avt.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconAvt}>
            <Icon name="camera" size={18} color="#fff" />
          </View>
          <LabeledInput
            label="Tên đăng nhập"
            placeholder={accountData.userName}
            isRequired
            value={userName}
            onChangeText={handleUserNameChange}
          />
          <LabeledInput
            label="Mô tả"
            placeholder={accountData.statusText}
            value={description}
            onChangeText={handleDescriptionChange}
          />
          <LabeledInput
            label="Địa chỉ"
            placeholder={accountData.address}
            value={address}
            onChangeText={handleAddressChange}
          />
          <LabeledInput
            label="Link đính kèm"
            placeholder={accountData.websiteUrl}
            value={link}
            onChangeText={handleLinkChange}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEditInfo}>
          <Icon name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Lưu thông tin</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
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

  cameraIconAvt: {
    position: 'absolute',
    bottom: 450,
    right: 220,
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

  cameraIconCover: {
    position: 'absolute',
    bottom: 560,
    right: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
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

export default AccountUpdateScreen;
