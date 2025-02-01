import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { ScrollView } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import { images } from '../constants';

export default function Index() {
  const { loading, isLoggedIn } = useGlobalContext();

  // Wait for loading to complete before redirecting
  if (!loading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }} className='bg-primary'>
        <View className='w-full items-center min-h-[85vh] px-4 pt-8'>
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode="contain"
          />
          <View className='relative mt-5'>
            <Text className='font-bold text-center text-white text-3xl'>
              Discover endless possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode="contain"
            />
          </View>
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets innovation: embark on your creative journey with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
            textStyles="text-white text-base font-semibold"
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
}