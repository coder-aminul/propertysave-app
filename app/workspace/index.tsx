import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PropertyStatsSlider from '~/components/ui/slider/transaction-slider';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-0 py-0">
        <View className="ios:pt-14 android:relative android:-top-3">
          <PropertyStatsSlider />
        </View>
      </View>
    </SafeAreaView>
  );
}
