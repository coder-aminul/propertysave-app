import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { cn } from '~/lib/cn';
import { useGetUserQuery } from '~/redux/user/userApi';
import { User } from '~/types';
import { getSecureValue } from '~/utils/secure-store';

export default function NameScreen() {
  const insets = useSafeAreaInsets();
  const [userinfo, setUserinfo] = React.useState<User>();
  const { data: response, isSuccess } = useGetUserQuery(userinfo?.id);
  const [userdata, setUserdata] = React.useState<User>();

  const initailState = {
    first_name: userdata?.first_name || '',
    last_name: userdata?.last_name || '',
    email: userdata?.email || '',
    phone: userdata?.phone || '',
  };

  const [form, setForm] = React.useState(initailState);

  React.useEffect(() => {
    const fetchSecureData = async () => {
      const usersecuredata = await getSecureValue('user');
      const user = JSON.parse(usersecuredata);
      setUserinfo(user);
    };
    if (isSuccess) {
      setUserdata(response?.data);
      setForm({
        first_name: userdata?.first_name,
        last_name: userdata?.last_name,
        phone: userdata?.phone,
        email: userdata?.email,
      });
    }
    fetchSecureData();
  }, [setUserinfo, isSuccess, response, setForm, userdata]);

  // function onChangeText(type: 'first' | 'middle' | 'last') {
  //   return (text: string) => {
  //     setForm((prev) => ({ ...prev, [type]: text }));
  //   };
  // }

  function focusNext() {
    KeyboardController.setFocusTo('next');
  }

  const canSave =
    (form.first_name !== userdata?.first_name ||
      form.last_name !== userdata?.last_name ||
      form.email !== userdata?.email) &&
    !!form.first_name &&
    !!form.last_name;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Basic info',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: 'systemMaterial',
          headerShown: true,
          headerRight: Platform.select({
            ios: () => (
              <Button
                className="ios:px-0"
                disabled={!canSave}
                variant="plain"
                onPress={router.back}>
                <Text className={cn(canSave && 'text-primary')}>Save</Text>
              </Button>
            ),
          }),
        }}
      />

      <KeyboardAwareScrollView
        bottomOffset={8}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Form className="gap-5 px-4 pt-8">
          <FormSection materialIconProps={{ name: 'person-outline' }}>
            <FormItem>
              <TextField
                textContentType="givenName"
                autoFocus
                autoComplete="name-given"
                label={Platform.select({ ios: undefined, default: 'First' })}
                leftView={Platform.select({ ios: <LeftLabel>First</LeftLabel> })}
                placeholder="required"
                value={form.first_name}
                onChangeText={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    first_name: text,
                  }))
                }
                onSubmitEditing={focusNext}
                blurOnSubmit={false}
                enterKeyHint="next"
              />
            </FormItem>
            <FormItem>
              <TextField
                textContentType="familyName"
                autoComplete="family-name"
                label={Platform.select({ ios: undefined, default: 'Last' })}
                leftView={Platform.select({ ios: <LeftLabel>Last</LeftLabel> })}
                placeholder="optional"
                value={form.last_name}
                onChangeText={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    last_name: text,
                  }))
                }
                onSubmitEditing={focusNext}
                blurOnSubmit={false}
                enterKeyHint="next"
              />
            </FormItem>
            <FormItem>
              <TextField
                textContentType="telephoneNumber"
                autoComplete="tel"
                label={Platform.select({ ios: undefined, default: 'Last' })}
                leftView={Platform.select({ ios: <LeftLabel>Phone</LeftLabel> })}
                placeholder="required"
                readOnly
                value={form.phone}
                onChangeText={(text) =>
                  setForm((prev) => ({
                    ...prev,
                    phone: text,
                  }))
                }
                onSubmitEditing={router.back}
                enterKeyHint="done"
              />
            </FormItem>
          </FormSection>
          {Platform.OS !== 'ios' && (
            <View className="items-end">
              <Button
                className={cn('px-6', !canSave && 'bg-muted')}
                disabled={!canSave}
                onPress={router.back}>
                <Text>Save</Text>
              </Button>
            </View>
          )}
        </Form>
      </KeyboardAwareScrollView>
    </>
  );
}

function LeftLabel({ children }: { children: string }) {
  return (
    <View className="w-28 justify-center pl-2">
      <Text className="font-medium">{children}</Text>
    </View>
  );
}
