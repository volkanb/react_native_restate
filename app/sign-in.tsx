import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';
import icons from '@/constants/icons';
import { login, loginAsGuest } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href='/' />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert('Error', 'Failed to login');
    }
    console.log('Login pressed');
  };

  const handleGuestLogin = async () => {
    const result = await loginAsGuest();

    if (result) {
      refetch();
    } else {
      Alert.alert('Error', 'Failed to login as guest');
    }
  };

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <Image
          source={images.onboarding}
          className='w-full h-[400px]'
          resizeMode='stretch'
        />

        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>
            Welcome to ReState
          </Text>

          <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
            Let's Get You Closer to {'\n'}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>

          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'
          >
            <View className='flex flex-row items-center justify-center'>
              <Image
                source={icons.google}
                className='w-5 h-5'
                resizeMode='contain'
              />
              <Text className='text-lg font-rubik-medium text-black-300 ml-2'>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGuestLogin}
            className='bg-primary-200 rounded-full w-full py-4 mt-4'
          >
            <Text className='text-lg font-rubik-medium text-primary-300 text-center'>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
