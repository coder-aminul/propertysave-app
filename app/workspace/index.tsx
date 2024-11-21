import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/components/nativewindui/Text';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4">
        <View className="ios:pt-8 pt-12">
          <Text variant="largeTitle" className="ios:text-left ios:font-black text-center font-bold">
            Welcome to your
          </Text>
          <Text
            variant="largeTitle"
            className="ios:text-left ios:font-black text-center font-bold text-primary">
            workspace
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
