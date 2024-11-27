import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { ScrollView, View } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../nativewindui/Button';
import { Form, FormItem, FormSection } from '../nativewindui/Form';
import { Sheet } from '../nativewindui/Sheet';
import { TextField } from '../nativewindui/TextField';

import { Text } from '~/components/nativewindui/Text';
import { UAE_CITIES_OPTS } from '~/data/cities-data';
import { property_category, property_typeOpt } from '~/data/data';
import { ModalPickerSelctionTypes } from '~/types';

export default function FilterBottomSheet({
  sheetRef,
  updateFilters,
  fetchDataonFilter,
  onClearFilter,
}: {
  sheetRef: string | any;
  updateFilters: (key: string, value: any) => void;
  fetchDataonFilter: () => void;
  onClearFilter: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [materialVariant, setMaterialVariant] = React.useState<'filled' | 'outlined'>('outlined');
  const [selectedLocation, setSelectedLocation] = React.useState<ModalPickerSelctionTypes>();
  const [selectedCategory, setSelectedCategory] = React.useState<ModalPickerSelctionTypes>();
  const [selectedPropertyType, setSelectedPropertyType] =
    React.useState<ModalPickerSelctionTypes>();

  //Onclear filter
  const onClear = async () => {
    onClearFilter();
    setSelectedCategory({});
    setSelectedLocation({});
    setSelectedPropertyType({});
  };

  //OnChnage Handeler

  const onCategorySelected = (selected: any) => {
    setSelectedCategory(selected);
    updateFilters('categories', selected?.value || null);
    return selected;
  };

  const onLocationSelected = (selected: any) => {
    setSelectedLocation(selected);
    updateFilters('locations', selected?.value || null);
    return selected;
  };

  const onPropertyTypeSelected = (selected: any) => {
    setSelectedPropertyType(selected);
    updateFilters('propertyTypes', selected?.value || null);
    return selected;
  };

  //Picker Modal

  const onClosed = () => {
    console.log('close key pressed');
  };

  const onBackButtonPressed = () => {
    console.log('back key pressed');
  };

  return (
    <>
      <Sheet ref={sheetRef} snapPoints={['50%']}>
        <BottomSheetView className="flex-1 items-start justify-start p-1">
          {/* topbar */}
          <View className="w-full flex-row items-center justify-between p-2">
            <View>
              <Text className="text-sm font-semibold">Fliters</Text>
            </View>
            <View>
              <Button size="sm" className="bg-red-500" onPress={onClear}>
                <Text>Clear</Text>
              </Button>
            </View>
          </View>
          {/* filter-section */}
          <View className="w-full">
            <ScrollView contentContainerClassName="p-1">
              <Form>
                <FormSection>
                  <FormItem>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <TextField
                          textContentType="none"
                          autoComplete="off"
                          materialVariant={materialVariant}
                          placeholder="Category"
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
                    />
                  </FormItem>
                  <FormItem>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <TextField
                          textContentType="none"
                          autoComplete="off"
                          materialVariant={materialVariant}
                          placeholder="Location"
                          value={selectedLocation?.label}
                          onPress={showModal}
                          leftView={
                            <View className="w-28 justify-center pl-2">
                              <Text>Location</Text>
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
                      searchPlaceholderText="Search location"
                      requireSelection={false}
                      autoSort={false}
                    />
                  </FormItem>
                  <FormItem>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <TextField
                          textContentType="none"
                          autoComplete="off"
                          materialVariant={materialVariant}
                          placeholder="Property type"
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
                      searchPlaceholderText="Search property type"
                      requireSelection={false}
                      autoSort={false}
                    />
                  </FormItem>
                </FormSection>
              </Form>
              <View className="mt-2">
                <Button onPress={fetchDataonFilter}>
                  <Text>Filter</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </BottomSheetView>
      </Sheet>
    </>
  );
}
