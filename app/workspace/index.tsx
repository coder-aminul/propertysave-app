import { AntDesign } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Picker, PickerItem } from '~/components/nativewindui/Picker';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import PropertyStatsSlider from '~/components/ui/slider/transaction-slider';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  const [picker, setPicker] = React.useState('blue');
  const bottomSheetModalRef = useSheetRef();

  // const collumn = [
  //   { id: 1, label: 'Customer' },
  //   { id: 2, label: 'Due Date' },
  //   { id: 3, label: 'Amount' },
  //   { id: 4, label: 'Status' },
  //   { id: 5, label: 'Status' },
  //   { id: 6, label: 'Status' },
  //   { id: 7, label: 'Actions' },
  // ];
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="px-0 py-0">
        <View className="ios:pt-14 android:relative android:-top-3">
          <PropertyStatsSlider />
        </View>
        <View className="mx-2 mt-4">
          <Button variant="primary" onPress={() => bottomSheetModalRef.current?.present()}>
            <Text>
              <AntDesign name="plus" size={20} /> Add Property
            </Text>
          </Button>
        </View>
        {/* <View className="mx-2 mt-4">
          <MainTable data={defaultData} columns={defaultColumns} />
        </View> */}
        {/* <ScrollView horizontal>
          <View className="flex-row items-center justify-center gap-3 border-y-0 bg-gray-100 px-4 py-2">
            {collumn?.map((item) => (
              <View key={item?.id} className="">
                <Text className="text-start text-sm font-semibold">{item?.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <>
          <View className="flex-row items-center justify-center gap-3 border-y-0 bg-gray-100 px-4 py-2">
            <ScrollView horizontal>
              {data?.map((item) => (
                <View key={item?.id} className="">
                  <Text className="text-start text-sm font-semibold">{item?.name}</Text>
                  <Text className="text-start text-sm font-semibold">{item?.amount}</Text>
                  <Text className="text-start text-sm font-semibold">{item?.email}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </> */}

        <Sheet ref={bottomSheetModalRef} stackBehavior="switch" snapPoints={[200, '50%']}>
          <BottomSheetView className=" px-2">
            <Text>Category select</Text>
            <Picker selectedValue={picker} onValueChange={(itemValue) => setPicker(itemValue)}>
              <PickerItem label="Red" value="red" color="red" />
              <PickerItem label="Blue" value="blue" color="blue" />
            </Picker>
          </BottomSheetView>
        </Sheet>
      </View>
    </SafeAreaView>
  );
}
