import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotfoundScreen() {
  return (
    <SafeAreaView className="w-full items-center justify-center">
      <View className="flex h-screen w-full flex-col items-center justify-center">
        <Text className="mt-1 text-sm">Not founds properties</Text>
      </View>
    </SafeAreaView>
  );
}
