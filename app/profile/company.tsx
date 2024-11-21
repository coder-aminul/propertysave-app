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

export default function CompanyScreen() {
  const insets = useSafeAreaInsets();
  const [userinfo, setUserinfo] = React.useState<User>();
  const { data: response, isSuccess } = useGetUserQuery(userinfo?.id);
  const [userdata, setUserdata] = React.useState<User>();

  const initailState = {
    company_name: userdata?.company_name || '',
    company_address: userdata?.company_address || '',
    license: userdata?.license || '',
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
        company_name: userdata?.company_name,
        company_address: userdata?.company_address,
        license: userdata?.license,
      });
    }
    fetchSecureData();
  }, [setUserinfo, isSuccess, response, setForm, userdata]);

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
          title: 'Company Info',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: 'systemMaterial',
          headerShown: true,
          headerRight: Platform.select({
            ios: () => (
              <Button className="ios:px-0" variant="plain" onPress={router.back}>
                <Text className="text-primary">Save</Text>
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
                textContentType="organizationName"
                autoFocus
                autoComplete="organization-title"
                label={Platform.select({ ios: undefined, default: 'Name' })}
                leftView={Platform.select({ ios: <LeftLabel>Name</LeftLabel> })}
                placeholder="required"
                value={form.company_name}
                readOnly
                onSubmitEditing={focusNext}
                blurOnSubmit={false}
                enterKeyHint="next"
              />
            </FormItem>
            <FormItem>
              <TextField
                textContentType="addressCityAndState"
                autoComplete="street-address"
                label={Platform.select({ ios: undefined, default: 'Address' })}
                leftView={Platform.select({ ios: <LeftLabel>Address</LeftLabel> })}
                placeholder="optional"
                value={form.company_address}
                readOnly
                onSubmitEditing={focusNext}
                blurOnSubmit={false}
                enterKeyHint="next"
              />
            </FormItem>
            <FormItem>
              <TextField
                textContentType="none"
                autoComplete="organization"
                label={Platform.select({ ios: undefined, default: 'License' })}
                leftView={Platform.select({ ios: <LeftLabel>License</LeftLabel> })}
                placeholder="required"
                readOnly
                value={form.license}
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
