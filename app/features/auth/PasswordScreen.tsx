/* eslint-disable react-native/no-inline-styles */
// features/auth/PasswordScreen.tsx
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabeledInput from '../../components/LabeledInput';
import { validateEmail, validatePassword } from '../../utils/validation';
import { ParamsList } from './navigation';

type PasswordScreenNavigationProp = StackNavigationProp<
  ParamsList,
  'PasswordScreen'
>;
type PasswordScreenRouteProp = RouteProp<ParamsList, 'PasswordScreen'>;
const PasswordScreen = () => {
  const navigation = useNavigation<PasswordScreenNavigationProp>();
  const route = useRoute<PasswordScreenRouteProp>();
  const {email: initialEmail} = route.params;

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleLogin = () => {
    if (!passwordError) {
      console.log(`Email: ${email}, Password: ${password}`);
    }
  };
  const handlePasswordChange = (_password: string) => {
    setPassword(_password);
    setPasswordError(validatePassword(_password));
  };

  const handleEmailChange = (_email: string) => {
    setEmail(_email);
    setEmailError(validateEmail(_email));
  };

  const handleGoBack = () => {
    navigation.navigate('LoginScreen', {email});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => handleGoBack()}>
        <Ionicons name="chevron-back-outline" size={20} color="#000" />
      </TouchableOpacity>
      <Image source={require('../../assets/image.png')} style={styles.image} />
      <Text style={styles.title}>Đăng nhập</Text>
      <LabeledInput
        label="Email"
        placeholder="Nhập email"
        isRequired
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        errorMessage={emailError}
      />
      <LabeledInput
        label="Mật khẩu"
        secureTextEntry={true}
        isRequired
        value={password}
        onChangeText={handlePasswordChange}
        errorMessage={passwordError}
      />
      <TouchableOpacity
        style={[
          styles.continueButton,
          {
            backgroundColor:
              !passwordError && !emailError ? '#C02135' : '#8C8C8C',
          },
        ]}
        onPress={handleLogin}
        disabled={!!emailError || !!passwordError}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: -8,
    marginTop: 8,
    marginBottom: 20,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
    color: '#000000',
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  continueButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#C02135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordScreen;
