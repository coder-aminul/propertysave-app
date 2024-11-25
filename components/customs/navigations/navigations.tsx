import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import SpeedFabView from '~/components/ui/fab-dial';

export default function Navigations({ state, descriptors, navigation }: any) {
  const grayColor = '#73737';
  const primaryColor = '#0070e9';
  const pathname = usePathname();

  const icons = {
    index: (props) => (
      <AntDesign
        name="home"
        color={grayColor}
        size={pathname === '/workspace/properties' ? 26 : 25}
        {...props}
      />
    ),
    properties: (props) => <FontAwesome5 name="building" color={grayColor} size={25} {...props} />,
    create: (props) => <AntDesign name="pluscircleo" color={grayColor} size={24.5} {...props} />,
  };

  if (pathname === '/workspace/properties') {
    const homerouter = state?.routes?.filter((route, index) => route.name === 'index');
    return (
      // <View className="absolute bottom-11 right-3 h-16 w-16 items-center justify-center rounded-full bg-primary">
      //   {/* {homerouter.map((route: any, index: any) => {
      //     const { options } = descriptors[route.key];

      //     const label =
      //       options.tabBarLabel !== undefined
      //         ? options.tabBarLabel
      //         : options.title !== undefined
      //           ? options.title
      //           : route.name;
      //     const isFocused = state.index === index;

      //     const onPress = () => {
      //       const event = navigation.emit({
      //         type: 'tabPress',
      //         target: route.key,
      //         canPreventDefault: true,
      //       });

      //       if (!isFocused && !event.defaultPrevented) {
      //         navigation.navigate(route.name, route.params);
      //       }
      //     };

      //     const onLongPress = () => {
      //       navigation.emit({
      //         type: 'tabLongPress',
      //         target: route.key,
      //       });
      //     };

      //     return (
      //       <TouchableOpacity
      //         key={route.key}
      //         accessibilityRole="button"
      //         accessibilityState={isFocused ? { selected: true } : {}}
      //         accessibilityLabel={options.tabBarAccessibilityLabel}
      //         testID={options.tabBarTestID}
      //         onPress={onPress}
      //         onLongPress={onLongPress}
      //         className="flex-1 items-center justify-center text-blue-900">
      //         <Text className={`${isFocused ? 'text-[#0070e9]' : 'text-[#fcfcfc]'}`}>
      //           {icons[route?.name]()}
      //         </Text>
      //       </TouchableOpacity>
      //     );
      //   })} */}

      // </View>
      <SpeedFabView />
    );
  } else {
    return (
      <View
        style={styles.tabbar}
        className="absolute bottom-7 items-center justify-center rounded-full bg-white">
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center text-blue-900">
              <Text className={`${isFocused ? 'text-[#0070e9]' : 'text-[#737373]'}`}>
                {icons[route?.name]()}
              </Text>
              <Text className={`${isFocused ? 'text-[#0070e9]' : 'text-[#737373]'} text-sm`}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
