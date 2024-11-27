import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import PickerModal from 'react-native-picker-modal-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import ImageUpload from '~/components/ui/upload/image-picker';
import { UAE_CITIES_OPTS } from '~/data/cities-data';
import { property_category, property_typeOpt } from '~/data/data';
import { useColorScheme } from '~/lib/useColorScheme';
import { clearPropertyimage } from '~/store/media/mediaSlice';
import { useCreatePropertyMutation } from '~/store/property/propertyApi';
import { ModalPickerSelctionTypes } from '~/types';
import { formatNumberCommas } from '~/utils';
import { getSecureValue } from '~/utils/secure-store';

export default function TextFieldsScreen() {
  const [materialVariant, setMaterialVariant] = React.useState<'filled' | 'outlined'>('outlined');
  const [countryCode, setCountryCode] = React.useState<string>('91');
  const [selectedLocation, setSelectedLocation] = React.useState<ModalPickerSelctionTypes>();
  const [selectedCategory, setSelectedCategory] = React.useState<ModalPickerSelctionTypes>();
  const [selectedPropertyType, setSelectedPropertyType] =
    React.useState<ModalPickerSelctionTypes>();
  const [createSucess, setCreateSuccess] = React.useState(false);
  const [createProperty, { isLoading, isSuccess }] = useCreatePropertyMutation();
  const { propertyimage } = useSelector((state: any) => state?.media);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isSuccess) {
      setCreateSuccess(true);
      alert('Property Created successfully!');
      setTimeout(() => {
        router.push('/workspace');
        setFormData(initailState);
        setCreateSuccess(false);
        setSelectedCategory(null);
        setSelectedLocation(null);
        setSelectedPropertyType(null);
        dispatch(clearPropertyimage());
      }, 1000);
    }
  }, [isSuccess]);

  const initailState = {
    plot_number: '',
    price: '',
    property_image: '',
    property_location: '',
    property_size: '',
    property_type: '',
    property_owner: '',
    category: '',
    author_info: {
      username: '',
      profile_picture: '',
      author_id: '',
    },
    listedBy: {},
    property_author: {},
  };

  const [formdata, setFormData] = React.useState(initailState);

  const selectedValue = (value: any) => {
    setCountryCode(value?.callingCode);
  };

  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();

  const onLocationSelected = (selected: any) => {
    setSelectedLocation(selected);
    return selected;
  };

  const onCategorySelected = (selected: any) => {
    setSelectedCategory(selected);
    return selected;
  };
  const onPropertyTypeSelected = (selected: any) => {
    setSelectedPropertyType(selected);
    return selected;
  };

  const onClosed = () => {
    console.log('close key pressed');
  };

  const onBackButtonPressed = () => {
    console.log('back key pressed');
  };

  const handleSubmit = async () => {
    const userInfo = await getSecureValue('user');
    const userdata = JSON.parse(userInfo);
    // console.log('user', userdata?.first_name);
    const propertyData = {
      plot_number: formdata?.plot_number,
      price: formdata?.price?.replace(/,/g, ''),
      property_image: propertyimage,
      property_location: selectedLocation?.value,
      property_size: formdata?.property_size?.replace(/,/g, ''),
      property_type: selectedPropertyType?.value,
      property_owner: formdata?.property_owner,
      category: selectedCategory?.value,
      author_info: {
        username: `${userdata?.first_name} ${userdata?.last_name}`,
        profile_picture: userdata?.profile_picture,
        author_id: userdata?.id,
      },
      listedBy: {
        _id: userdata?.id,
      },
      property_author: {
        _id: userdata?.id,
      },
    };
    if (!formdata.plot_number || !selectedLocation || !selectedCategory || !formdata.price) {
      // alert('Please fill in all required fields.');
      Alert.alert('SAVE', 'Please fill in all required fields.');
      // eslint-disable-next-line no-unused-expressions

      return;
    }
    try {
      await createProperty(propertyData);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create property.');
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        bottomOffset={10}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <ImageUpload isSuccess={isSuccess} mode="property" />
        <Form className="android:pt-2 px-4 pt-3">
          {Platform.OS === 'android' && (
            <FormSection>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      placeholder="Select Type"
                      value={selectedPropertyType?.label}
                      onPress={showModal}
                    />
                  )}
                  onSelected={onPropertyTypeSelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={property_typeOpt}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedPropertyType}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search Category"
                  requireSelection={false}
                  autoSort={false}
                  // renderListItem={UAE_CITIES_OPTS}
                />
              </FormItem>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      placeholder="Select category"
                      value={selectedCategory?.label}
                      onPress={showModal}
                    />
                  )}
                  onSelected={onCategorySelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={property_category}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedCategory}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search Category"
                  requireSelection={false}
                  autoSort={false}
                  // renderListItem={UAE_CITIES_OPTS}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  value={formdata?.plot_number}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      plot_number: text,
                    }))
                  }
                  label="Plot No"
                  placeholder="1/B"
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  label="Size (sqft)"
                  placeholder="650 sqft"
                  value={formdata?.property_size}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      property_size: text,
                    }))
                  }
                />
              </FormItem>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      label="Location"
                      placeholder="Dubai"
                      value={selectedLocation?.label}
                      onPress={showModal}
                    />
                  )}
                  onSelected={onLocationSelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={UAE_CITIES_OPTS}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedLocation}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search..."
                  requireSelection={false}
                  autoSort={false}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  label="Owner/Ref"
                  placeholder="Mohammed"
                  value={formdata?.property_owner}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      property_owner: text,
                    }))
                  }
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  label="Price in AED"
                  placeholder="65000"
                  value={formatNumberCommas(formdata?.price)}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: text,
                    }))
                  }
                />
              </FormItem>
            </FormSection>
          )}
          {Platform.OS === 'ios' && (
            <FormSection ios={{ title: 'Property info', titleClassName: 'font-semibold' }}>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      placeholder="Select Type"
                      value={selectedPropertyType?.label}
                      onPress={showModal}
                      leftView={
                        <View className="w-28 justify-center pl-2">
                          <Text>Type</Text>
                        </View>
                      }
                    />
                  )}
                  onSelected={onPropertyTypeSelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={property_typeOpt}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedPropertyType}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search Category"
                  requireSelection={false}
                  autoSort={false}
                  // renderListItem={UAE_CITIES_OPTS}
                />
              </FormItem>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      placeholder="Select category"
                      value={selectedCategory?.label}
                      onPress={showModal}
                      leftView={
                        <View className="w-28 justify-center pl-2">
                          <Text>Category</Text>
                        </View>
                      }
                    />
                  )}
                  onSelected={onCategorySelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={property_category}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedCategory}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search Category"
                  requireSelection={false}
                  autoSort={false}
                  // renderListItem={UAE_CITIES_OPTS}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  value={formdata?.plot_number}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      plot_number: text,
                    }))
                  }
                  placeholder="#1/B"
                  leftView={
                    <View className="w-28 justify-center pl-2">
                      <Text>Plot No</Text>
                    </View>
                  }
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  placeholder="1600"
                  value={formatNumberCommas(formdata?.property_size)}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      property_size: text,
                    }))
                  }
                  leftView={
                    <View className="w-28 justify-center pl-2">
                      <Text>Size (sqft)</Text>
                    </View>
                  }
                />
              </FormItem>
              <FormItem>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <TextField
                      textContentType="none"
                      autoComplete="off"
                      materialVariant={materialVariant}
                      placeholder="Dubai"
                      value={selectedLocation?.label}
                      onPress={showModal}
                      leftView={
                        <View className="w-28 justify-center pl-2">
                          <Text>Loacation</Text>
                        </View>
                      }
                    />
                  )}
                  onSelected={onLocationSelected}
                  onClosed={onClosed}
                  onBackButtonPressed={onBackButtonPressed}
                  items={UAE_CITIES_OPTS}
                  sortingLanguage="en"
                  showToTopButton
                  selected={selectedLocation}
                  showAlphabeticalIndex
                  autoGenerateAlphabeticalIndex
                  selectPlaceholderText="Choose one..."
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText="Search Location"
                  requireSelection={false}
                  autoSort={false}
                  // renderListItem={UAE_CITIES_OPTS}
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  placeholder="Muhammad"
                  value={formdata?.property_owner}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      property_owner: text,
                    }))
                  }
                  leftView={
                    <View className="w-28 justify-center pl-2">
                      <Text>Owner/Ref</Text>
                    </View>
                  }
                />
              </FormItem>
              <FormItem>
                <TextField
                  textContentType="none"
                  autoComplete="off"
                  materialVariant={materialVariant}
                  placeholder="65000"
                  value={formatNumberCommas(formdata?.price)}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: text,
                    }))
                  }
                  leftView={
                    <View className="w-28 justify-center pl-2">
                      <Text>Price in AED</Text>
                    </View>
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
            className={createSucess ? 'bg-green-500' : ''}>
            {isLoading ? (
              <View className="gap- flex-row items-center">
                <Text style={{ marginRight: 5 }}>Saveing.. </Text>
                <ActivityIndicator color={colors?.background} />
              </View>
            ) : (
              <View className="flex-row gap-2">
                <Text>{createSucess ? 'Saved' : 'Save Property'}</Text>
                {createSucess && (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadContainer: {
    borderWidth: 1.8,
    borderColor: '#dfdfdf',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
