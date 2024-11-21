import { router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { useSignupMutation } from '~/redux/auth/authapi';

const LOGO_SOURCE = {
  uri: 'https://api.marayaglobal.xyz/uploads/logo-short-light-icon.401a77f0-1731347415919.png',
};

export default function CredentialsScreen() {
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | 'password' | 'confirm-password' | 'phone' | null
  >(null);
  const { registationState } = useSelector((state) => state.auth);
  const [signup, { isError, isLoading, isSuccess, error }] = useSignupMutation();

  const initailState = {
    email: '',
    phone: '',
    password: '',
    confrimPassword: '',
  };

  const [formData, setFormData] = React.useState(initailState);

  React.useEffect(() => {
    if (isSuccess) {
      alert('Registation successfully!');
      router.replace('/workspace');
    } else if (isError) {
      alert(error?.data?.errors);
    }
  }, [isSuccess, isError, error]);
  const handleSubmit = async () => {
    if (formData.password !== formData.confrimPassword) {
      return alert('password and confrim password did not match!');
    } else {
      const data = {
        ...registationState?.infoState,
        email: formData?.email?.toLocaleLowerCase(),
        password: formData?.password,
        phone: formData?.phone,
        role: 'company',
      };
      const response = await signup(data);
      if (Platform.OS !== 'ios') {
        if (focusedTextField !== 'confirm-password') {
          KeyboardController.setFocusTo('next');
          return;
        }
        KeyboardController.dismiss();
      }
      // console.log(data);
    }
  };
  // console.log(process.env.EXPO_PUBLIC_API_URL);
  return (
    <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 8 })}
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
              {Platform.select({ ios: 'Set up your credentials', default: 'Create Account' })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">
                Set up your credentials
              </Text>
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
                    textContentType="emailAddress"
                    className="lowercase"
                    style={{ textTransform: 'lowercase' }}
                    returnKeyType="next"
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Phone', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Phone' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    blurOnSubmit={false}
                    onFocus={() => setFocusedTextField('phone')}
                    onBlur={() => setFocusedTextField(null)}
                    textContentType="telephoneNumber"
                    returnKeyType="next"
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Password' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    blurOnSubmit={false}
                    secureTextEntry
                    returnKeyType="next"
                    textContentType="newPassword"
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Confirm password', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Confirm password' })}
                    onFocus={() => setFocusedTextField('confirm-password')}
                    onBlur={() => setFocusedTextField(null)}
                    onSubmitEditing={() => router.replace('/')}
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="newPassword"
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        confrimPassword: text,
                      }))
                    }
                  />
                </FormItem>
              </FormSection>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button size="lg" onPress={handleSubmit} disabled={isLoading}>
              <Text>{isLoading ? 'Loading' : 'Submit'}</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-end py-4 pl-6 pr-8">
            <Button onPress={handleSubmit}>
              <Text className="text-sm">
                {focusedTextField !== 'confirm-password'
                  ? 'Next'
                  : isLoading
                    ? 'Loading...'
                    : 'Submit'}
              </Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
    </View>
  );
}
