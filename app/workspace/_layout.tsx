import { router, Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import Navigations from '~/components/customs/navigations/navigations';
import { Avatar, AvatarImage } from '~/components/nativewindui/Avatar';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';

export default function WorkSpaceLayout() {
  const currentPathname = usePathname();
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
          headerTransparent: false,
        }}
      />
    </Tabs>
  );
}
const SCREEN_OPTIONS = {
  headerShown: true,
  animation: 'ios', // for android
  headerTransparent: Platform.OS === 'ios',
  headerBlurEffect: 'systemMaterial',
  headerLeft: Platform.select({
    ios: () => (
      <Button className="ios:px-2 ml-2" variant="plain">
        <Text>Home</Text>
      </Button>
    ),
    android: () => (
      <Image
        source={{
          uri: 'https://api.marayaglobal.xyz/uploads/logo-short-light-icon.401a77f0-1731347415919.png',
        }}
        resizeMode="cover" // Options: "contain", "cover", "stretch", etc.
      />
    ),
  }),
  headerRight: Platform.select({
    ios: () => (
      <Button className="ios:px-2 mr-3" variant="plain" onPress={() => router.push('/profile')}>
        <Avatar alt="Profile-name">
          <AvatarImage
            source={{
              uri: 'https://prosave.apiservicehub.com/uploads/455359448_1024201792586882_7473297852785697052_n-1730142777258.jpg',
            }}
          />
        </Avatar>
      </Button>
    ),
    android: () => (
      <Button variant="plain" onPress={() => router.push('/profile')}>
        <Avatar alt="Profile-name">
          <AvatarImage
            source={{
              uri: 'https://prosave.apiservicehub.com/uploads/455359448_1024201792586882_7473297852785697052_n-1730142777258.jpg',
            }}
          />
        </Avatar>
      </Button>
    ),
  }),
} as const;
