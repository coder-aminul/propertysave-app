import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/components/nativewindui/Text';
const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function PropertiesListScreen() {
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between px-1 py-4">
        <View className="ios:pt-8 pt-12">
          <Text variant="largeTitle" className="ios:text-left ios:font-black text-center font-bold">
            Properties list screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
