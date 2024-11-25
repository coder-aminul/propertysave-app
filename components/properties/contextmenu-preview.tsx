import * as React from 'react';
import { View } from 'react-native';

import { ITEMS } from './utils';

import { Text } from '~/components/nativewindui/Text';

export const renderIosContextMenuPreview = (info: { item: (typeof ITEMS)[number] }) => {
  return () => {
    return (
      <View className="bg-card/60 dark:bg-muted/70 h-96 w-screen flex-1 rounded-lg p-4">
        <View className="pb-4">
          <Text variant="caption2" className="text-center">
            Property
          </Text>
          <Text variant="caption2" className="text-center">
            {info.item.timestamp}
          </Text>
        </View>
        <View className="pr-10">
          <View style={{ borderCurve: 'circular' }} className="rounded-2xl bg-card p-3">
            <Text>{info.item.subTitle}</Text>
          </View>
        </View>
      </View>
    );
  };
};
