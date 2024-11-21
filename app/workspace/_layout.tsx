import { AntDesign } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Navigations from '~/components/customs/navigations/navigations';
import { Button } from '~/components/nativewindui/Button';

export default function WorkSpaceLayout() {
  return (
    <Tabs screenOptions={SCREEN_OPTIONS} tabBar={(props) => <Navigations {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'Properties',
        }}
      />
    </Tabs>
  );
}
const SCREEN_OPTIONS = {
  title: '',
  headerShown: true,
  animation: 'ios', // for android
  headerTransparent: Platform.OS === 'ios',
  headerBlurEffect: 'systemMaterial',
  headerRight: Platform.select({
    ios: () => (
      <Button className="ios:px-2 mr-3" variant="plain" onPress={() => router.push('/profile')}>
        {/* <Text className="text-primary">Save</Text> */}
        <AntDesign size={28} name="user" />
      </Button>
    ),
    android: () => (
      <Button className="ios:px-2 mr-2" variant="plain" onPress={() => router.push('/profile')}>
        {/* <Text className="text-primary">Save</Text> */}
        <AntDesign size={28} name="user" />
      </Button>
    ),
  }),
} as const;
