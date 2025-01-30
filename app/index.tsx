import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Index() {
  return (
    
      <View className='flex-1 items-center justify-center'>
        <Text className='text-black text-3xl font-pblack'>Hello World!</Text>
        <Link href="/profile">Go to profile</Link>
      </View>
    
  );
}

