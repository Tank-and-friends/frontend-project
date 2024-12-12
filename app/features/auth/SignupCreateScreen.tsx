/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabeledInput from '../../components/LabeledInput';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../../utils/validation';
import {ParamsList} from './navigation';
import {signup, checkVerifyCode} from '../../apis/UserApi';

type SignupCreateNavigationProp = StackNavigationProp<
  ParamsList,
  'SignupCreateScreen'
>;
type SignupCreateRouteProp = RouteProp<ParamsList, 'PasswordScreen'>;
const SignupCreateScreen = () => {
  const navigation = useNavigation<SignupCreateNavigationProp>();
  const route = useRoute<SignupCreateRouteProp>();
  const {email: initialEmail} = route.params;

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'Lecturer' | 'Student'>('Student'); // Default role

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handlePasswordChange = (_email: string) => {
    setPassword(_email);
    setPasswordError(validatePassword(_email));
  };
  const handleEmailChange = (_email: string) => {
    setEmail(_email);
    setEmailError(validateEmail(_email));
  };
  const handleFirstNameChange = (_name: string) => {
    setFirstName(_name);
    setFirstNameError(validateName(_name));
  };

  const handleLastNameChange = (_name: string) => {
    setLastName(_name);
    setLastNameError(validateName(_name));
  };

  const handleRoleChange = (_role: 'Lecturer' | 'Student') => {
    setRole(_role);
    setRoleError('');
  };

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleGoBack = () => {
    navigation.navigate('SignupScreen', {email});
  };

  const handleContinue = async () => {
    // const emailValidationError = validateEmail(email);
    // const passwordValidationError = validatePassword(password);
    // const firstNameValidationError = validateName(firstName);
    // const lastNameValidationError = validateName(lastName);

    // setEmailError(emailValidationError);
    // setPasswordError(passwordValidationError);
    // setFirstNameError(firstNameValidationError);
    // setLastNameError(lastNameValidationError);

    // if (
    //   !emailValidationError &&
    //   !passwordValidationError &&
    //   !firstNameValidationError &&
    //   !lastNameValidationError
    // ) {
    //   setSignupError('');
    //   return;
    // }
  

    try {
      // Gọi API đăng ký
      const signupResult = await signup(
        lastName,
        firstName,
        email,
        password,
        23,
        'STUDENT',
      );
      console.log(signupResult);
      if (signupResult?.code === '1000') {
        navigation.navigate('LoginScreen', {email});
      } else {
        // Trường hợp mã trả về khác '1000'
        Alert.alert('Lỗi', 'Đăng ký không thành công');
      }
    } catch (error: any) {
      // Đổi kiểu của 'error' thành 'any' để xử lý lỗi chính xác
      if (error instanceof Error) {
        Alert.alert('Lỗi', error.message);
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng ký và xác minh');
      }
    }
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
            label="Họ"
            isRequired
            value={lastName}
            onChangeText={handleLastNameChange}
            errorMessage={lastNameError}
          />
          <LabeledInput
            label="Tên"
            isRequired
            value={firstName}
            onChangeText={handleFirstNameChange}
            errorMessage={firstNameError}
          />
          <LabeledInput
            label="Mật khẩu"
            secureTextEntry={true}
            isRequired
            value={password}
            onChangeText={handlePasswordChange}
            errorMessage={passwordError}
          />
          <View style={styles.radioRow}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleRoleChange('Lecturer')}>
                <View
                  style={[
                    styles.radioCircle,
                    role === 'Lecturer' && styles.radioCircleSelected,
                  ]}
                />
                <Text style={styles.radioText}>Lecturer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleRoleChange('Student')}>
                <View
                  style={[
                    styles.radioCircle,
                    role === 'Student' && styles.radioCircleSelected,
                  ]}
                />
                <Text style={styles.radioText}>Student</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  !passwordError && !emailError ? '#C02135' : '#8C8C8C',
              },
            ]}
            onPress={handleContinue}
            disabled={
              !!emailError ||
              !!passwordError ||
              !!firstNameError ||
              !!lastNameError
            }>
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
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: -8,
    marginTop: 8,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
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
    fontWeight: 'bold',
    marginRight: 40,
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
  radioRow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C02135',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioCircleSelected: {
    backgroundColor: '#C02135',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
  },
});

export default SignupCreateScreen;
