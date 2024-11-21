import { router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import RadioButtonGroup from '~/components/customs/radio-group';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { registationinfo } from '~/store/auth/authSlice';

const LOGO_SOURCE = {
  uri: 'https://api.marayaglobal.xyz/uploads/logo-short-light-icon.401a77f0-1731347415919.png',
};

export default function InfoScreen() {
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'first-name' | 'last-name' | 'companyname' | 'address' | 'license' | 'identificationno' | null
  >(null);
  const dispatch = useDispatch();

  const initailstate = {
    first_name: '',
    last_name: '',
    company_name: '',
    company_address: '',
    license: '',
    identificationno: '',
  };
  const [formData, setFormData] = React.useState(initailstate);
  const [selectedValue, setSelectedValue] = React.useState('company');
  const handleSubmit = async () => {
    const data = { ...formData, profiletype: selectedValue };
    dispatch(registationinfo(data));

    if (Platform.OS === 'ios') {
      router.push('/auth/(create-account)/credentials');
    } else {
      if (focusedTextField === 'first-name') {
        KeyboardController.setFocusTo('next');
        return;
      }
      KeyboardController.dismiss();
      router.push('/auth/(create-account)/credentials');
    }
  };

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
              {Platform.select({ ios: 'Join us today!', default: 'Join us today!' })}
            </Text>
            {/* {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">Welcome back!</Text>
            )} */}
          </View>
          <View className="ios:pt-4 pt-6">
            <Form className="gap-2">
              <FormSection className="ios:bg-background">
                <FormItem>
                  <RadioButtonGroup
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'First Name', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'First Name' })}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    blurOnSubmit={false}
                    autoFocus
                    onFocus={() => setFocusedTextField('first-name')}
                    onBlur={() => setFocusedTextField(null)}
                    textContentType="name"
                    returnKeyType="next"
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        first_name: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Last Name', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Last Name' })}
                    onFocus={() => setFocusedTextField('last-name')}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    onBlur={() => setFocusedTextField(null)}
                    textContentType="givenName"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        last_name: text,
                      }))
                    }
                  />
                </FormItem>
                {selectedValue === 'company' && (
                  <FormItem>
                    <TextField
                      placeholder={Platform.select({ ios: 'Company Name', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'Company Name' })}
                      onFocus={() => setFocusedTextField('companyname')}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      onBlur={() => setFocusedTextField(null)}
                      textContentType="organizationName"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onChangeText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          company_name: text,
                        }))
                      }
                    />
                  </FormItem>
                )}
                {selectedValue === 'company' ? (
                  <FormItem>
                    <TextField
                      placeholder={Platform.select({ ios: 'License No', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'License No' })}
                      onFocus={() => setFocusedTextField('license')}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      onBlur={() => setFocusedTextField(null)}
                      textContentType="none"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onChangeText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          license: text,
                        }))
                      }
                    />
                  </FormItem>
                ) : (
                  <FormItem>
                    <TextField
                      placeholder={Platform.select({ ios: 'ID/Passport No', default: '' })}
                      label={Platform.select({ ios: undefined, default: 'ID/Passport No' })}
                      onFocus={() => setFocusedTextField('identificationno')}
                      onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                      onBlur={() => setFocusedTextField(null)}
                      textContentType="none"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onChangeText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          identificationno: text,
                        }))
                      }
                    />
                  </FormItem>
                )}
                <FormItem>
                  <TextField
                    placeholder={Platform.select({ ios: 'Address', default: '' })}
                    label={Platform.select({ ios: undefined, default: 'Address' })}
                    onFocus={() => setFocusedTextField('address')}
                    onBlur={() => setFocusedTextField(null)}
                    textContentType="addressCityAndState"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        company_address: text,
                      }))
                    }
                    onSubmitEditing={() => {
                      router.push('/auth/(create-account)/credentials');
                    }}
                  />
                </FormItem>
              </FormSection>
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
              <Text>Continue</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-between py-4 pl-6 pr-8">
            <Button
              variant="plain"
              className="px-2"
              onPress={() => {
                router.replace('/auth/(login)');
              }}>
              <Text className="text-sm text-primary">Already have an account?</Text>
            </Button>
            <Button onPress={handleSubmit}>
              <Text className="text-sm">Next</Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
      {Platform.OS === 'ios' && (
        <Button
          variant="plain"
          onPress={() => {
            router.replace('/auth/(login)');
          }}>
          <Text className="text-sm text-primary">Already have an account?</Text>
        </Button>
      )}
    </View>
  );
}
