import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RootStackParamList} from './UserInfoNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {validatePassword} from '../../utils/validation';

type PasswordChangeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PasswordChangeScreen'
>;

const PasswordChangeScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigation = useNavigation<PasswordChangeScreenNavigationProp>();

  const handleSavePassword = () => {
    let isValid = true;
    const newErrors = {oldPassword: '', newPassword: '', confirmPassword: ''};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ!';
      isValid = false;
    }

    const newPasswordError = validatePassword(newPassword);
    if (newPasswordError) {
      newErrors.newPassword = newPasswordError;
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu mới nhập lại không khớp!';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Password saved!');
      // Thực hiện logic gửi mật khẩu lên server hoặc xử lý lưu
    }
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
      <ScrollView contentContainerStyle={styles.containerScroll}>
        {/* Mật khẩu cũ */}
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Mật khẩu cũ</Text>
            <Text style={styles.required}> *</Text>
          </View>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              value={oldPassword}
              secureTextEntry={!showOldPassword}
              onChangeText={setOldPassword}
              placeholder="Nhập mật khẩu cũ"
            />
            <TouchableOpacity
              onPress={() => setShowOldPassword(!showOldPassword)}>
              <Icon
                name={showOldPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#C02135"
              />
            </TouchableOpacity>
          </View>
          {errors.oldPassword ? (
            <Text style={styles.error}>{errors.oldPassword}</Text>
          ) : null}
        </View>

        {/* Mật khẩu mới */}
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Mật khẩu mới</Text>
            <Text style={styles.required}> *</Text>
          </View>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              value={newPassword}
              secureTextEntry={!showNewPassword}
              onChangeText={setNewPassword}
              placeholder="Nhập mật khẩu mới"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon
                name={showNewPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#C02135"
              />
            </TouchableOpacity>
          </View>
          {errors.newPassword ? (
            <Text style={styles.error}>{errors.newPassword}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
            <Text style={styles.required}> *</Text>
          </View>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Nhập lại mật khẩu mới"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#C02135"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        {/* Ghi chú */}
        <View>
          <Text style={styles.note}>
            * Mật khẩu cần thỏa mãn những điều kiện sau:
            {'\n'}• Độ dài tối thiểu 8 ký tự{'\n'}• Chứa ít nhất 1 chữ cái viết
            hoa, 1 chữ số, và 1 ký tự đặc biệt
          </Text>
        </View>

        {/* Nút lưu mật khẩu */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSavePassword}>
          <Text style={styles.saveButtonText}>Lưu mật khẩu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerScroll: {
    padding: 20,
  },
  header: {
    backgroundColor: '#C02135',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    padding: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  required: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  toggleText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
  },
  note: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#C02135',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#C02135',
    fontSize: 14,
  },
});

export default PasswordChangeScreen;
