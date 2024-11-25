import { AntDesign } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CountryPicker from 'rn-country-picker';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import ImageUpload from '~/components/ui/upload/image-picker';
import { useColorScheme } from '~/lib/useColorScheme';
import { useCreateAgentMutation } from '~/store/agent/agentApi';
import { getSecureValue } from '~/utils/secure-store';

export default function TextFieldsScreen() {
  const [materialVariant, setMaterialVariant] = React.useState<'filled' | 'outlined'>('outlined');
  const { propertyimage } = useSelector((state) => state?.media);
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [createAgent, { data: response, isError, isLoading, isSuccess, error }] =
    useCreateAgentMutation();
  const [countryCode, setCountryCode] = React.useState<string>('91');

  const selectedValue = (value: any) => {
    setCountryCode(value?.callingCode);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setFormData(initailState);
      router.push('/profile/settings');
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess]);
  const initailState = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const [formdata, setFormData] = React.useState(initailState);

  const handleSubmit = async () => {
    const companyinfostr = await getSecureValue('user');
    const company = JSON.parse(companyinfostr);
    if (!formdata?.name || !formdata?.email || !formdata?.password || !formdata?.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const data = {
      agentId: {
        _id: company?.id,
      },
      name: formdata?.name,
      email: formdata?.email?.toLocaleLowerCase(),
      password: formdata?.password,
      profile_picture: propertyimage ?? '',
      role: 'agent',
      phone: formdata?.phone,
    };
    console.log(data);
    try {
      await createAgent(data);
    } catch (error: any) {
      alert(error?.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Agent',
          headerTransparent: Platform.OS === 'ios',
          headerShown: true,
          headerBlurEffect: 'systemMaterial',
        }}
      />
      <SafeAreaView className="ios:pt-0">
        <KeyboardAwareScrollView
          bottomOffset={8}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          contentContainerStyle={{ paddingBottom: insets.bottom }}>
          <ImageUpload isSuccess={isSuccess} iosClass="ios:mt-0" mode="agent" />
          <Form className="ios:pt-1 px-4">
            {Platform.OS === 'android' && (
              <FormSection ios={{ title: 'Agent info' }}>
                <Text className="text-sm font-semibold">Agent Info</Text>
                <FormItem>
                  <TextField
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="Muhammed"
                    label="Agent Name"
                    value={formdata?.name}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="example@company.com"
                    label="Email (Must be unique)"
                    value={formdata?.email}
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
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="Type password"
                    label="Password"
                    secureTextEntry
                    value={formdata?.password}
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
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="+987 0000 000"
                    label="Phone"
                    value={formdata?.phone}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: text,
                      }))
                    }
                  />
                </FormItem>
              </FormSection>
            )}
            {Platform.OS === 'ios' && (
              <FormSection ios={{ title: 'Agent info' }}>
                <FormItem>
                  <TextField
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="Muhammed"
                    leftView={
                      <View className="w-28 justify-center pl-2">
                        <Text>Name</Text>
                      </View>
                    }
                    value={formdata?.name}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: text,
                      }))
                    }
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="example@company.com"
                    leftView={
                      <View className="w-28 justify-center pl-2">
                        <Text>E-mail</Text>
                      </View>
                    }
                    value={formdata?.email}
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
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="password"
                    secureTextEntry
                    leftView={
                      <View className="w-28 justify-center pl-2">
                        <Text>Password</Text>
                      </View>
                    }
                    value={formdata?.password}
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
                    textContentType="none"
                    autoComplete="off"
                    materialVariant={materialVariant}
                    placeholder="+987 0000 000"
                    leftView={
                      <View className="w-28 justify-center pl-0">
                        {/* <Text>Phone</Text> */}
                        <CountryPicker
                          animationType="slide"
                          language="en"
                          searchBarPlaceHolder="united arab emirats"
                          searchInputStyle={{ marginTop: 10 }}
                          countryCode={countryCode}
                          selectedValue={selectedValue}
                        />
                      </View>
                    }
                    value={formdata?.phone}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: text,
                      }))
                    }
                  />
                </FormItem>
              </FormSection>
            )}
          </Form>
          <View className="px-4 pt-5">
            <Button
              variant="primary"
              onPress={handleSubmit}
              className={isSuccess ? 'bg-green-500' : ''}>
              {isLoading ? (
                <View className="gap- flex-row items-center">
                  <Text style={{ marginRight: 5 }}>Saveing.. </Text>
                  <ActivityIndicator color={colors?.background} />
                </View>
              ) : (
                <View className="flex-row gap-2">
                  <Text>{isSuccess ? 'Saved' : 'Save Agent'}</Text>
                  {isSuccess && (
                    <Text>
                      <AntDesign color="white" className="ml-3 px-5" name="checkcircle" size={17} />
                    </Text>
                  )}
                </View>
              )}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
