import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import PropertyStatsSlider from '~/components/ui/slider/transaction-slider';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="px-0 py-0">
        <View className="ios:pt-14 android:relative android:-top-3">
          <PropertyStatsSlider />
        </View>
        <View className="mx-2 mt-4">
          <Button variant="primary" onPress={() => router.push('/workspace/create')}>
            <Text>
              <AntDesign name="plus" size={20} /> Add Property
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
