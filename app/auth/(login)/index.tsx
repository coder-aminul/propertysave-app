import { Link, Stack, router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { useColorScheme } from '~/lib/useColorScheme';
import { useLoginMutation } from '~/store/auth/authapi';
import { getValueFor } from '~/utils/secure-store';

const LOGO_SOURCE = {
  uri: 'https://api.marayaglobal.xyz/uploads/logo-short-light-icon.401a77f0-1731347415919.png',
};

export default function LoginScreen() {
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<'email' | 'password' | null>(null);
  const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();

  const initailState = {
    email: '',
    password: '',
  };
  const [formdata, SetFormData] = React.useState(initailState);
  React.useEffect(() => {
    if (isSuccess) {
      alert('login success');
      router.replace('/workspace');
      console.log(getValueFor('user'));
    } else if (isError) {
      alert(error?.data?.errors);
    }
  }, [isSuccess, isError, error]);

  const handleSubmit = async () => {
    if (formdata?.email === '' || formdata?.password === '') {
      alert(
        formdata?.email === ''
          ? 'please write your email'
          : formdata?.password === ''
            ? 'please write your password'
            : 'please write your login info'
      );
    } else {
      const data = {
        username: formdata.email?.toLocaleLowerCase(),
        password: formdata.password,
        role: 'company',
      };
      const response = await login(data);
    }
  };
  return (
    <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: 'Log in',
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Link asChild href="/auth">
                <Button variant="plain" className="ios:px-0">
                  <Text className="text-primary">Cancel</Text>
                </Button>
              </Link>
            );
          },
        }}
      />
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 175 })}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="ios:pt-12 pt-20">
        <View className="ios:px-12 flex-1 px-8">
          <View className="items-center pb-1">
            <Image
              source={LOGO_SOURCE}
              className="ios:h-12 ios:w-12 h-8 w-8"
              resizeMode="contain"
            />
            <Text variant="title1" className="ios:font-bold pb-1 pt-4 text-center">
              {Platform.select({ ios: 'Welcome back!', default: 'Log in' })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">Welcome back!</Text>
            )}
          </View>
          <View className="ios:pt-4 pt-6">
            <Form className="gap-2">
              <FormSection className="ios:bg-background">
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Email', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Email' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    blurOnSubmit={false}
                    autoFocus
                    onFocus={() => setFocusedTextField('email')}
                    onBlur={() => setFocusedTextField(null)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onChangeText={(text) =>
                      SetFormData((prev) => ({
                        ...prev,
                        email: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Password' })}
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="password"
                    onSubmitEditing={() => router.replace('/')}
                    onChangeText={(text) =>
                      SetFormData((prev) => ({
                        ...prev,
                        password: text,
                      }))
                    }
                  />
                </FormItem>
              </FormSection>
              <View className="flex-row">
                <Link asChild href="/auth/(login)/forgot-password">
                  <Button size="sm" variant="plain" className="px-0.5">
                    <Text className="text-sm text-primary">Forgot password?</Text>
                  </Button>
                </Link>
              </View>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        offset={{
          closed: 0,
          opened: Platform.select({ ios: insets.bottom + 30, default: insets.bottom }),
        }}>
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button size="lg" onPress={handleSubmit}>
              {isLoading ? (
                <Text>
                  Login <ActivityIndicator style={{ paddingLeft: 10 }} color={colors.background} />
                </Text>
              ) : (
                <Text>Continue</Text>
              )}
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-between py-4 pl-6 pr-8">
            <Button
              variant="plain"
              className="px-2"
              onPress={() => {
                router.replace('/auth/(create-account)');
              }}>
              <Text className="px-0.5 text-sm text-primary">Create Account</Text>
            </Button>
            <Button onPress={handleSubmit}>
              {isLoading ? (
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-sm">Login..</Text>
                  <ActivityIndicator color={colors.background} />
                </View>
              ) : (
                <Text className="text-sm">Submit</Text>
              )}
            </Button>
          </View>
        )}
      </KeyboardStickyView>
      {Platform.OS === 'ios' && (
        <Button
          variant="plain"
          onPress={() => {
            router.replace('/auth/(create-account)');
          }}>
          <Text className="text-sm text-primary">Create Account</Text>
        </Button>
      )}
    </View>
  );
}
