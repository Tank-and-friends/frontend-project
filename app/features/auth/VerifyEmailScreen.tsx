import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type VerifyEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyEmailScreen'>;
type VerifyEmailRouteProp = RouteProp<RootStackParamList, 'VerifyEmailScreen'>;

const VerifyEmailScreen = () => {
  const route = useRoute<VerifyEmailRouteProp>();
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const { email } = route.params as { email: string };


  const handleContinue = () => {
    console.log("Continue button pressed");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={20} color="#000" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/image.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Xác thực email</Text>
      <Text style={styles.description}>
        Nhập mã mà chúng tôi đã gửi đến 
        <Text style={styles.boldText}> {email}</Text>. Nếu bạn không nhận được email, hãy kiểm tra thư mục thư rác hoặc{' '}
        <Text style={styles.linkText}
              onPress={() => navigation.navigate('LoginAccountScreen')}
        >thử lại.</Text>
      </Text>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
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
      description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'left',
        marginBottom: 30,
        marginTop: 10,
      },
      boldText: {
        fontWeight: 'bold',
      },
      linkText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
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
    

export default VerifyEmailScreen;
