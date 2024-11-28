import { AntDesign } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import PickerModal from 'react-native-picker-modal-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Sheet } from '../nativewindui/Sheet';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import ImageUpload from '~/components/ui/upload/image-picker';
import { UAE_CITIES_OPTS } from '~/data/cities-data';
import { property_category, property_typeOpt } from '~/data/data';
import { useColorScheme } from '~/lib/useColorScheme';
import {
  useEditPropertyMutation,
  useGetPropertyQuery,
  useLazyGetPropertiesbyAuthorQuery,
} from '~/store/property/propertyApi';
import { ModalPickerSelctionTypes, Property, User } from '~/types';
import { formatNumberCommas } from '~/utils';
import { getSecureValue } from '~/utils/secure-store';

type EditPropertiesModalType = {
  id?: string;
  sheetRef: any;
  property?: Property | any;
  clearfunc?: () => void;
};

export default function EditPropertiesModal({
  sheetRef,
  property,
  clearfunc,
}: EditPropertiesModalType) {
  const { data: response, isSuccess: editSuccess } = useGetPropertyQuery(property?.id);
  const propertyData = response?.data;
  const [materialVariant, setMaterialVariant] = React.useState<'filled' | 'outlined'>('outlined');
  const [countryCode, setCountryCode] = React.useState<string>('91');
  const [selectedLocation, setSelectedLocation] = React.useState<ModalPickerSelctionTypes>();
  const [selectedCategory, setSelectedCategory] = React.useState<ModalPickerSelctionTypes>();
  const [selectedPropertyType, setSelectedPropertyType] =
    React.useState<ModalPickerSelctionTypes>();
  const [createSucess, setCreateSuccess] = React.useState(false);
  const [editProperty, { isLoading, isSuccess }] = useEditPropertyMutation();
  const [triggerFetch, { data }] = useLazyGetPropertiesbyAuthorQuery();
  const { propertyimage } = useSelector((state: any) => state?.media);
  const [currentUser, setCurrentUser] = React.useState<User>();

  const dispatch = useDispatch();
  const datafromDB = response?.data;
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

  const loadProperties = async () => {
    try {
      const result = await triggerFetch({
        id: currentUser?.id,
        role: currentUser?.role,
        page: 1,
        limit: 10,
        filters: {},
      }).unwrap();
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const [formdata, setFormData] = React.useState(initailState);

  React.useEffect(() => {
    if (isSuccess) {
      setCreateSuccess(true);
    }
    setFormData({
      plot_number: datafromDB?.plot_number || '',
      price: datafromDB?.price || '',
      property_image: datafromDB?.property_image || '',
      property_location: datafromDB?.property_size || '',
      property_size: datafromDB?.property_size || '',
      property_type: datafromDB?.property_type || '',
      property_owner: datafromDB?.property_owner || '',
      category: datafromDB?.category || '',
      author_info: {
        username: datafromDB?.author_info?.name,
        profile_picture: datafromDB?.author_info?.profile_picture,
        author_id: datafromDB?.author_info?.author_id,
      },
      listedBy: {
        _id: datafromDB?.listedBy?._id,
      },
      property_author: {
        _id: datafromDB?.property_author?._id,
      },
    });
    setSelectedCategory({
      label: datafromDB?.category,
      value: datafromDB?.category,
      Value: datafromDB?.category,
      Name: datafromDB?.category,
      Id: 1,
      id: 1,
    });
    setSelectedLocation({
      label: datafromDB?.property_location,
      value: datafromDB?.property_location,
      Value: datafromDB?.property_location,
      Name: datafromDB?.property_location,
      Id: 1,
      id: 1,
    });
    setSelectedPropertyType({
      label: datafromDB?.property_type,
      value: datafromDB?.property_type,
      Value: datafromDB?.property_type,
      Name: datafromDB?.property_type,
      Id: 1,
      id: 1,
    });

    const fetchUserInfo = async () => {
      try {
        const userInfo: any = await SecureStore.getItemAsync('user');
        const userdata = JSON.parse(userInfo);
        if (userdata?.id) {
          setCurrentUser(userdata);
        } else {
          console.log('No user data found in SecureStore.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [isSuccess, editSuccess, property, setFormData, datafromDB, setCurrentUser]);

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
      property_image: datafromDB?.property_image,
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
      //   await createProperty(propertyData);
      await editProperty({ id: property?.id, data: propertyData });
      clearfunc();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create property.');
    }
  };

  return (
    <Sheet ref={sheetRef} snapPoints={['100%']}>
      <BottomSheetView className="flex-1">
        <SafeAreaView>
          <View className="w-full flex-row justify-between px-2">
            <View className="mb-5">
              <Text className="text-[20px] font-bold">Property Details</Text>
            </View>
            <View className="mb-5">
              <Button
                size="sm"
                onPress={() => {
                  sheetRef.current?.close();
                  clearfunc();
                }}>
                <Text>close</Text>
              </Button>
            </View>
          </View>
          <KeyboardAwareScrollView
            bottomOffset={10}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            contentContainerStyle={{ paddingBottom: insets.bottom }}>
            <ImageUpload
              isSuccess={isSuccess}
              mode="property"
              dbimage={property?.property_image}
              editmode
            />
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
                    <Text>{createSucess ? 'Updated' : 'Update Property'}</Text>
                    {createSucess && (
                      <Text>
                        <AntDesign
                          color="white"
                          className="ml-3 px-5"
                          name="checkcircle"
                          size={17}
                        />
                      </Text>
                    )}
                  </View>
                )}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </BottomSheetView>
    </Sheet>
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
