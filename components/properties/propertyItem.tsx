import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Icon } from '@roninoss/icons';
import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '../nativewindui/Button';
import { renderIosContextMenuPreview } from './contextmenu-preview';
import EditPropertiesModal from './edit-properties';
import Swipeable from './property-swipeable';
import {
  CONTEXT_MENU_ITEMS,
  getInitials,
  ITEMS,
  noop,
  TEXT_STYLE,
  TIMESTAMP_CONTAINER_STYLE,
} from './utils';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Checkbox } from '~/components/nativewindui/Checkbox';
import { ContextMenu } from '~/components/nativewindui/ContextMenu';
import { ListItem, ListRenderItemInfo } from '~/components/nativewindui/List';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { Property } from '~/types';
import { formatNumberCommas, formatPrice } from '~/utils';

export default function PropertyItem({
  info,
  selectedMessages,
  setSelectedMessages,
  isSelecting,
  checkboxContainerStyle,
  property,
  clear,
}: {
  info: ListRenderItemInfo<(typeof ITEMS)[number]>;
  selectedMessages: string[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<string[]>>;
  isSelecting: boolean;
  checkboxContainerStyle: ViewStyle;
  property?: Property;
  clear?: () => void;
}) {
  const { colors } = useColorScheme();
  const bottomSheetModalRef = useSheetRef();
  const editsheetRef = useSheetRef();

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
                <AvatarImage
                  source={{ uri: `https://prosave.apiservicehub.com/${info?.item?.image}` }}
                />
                <AvatarFallback>
                  <View className="opacity-90 dark:opacity-80">
                    {info.item.title ? (
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
      <Sheet ref={bottomSheetModalRef} snapPoints={['50%']}>
        <BottomSheetView className="flex-1 items-center justify-start p-3">
          <View className="w-full flex-row justify-between">
            <View className="mb-5">
              <Text className="text-[20px] font-bold">Property Details</Text>
            </View>
            <View className="mb-5">
              <Button
                size="sm"
                onPress={() => {
                  editsheetRef.current?.present();
                }}>
                <Text>Edit</Text>
              </Button>
            </View>
          </View>

          <View className="w-full flex-row justify-between gap-2">
            <TouchableOpacity className="w-[40%]">
              <View
                className="h-[215px] rounded-md border border-gray-300 bg-slate-50 drop-shadow-lg"
                style={{
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  padding: 8,
                }}>
                <Image
                  source={{
                    uri: `https://prosave.apiservicehub.com/${info?.item?.property_image}`,
                  }}
                  style={{
                    width: 'auto',
                    resizeMode: 'contain',
                    borderRadius: 5,
                    objectFit: 'fill',
                    height: 195,
                  }}
                  alt="image"
                />
              </View>
            </TouchableOpacity>
            <View className="flex-row justify-between p-2">
              <View className="flex-col gap-3">
                <View>
                  <Text className="text-[18px] font-semibold">Property</Text>
                  <Text className="text-sm capitalize">{info?.item?.category}</Text>
                </View>
                <View>
                  <Text className="text-[18px] font-semibold">Size</Text>
                  <Text className="text-sm">
                    {formatNumberCommas(info?.item?.property_size)} sqft
                  </Text>
                </View>
                <View>
                  <Text className="text-[18px] font-semibold">Price</Text>
                  <Text className="text-sm capitalize">{formatPrice(info?.item?.price)}</Text>
                </View>
                <View>
                  <Text className="text-[18px] font-semibold">Plot Number</Text>
                  <Text className="text-sm capitalize">{info?.item?.plot_number}</Text>
                </View>
              </View>
              <View className="flex-col gap-3">
                <View>
                  <Text className="text-[18px] font-semibold">Type</Text>
                  <Text className="text-wrap text-sm capitalize">{info?.item?.property_type}</Text>
                </View>
                <View>
                  <Text className="text-[18px] font-semibold">Location</Text>
                  <Text className="text-sm capitalize">{info?.item?.property_location}</Text>
                </View>
                <View>
                  <Text className="text-[18px] font-semibold">Owne/Ref</Text>
                  <Text className="text-sm capitalize">{info?.item?.property_owner}</Text>
                </View>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </Sheet>
      <EditPropertiesModal sheetRef={editsheetRef} property={info.item} clearfunc={clear} />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  imageBox: {
    width: 300,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 20,
    resizeMode: 'contain',
    width: 'auto',
  },
  insetShadow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    borderRadius: 20,
    margin: 5, // Creates the "inset" effect
  },
});
