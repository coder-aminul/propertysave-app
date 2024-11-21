import { Icon } from '@roninoss/icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Platform, View } from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import { Button } from '~/components/nativewindui/Button';
import {
  ESTIMATED_ITEM_HEIGHT,
  List,
  ListItem,
  ListRenderItemInfo,
  ListSectionHeader,
} from '~/components/nativewindui/List';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { useGetUserQuery } from '~/store/user/userApi';
import { User } from '~/types';
import { getSecureValue } from '~/utils/secure-store';

type usercomponent = {
  user: User;
};

const SCREEN_OPTIONS = {
  title: 'Profile',
  headerTransparent: Platform.OS === 'ios',
  headerBlurEffect: 'systemMaterial',
  headerShown: true,
} as const;

const ESTIMATED_ITEM_SIZE =
  ESTIMATED_ITEM_HEIGHT[Platform.OS === 'ios' ? 'titleOnly' : 'withSubTitle'];

export default function Profile() {
  const [userinfo, setUserinfo] = useState<User>();
  const { data: response, isSuccess, isLoading } = useGetUserQuery(userinfo?.id);
  const [userdata, setUserdata] = useState<User>();

  useEffect(() => {
    const fetchSecureData = async () => {
      const userdata = await getSecureValue('user');
      const user = JSON.parse(userdata);
      setUserinfo(user);
    };
    if (isSuccess) {
      setUserdata(response?.data);
    }
    fetchSecureData();
  }, [setUserinfo, isSuccess, response, setUserdata, userdata]);

  const CUSTOMDATA: DataItem[] = [
    ...(Platform.OS !== 'ios' ? ['Basic info'] : []),
    {
      id: 'name',
      title: 'Name',
      ...(Platform.OS === 'ios'
        ? { value: `${userdata?.first_name} ${userdata?.last_name}` }
        : { subTitle: `${userdata?.first_name} ${userdata?.last_name}` }),
      onPress: () => router.push('/profile/name'),
    },
    {
      id: 'email',
      title: 'Email',
      ...(Platform.OS === 'ios' ? { value: userdata?.email } : { subTitle: userdata?.email }),
      onPress: () => router.push('/profile/name'),
    },
    {
      id: 'phone',
      title: 'Phone',
      ...(Platform.OS === 'ios' ? { value: userdata?.phone } : { subTitle: userdata?.phone }),
      onPress: () => router.push('/profile/name'),
    },
    {
      id: 'company',
      title: 'Company',
      ...(Platform.OS === 'ios'
        ? { value: userdata?.company_name }
        : { subTitle: userdata?.company_name }),
      onPress: () => router.push('/profile/company'),
    },
    // ...(Platform.OS !== 'ios' ? ['Stay up to date'] : ['']),
    'Help',
    {
      id: '6',
      title: 'Settings',
      ...(Platform.OS === 'ios' ? { value: 'Settings' } : { subTitle: 'Settings' }),
      onPress: () => router.push('/profile/settings'),
    },
    {
      id: '7',
      title: 'About',
      ...(Platform.OS === 'ios' ? { value: 'PropertySave' } : { subTitle: 'PropertySave' }),
      onPress: () => Linking.openURL('#'),
    },
  ];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <List
        variant="insets"
        data={CUSTOMDATA}
        sectionHeaderAsGap={Platform.OS === 'ios'}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeaderComponent user={userdata} />}
        ListFooterComponent={<ListFooterComponent user={userdata} />}
      />
    </>
  );
}

function renderItem(info: ListRenderItemInfo<DataItem>) {
  return <Item info={info} />;
}

function Item({ info }: { info: ListRenderItemInfo<DataItem> }) {
  const { colors } = useColorScheme();

  if (typeof info.item === 'string') {
    return <ListSectionHeader {...info} />;
  }

  return (
    <ListItem
      titleClassName="text-lg"
      rightView={
        <View className="flex-1 flex-row items-center gap-0.5 px-2">
          {!!info.item.value && <Text className="text-muted-foreground">{info.item.value}</Text>}
          <Icon name="chevron-right" size={22} color={colors.grey2} />
        </View>
      }
      onPress={info.item.onPress}
      {...info}
    />
  );
}

function ListHeaderComponent({ user }: usercomponent) {
  return (
    <View className="ios:pb-8 items-center pb-4  pt-8">
      <Avatar alt={user?.first_name} className="h-24 w-24">
        <AvatarFallback>
          <Text
            variant="largeTitle"
            className={cn(
              'font-medium uppercase text-white dark:text-background',
              Platform.OS === 'ios' && 'dark:text-foreground'
            )}>
            {user?.first_name?.slice(0, 2)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <View className="p-1" />
      <Text variant="title1">{`${user?.first_name} ${user?.last_name}`}</Text>
      <Text className="text-muted-foreground">{user?.email}</Text>
    </View>
  );
}

function ListFooterComponent({ user }: usercomponent) {
  return (
    <View className="ios:px-0 px-4 pt-8">
      <Button
        size="lg"
        variant={Platform.select({ ios: 'primary', default: 'secondary' })}
        className="border-border bg-card">
        <Text className="text-destructive">Log Out</Text>
      </Button>
    </View>
  );
}

type DataItem =
  | string
  | {
      id: string;
      title: string;
      value?: string;
      subTitle?: string;
      onPress: () => void;
    };

// const DATA: DataItem[] = [
//   ...(Platform.OS !== 'ios' ? ['Basic info'] : []),
//   {
//     id: 'name',
//     title: 'Name',
//     ...(Platform.OS === 'ios' ? { value: 'Zach Nugent' } : { subTitle: 'Zach Nugent' }),
//     onPress: () => router.push('/profile/name'),
//   },
//   {
//     id: 'username',
//     title: 'Username',
//     ...(Platform.OS === 'ios' ? { value: '@mrzachnugent' } : { subTitle: '@mrzachnugent' }),
//     onPress: () => router.push('/profile/name'),
//   },
//   ...(Platform.OS !== 'ios' ? ['Stay up to date'] : ['']),
//   {
//     id: '4',
//     title: 'Notifications',
//     ...(Platform.OS === 'ios' ? { value: 'Push' } : { subTitle: 'Push' }),
//     onPress: () => router.push('/profile/notification'),
//   },
//   'Help',
//   {
//     id: '6',
//     title: 'Support',
//     ...(Platform.OS === 'ios' ? { value: 'Discord' } : { subTitle: 'Discord' }),
//     onPress: () => router.push('/profile/settings'),
//   },
//   {
//     id: '7',
//     title: 'About',
//     ...(Platform.OS === 'ios' ? { value: 'NativeWindUI' } : { subTitle: 'NativeWindUI' }),
//     onPress: () => Linking.openURL('#'),
//   },
// ];
