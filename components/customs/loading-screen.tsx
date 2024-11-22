import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator } from '../nativewindui/ActivityIndicator';

export default function LoadingScreen() {
  return (
    <SafeAreaView className="w-full items-center justify-center">
      <View className="flex h-screen w-full flex-col items-center justify-center">
        <ActivityIndicator />
        <Text className="mt-1 text-sm">Please Wait...</Text>
      </View>
    </SafeAreaView>
  );
}
