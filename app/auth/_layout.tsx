import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useAuth } from '~/hooks/useAuth';

export default function AuthLayout() {
  const auth = useAuth();

  React.useEffect(() => {
    if (auth) {
      return router.replace('/workspace');
    }
  }, [auth]);
  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(login)" options={LOGIN_MODAL_OPTIONS} />
      <Stack.Screen name="(create-account)" options={CREATE_ACCOUNT_MODAL_OPTIONS} />
    </Stack>
  );
}

const SCREEN_OPTIONS = {
  headerShown: false,
  animation: 'ios', // for android
} as const;

const LOGIN_MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'ios', // for android
  headerShown: false,
} as const;

const CREATE_ACCOUNT_MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'ios', // for android
  headerShown: Platform.OS === 'ios',
  headerShadowVisible: false,
  headerLeft() {
    return (
      <Link asChild href="/auth">
        <Button variant="plain" className="ios:px-0">
          <Text className="text-primary">Cancel</Text>
        </Button>
      </Link>
    );
  },
} as const;
