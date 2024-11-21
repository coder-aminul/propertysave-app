import { router, Stack } from 'expo-router';
import React from 'react';

import { useAuth } from '~/hooks/useAuth';

export default function CreateAccountLayout() {
  const auth = useAuth();
  React.useEffect(() => {
    if (auth) {
      return router.replace('/workspace');
    }
  }, [auth]);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Account',
        }}
      />
      <Stack screenOptions={SCREEN_OPTIONS} />
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
  headerShown: false,
} as const;
