/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabeledInput from '../../components/LabeledInput';
import { validateEmail } from '../../utils/validation';
import { ParamsList } from './navigation';

type LoginScreenNavigationProp = StackNavigationProp<ParamsList, 'LoginScreen'>;
type LoginScreenRouteProp = RouteProp<ParamsList, 'LoginScreen'>;

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      setEmailError(validateEmail(route.params.email));
    }
  }, [route.params.email]);

  const handleEmailChange = (_email: string) => {
    setEmail(_email);
    setEmailError(validateEmail(_email));
  };

  const handleContinue = () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      navigation.navigate('PasswordScreen', {email});
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignupScreen', {email: null});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
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
      <Text style={styles.signUpText}>
        Bạn không có tài khoản?
        <Text style={styles.signUpLink} onPress={handleSignUp}>
          {' '}
          Tạo một tài khoản mới
        </Text>
      </Text>
      <TouchableOpacity
        style={[
          styles.continueButton,
          {backgroundColor: emailError ? '#8C8C8C' : '#C02135'},
        ]}
        onPress={handleContinue}
        disabled={!!emailError}>
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
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  asterisk: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
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
  signUpText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    marginBottom: 31,
  },
  signUpLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  continueButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
