import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Icon } from '@roninoss/icons';
import { StripeProvider } from '@stripe/stripe-react-native';
import 'expo-dev-client';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
// eslint-disable-next-line import/order
import { KeyboardProvider } from 'react-native-keyboard-controller';
import '../global.css';

import { Provider } from 'react-redux';

import { cn } from '~/lib/cn';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import store from '~/redux/store';
import { NAV_THEME } from '~/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <StripeProvider publishableKey="pk_test_51NCJw9AuSN43C26O1f8U5X1niKaHqilkHwfJUbmux0qVANvFfc1CdAZNF9FceZfHekHBhuUSm5WnfmSiR6Nw80KU008Kx2G5N7">
      <Provider store={store}>
        <StatusBar
          key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
          style={isDarkColorScheme ? 'light' : 'dark'}
        />

        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <Stack screenOptions={SCREEN_OPTIONS}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </NavThemeProvider>
        </KeyboardProvider>
      </Provider>
    </StripeProvider>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
  headerShown: false,
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'PropertySave',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

// const MODAL_OPTIONS = {
//   presentation: 'modal',
//   animation: 'fade_from_bottom', // for android
//   title: 'Settings',
//   headerRight: () => <ThemeToggle />,
// } as const;
