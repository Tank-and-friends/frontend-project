// LoginScreen.tsx
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import AccountItem from '../../components/AccountItem';
import {getRandomColor} from '../../utils/getRandomColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './AuthNavigator';
import {useNavigation} from '@react-navigation/native';

type LoginAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginAccountScreen'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginAccountScreenNavigationProp>();

  const accounts = [
    {
      title: 'Duc.NT215356@sis.hust.edu.vn',
      description: 'duc.nt215356@sis.hust.edu.vn',
    },
    {
      title: 'Anh.QHT215311@sis.hust.edu.vn',
      description: 'anh.qht215311@sis.hust.edu.vn',
    },
    {
      title: 'Hoang.NV215384@sis.hust.edu.vn',
      description: 'hoang.nv215384@sis.hust.edu.vn',
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image.png')} style={styles.image} />
      <Text style={styles.title}>Chọn tài khoản để đăng nhập</Text>

      <List.Section style={styles.listSection}>
        {accounts.map((account, index) => (
          <AccountItem
            key={index}
            title={account.title}
            description={account.description}
            iconColor={getRandomColor()}
            onPress={() =>
              console.log(`Đăng nhập với tài khoản: ${account.title}`)
            }
          />
        ))}
      </List.Section>

      <TouchableOpacity
        style={styles.otherAccountButton}
        onPress={() => navigation.navigate('LoginScreen', {email: null})}>
        <Ionicons
          name="person-add"
          size={22}
          color="#D32F2F"
          style={styles.icon}
        />
        <Text style={styles.otherAccountText}>Sử dụng tài khoản khác</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 32,
    marginTop: 76,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    alignSelf: 'center',
    color: '#000000',
  },
  listSection: {
    width: '100%',
    maxWidth: 460,
  },
  icon: {
    marginRight: 10,
  },
  otherAccountButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingLeft: 35,
  },
  otherAccountText: {
    color: '#D32F2F',
    fontSize: 16,
  },
});

export default LoginScreen;
