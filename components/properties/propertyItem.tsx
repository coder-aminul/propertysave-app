import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Icon } from '@roninoss/icons';
import * as React from 'react';
import { Platform, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { renderIosContextMenuPreview } from './contextmenu-preview';
import Swipeable from './property-swipeable';
import {
  CONTEXT_MENU_ITEMS,
  getInitials,
  ITEMS,
  noop,
  TEXT_STYLE,
  TIMESTAMP_CONTAINER_STYLE,
} from './utils';

import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import { Checkbox } from '~/components/nativewindui/Checkbox';
import { ContextMenu } from '~/components/nativewindui/ContextMenu';
import { ListItem, ListRenderItemInfo } from '~/components/nativewindui/List';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

export default function PropertyItem({
  info,
  selectedMessages,
  setSelectedMessages,
  isSelecting,
  checkboxContainerStyle,
}: {
  info: ListRenderItemInfo<(typeof ITEMS)[number]>;
  selectedMessages: string[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<string[]>>;
  isSelecting: boolean;
  checkboxContainerStyle: ViewStyle;
}) {
  const { colors } = useColorScheme();
  const bottomSheetModalRef = useSheetRef();

  function onListItemPress() {
    if (isSelecting) {
      if (selectedMessages.includes(info.item.id)) {
        setSelectedMessages(selectedMessages.filter((id) => id !== info.item.id));
        return;
      }
      setSelectedMessages([...selectedMessages, info.item.id]);
    }
    // router.push(');
    bottomSheetModalRef.current?.present();
  }

  function onCheckedChange(isChecked: boolean) {
    if (isChecked) {
      setSelectedMessages((prev) => [...prev, info.item.id]);
    } else {
      setSelectedMessages((prev) => prev.filter((id) => id !== info.item.id));
    }
  }

  return (
    <Swipeable isUnread={info.item.unread}>
      <ContextMenu
        items={CONTEXT_MENU_ITEMS}
        iosRenderPreview={renderIosContextMenuPreview(info)}
        materialAlign="center">
        <ListItem
          {...info}
          subTitleNumberOfLines={2}
          onLongPress={noop} // Prevent onPress from firing when long pressing with quick release
          onPress={onListItemPress}
          className={cn(
            'h-[88px]',
            selectedMessages.includes(info.item.id) && 'bg-muted/15',
            selectedMessages.includes(info.item.id) &&
              Platform.OS === 'ios' &&
              'dark:bg-muted/50 bg-muted/20',
            info.index === 0 && 'ios:border-t-0 border-border/25 dark:border-border/80 border-t'
          )}
          leftView={
            <View className="flex-1 flex-row items-center px-3 py-3 pl-2">
              <Animated.View style={checkboxContainerStyle} className="items-center justify-center">
                {isSelecting && (
                  <Checkbox
                    checked={selectedMessages.includes(info.item.id)}
                    onCheckedChange={onCheckedChange}
                  />
                )}
              </Animated.View>
              {/* <View className="w-6 items-center justify-center">
                  <View className="pr-0.5">
                    {info.item.unread && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </View>
                </View> */}
              <Avatar alt="avatar" className="h-12 w-12">
                <AvatarFallback>
                  <View className="opacity-90 dark:opacity-80">
                    {info.item.contact ? (
                      <Text
                        className="dark:ios:text-white leading-6 text-white dark:text-background"
                        variant="title3">
                        {getInitials(info.item.title)}
                      </Text>
                    ) : (
                      <Icon
                        size={36}
                        name="person"
                        color={Platform.select({
                          ios: 'white',
                          default: colors.background,
                        })}
                      />
                    )}
                  </View>
                </AvatarFallback>
              </Avatar>
            </View>
          }
          titleStyle={TEXT_STYLE}
          titleClassName="font-medium text-lg"
          subTitleClassName="pt-0.5"
          rightView={
            <>
              <View className="pr-3">
                {!isSelecting && <Icon name="chevron-right" size={15} color={colors.grey} />}
              </View>
            </>
          }
        />
      </ContextMenu>
      <View style={TIMESTAMP_CONTAINER_STYLE} className="absolute right-8 top-1.5">
        <Text numberOfLines={1} variant="footnote" className="text-muted-foreground">
          {info.item.timestamp}
        </Text>
      </View>
      <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
        <BottomSheetView className="flex-1 items-center justify-center pb-8">
          <Text className="text-foreground">{info?.item?.title}</Text>
        </BottomSheetView>
      </Sheet>
    </Swipeable>
  );
}
