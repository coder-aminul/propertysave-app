import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { Toggle } from '~/components/nativewindui/Toggle';
import { cn } from '~/lib/cn';

export default function GenarelsScreen() {
  const insets = useSafeAreaInsets();

  const [theme, setTheme] = React.useState(false);
  console.log(theme);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Genarel',
          headerTransparent: Platform.OS === 'ios',
          headerShown: true,
          headerBlurEffect: 'systemMaterial',
          //   headerRight: Platform.select({
          //     ios: () => (
          //       <Button
          //         className="ios:px-0"
          //         variant="plain"
          //         onPress={() => {
          //           router.back();
          //         }}>
          //         <Text className={cn(canSave && 'text-primary')}>Save</Text>
          //       </Button>
          //     ),
          //   }),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Form className="gap-5 px-4 pt-8">
          <FormSection materialIconProps={{ name: 'bell-outline' }} footnote="">
            <FormItem className="ios:px-4 ios:pb-2 ios:pt-2 flex-row justify-between px-2 pb-4">
              <View className="w-40 flex-row items-center justify-between">
                <Text className="font-medium">Dark Mode</Text>
              </View>
              <Toggle value={theme} onValueChange={() => setTheme(!theme)} />
            </FormItem>
          </FormSection>
          {Platform.OS !== 'ios' && (
            <View className="items-end">
              <Button
                className={cn('px-6', !canSave && 'bg-muted')}
                // disabled={!canSave}
                onPress={() => {
                  router.back();
                }}>
                <Text>Save</Text>
              </Button>
            </View>
          )}
        </Form>
      </ScrollView>
    </>
  );
}
