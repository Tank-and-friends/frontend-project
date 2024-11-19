import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import LabeledInput from '../../components/LabeledInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './AuthNavigator';
import DatePickerInput from '../../components/DatePicker';
import {validateEmail, validatePassword} from '../../utils/validation';

type SignupCreateNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignupCreateScreen'
>;
type SignupCreateRouteProp = RouteProp<RootStackParamList, 'PasswordScreen'>;
const SignupCreateScreen = () => {
  const navigation = useNavigation<SignupCreateNavigationProp>();
  const route = useRoute<SignupCreateRouteProp>();
  const {email: initialEmail} = route.params;

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleDateChange = (date: string) => {
    setBirthDate(date);
  };
  const handlePasswordChange = (email: string) => {
    setPassword(email);
    setPasswordError(validatePassword(email)); // Update email error message based on validation
  };
  const handleEmailChange = (email: string) => {
    setEmail(email);
    setEmailError(validateEmail(email));
  };

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleGoBack = () => {
    navigation.navigate('SignupScreen', {email});
  };
  const handleContinue = () => {
    navigation.navigate('VerifyEmailScreen', {email});
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => handleGoBack()}>
            <Ionicons name="chevron-back-outline" size={20} color="#000" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/image.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Tạo tài khoản</Text>
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
          <DatePickerInput
            label="Ngày sinh"
            value={birthDate}
            onChange={handleDateChange}
            isRequired
          />
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  !passwordError && !emailError ? '#C02135' : '#8C8C8C',
              },
            ]}
            onPress={handleContinue}
            disabled={!!emailError || !!passwordError}>
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
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
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#C02135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
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

export default SignupCreateScreen;
