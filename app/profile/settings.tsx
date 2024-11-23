import { Icon, MaterialIconName } from '@roninoss/icons';
import { router } from 'expo-router';
import { View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { LargeTitleHeader } from '~/components/nativewindui/LargeTitleHeader';
import {
  ESTIMATED_ITEM_HEIGHT,
  List,
  ListDataItem,
  ListItem,
  ListRenderItemInfo,
  ListSectionHeader,
} from '~/components/nativewindui/List';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

export default function SettingsIosStyleScreen() {
  return (
    <>
      <LargeTitleHeader title="Settings" searchBar={{ iosHideWhenScrolling: true }} />
      <List
        contentContainerClassName="pt-4"
        contentInsetAdjustmentBehavior="automatic"
        variant="insets"
        data={DATA}
        estimatedItemSize={ESTIMATED_ITEM_HEIGHT.titleOnly}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        sectionHeaderAsGap
      />
    </>
  );
}

function renderItem<T extends (typeof DATA)[number]>(info: ListRenderItemInfo<T>) {
  if (typeof info.item === 'string') {
    return <ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      className={cn(
        'ios:pl-0 pl-2',
        info.index === 0 && 'ios:border-t-0 border-border/25 dark:border-border/80 border-t'
      )}
      titleClassName="text-lg"
      leftView={info.item.leftView}
      rightView={
        <View className="flex-1 flex-row items-center justify-center gap-2 px-4">
          {info.item.rightText && (
            <Text variant="callout" className="ios:px-0 px-2 text-muted-foreground">
              {info.item.rightText}
            </Text>
          )}
          {info.item.badge && (
            <View className="h-5 w-5 items-center justify-center rounded-full bg-destructive">
              <Text variant="footnote" className="font-bold leading-4 text-destructive-foreground">
                {info.item.badge}
              </Text>
            </View>
          )}
          <ChevronRight />
        </View>
      }
      {...info}
      onPress={info?.item.onPress}
    />
  );
}

function ChevronRight() {
  const { colors } = useColorScheme();
  return <Icon name="chevron-right" size={17} color={colors.grey} />;
}

function IconView({ className, name }: { className?: string; name: MaterialIconName }) {
  return (
    <View className="px-3">
      <View className={cn('h-6 w-6 items-center justify-center rounded-md', className)}>
        <Icon name={name} size={15} color="white" />
      </View>
    </View>
  );
}

function keyExtractor(item: (Omit<ListDataItem, string> & { id: string }) | string) {
  return typeof item === 'string' ? item : item.id;
}

type MockData =
  | {
      id: string;
      title: string;
      subTitle?: string;
      leftView?: React.ReactNode;
      rightText?: string;
      badge?: number;
      onPress: () => void;
    }
  | string;

const DATA: MockData[] = [
  // {
  //   id: '1',
  //   title: 'Propertysave',
  //   subTitle: 'Apple ID, iCloud+ & Purchases',
  //   leftView: (
  //     <View className="px-3">
  //       <Avatar alt="propertysave's avatar">
  //         <AvatarImage
  //           source={{
  //             uri: 'https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg',
  //           }}
  //         />
  //         <AvatarFallback>
  //           <Text>PS</Text>
  //         </AvatarFallback>
  //       </Avatar>
  //     </View>
  //   ),
  //   onPress: () => console.log('Propertysave'),
  // },
  {
    id: '2',
    title: 'Team members',
    leftView: (
      <View className="flex-row px-3 ">
        <Avatar alt="Zach Nugent's avatar" className="h-6 w-6">
          <AvatarImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/63797719?v=4',
            }}
          />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
        <Avatar alt="Dan Stepanov's avatar" className="-ml-2 h-6 w-6">
          <AvatarImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/5482800?v=4',
            }}
          />
          <AvatarFallback>
            <Text>DS</Text>
          </AvatarFallback>
        </Avatar>
      </View>
    ),
    onPress: () => console.log('Propertysave'),
  },

  {
    id: '3',
    title: 'Memberships & Subscriptions',
    badge: 3,
    onPress: () => router.push('/profile/subscriptions'),
  },
  'gap 3',
  {
    id: '8',
    title: 'Notifications',
    leftView: <IconView name="bell-outline" className="bg-destructive" />,
    onPress: () => router.push('/profile/notification'),
  },
  {
    id: '11',
    title: 'General',
    leftView: <IconView name="cog-outline" className="bg-gray-500" />,
    onPress: () => router.replace('/profile/genarel'),
  },
  {
    id: '13',
    title: 'Accessibility',
    leftView: <IconView name="accessibility" className="bg-sky-500" />,
    onPress: () => console.log('notification'),
  },
];
