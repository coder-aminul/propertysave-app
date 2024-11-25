import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import LoadingScreen from '~/components/customs/loading-screen';
import NotfoundScreen from '~/components/customs/nofound';
import { List, ListRenderItemInfo } from '~/components/nativewindui/List';
import PropertyItem from '~/components/properties/propertyItem';
import SelectingToolbar from '~/components/properties/toolbar';
import { LeftView } from '~/components/properties/topbar';
import { useGetPropertiesbyCompanyQuery } from '~/store/property/propertyApi';
import { Property, User } from '~/types';
import { convertToTime, formatPrice } from '~/utils';

export default function PropertiesListScreen() {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const isSelectingDerived = useDerivedValue(() => isSelecting);
  const [selectedMessages, setSelectedMessages] = React.useState<string[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [propertyall, setPropertyAll] = React.useState([]);
  const {
    data: response,
    isSuccess,
    isLoading,
  } = useGetPropertiesbyCompanyQuery({
    id: currentUser?.id,
    role: currentUser?.role,
  });
  const properties = response?.data?.rows;

  const propertiesList = properties?.map((item: Property) => {
    return {
      id: item?._id,
      contact: false,
      unread: false,
      title: `${item?.plot_number} ${item?.property_location}`,
      subTitle: `${formatPrice(Number(item?.price))} ${item?.property_type}`,
      timestamp: convertToTime(item?.createdAt),
      image: item?.property_image,
      plot_number: item?.plot_number,
      property_location: item?.property_location,
      property_size: item?.property_size,
      property_image: item?.property_image,
      property_type: item?.property_type,
      property_owner: item?.property_owner,
      category: item?.category,
      price: item?.price,
    };
  });

  React.useEffect(() => {
    const saveData = async (key: string, value: any) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving data', error);
      }
    };
    if (isSuccess) {
      // SecureStore.setItem('properties', JSON.stringify(propertiesList));
      saveData('properties', JSON.stringify(propertiesList));
    }
    const fetchUserInfo = async () => {
      try {
        const userInfo: any = await SecureStore.getItemAsync('user');
        const propertiesall: any = await AsyncStorage.getItem('properties');
        const userdata = JSON.parse(userInfo);
        const propertiesdata = JSON.parse(propertiesall);
        if (userdata?.id) {
          setCurrentUser(userdata);
        } else {
          console.log('No user data found in SecureStore.');
        }
        setPropertyAll(propertiesdata);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [setCurrentUser, isSuccess, setPropertyAll]);

  const checkboxContainerStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(isSelectingDerived.value ? 32 : 0, { duration: 150 }),
    };
  });

  const renderItem = React.useCallback(
    (info: ListRenderItemInfo<(typeof ITEMS)[number]>) => {
      return (
        <PropertyItem
          info={info}
          checkboxContainerStyle={checkboxContainerStyle}
          isSelecting={isSelecting}
          selectedMessages={selectedMessages}
          setSelectedMessages={setSelectedMessages}
        />
      );
    },
    [isSelecting, selectedMessages]
  );

  function onIsSelectingChange(value: boolean) {
    if (!value) {
      setSelectedMessages([]);
    }
    setIsSelecting(value);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoading) {
    return <NotfoundScreen />;
  }

  return (
    <>
      <SafeAreaView>
        <View className="mx-2 flex-row">
          <LeftView isSelecting={isSelecting} setIsSelecting={onIsSelectingChange} />
        </View>
      </SafeAreaView>
      <List
        data={propertiesList}
        extraData={[isSelecting, selectedMessages]}
        contentInsetAdjustmentBehavior="automatic"
        ListFooterComponent={isSelecting ? <View className="h-[46px]" /> : undefined}
        estimatedItemSize={88}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {isSelecting && <SelectingToolbar hasSelectedAMessage={selectedMessages.length > 0} />}
    </>
  );
}

const ITEMS = [
  {
    id: '1',
    contact: true,
    unread: true,
    title: 'Alice Johnson',
    subTitle:
      'Hi team, please find the latest updates on the project. We have completed the initial phase and are moving into the testing stage.',
    timestamp: '8:32 AM',
  },
  {
    id: '2',
    contact: true,
    unread: true,
    title: 'Bob Smith',
    subTitle:
      'Reminder: We have a team meeting scheduled for tomorrow at 10 AM. Please make sure to bring your reports.',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    contact: false,
    unread: false,
    title: '(555) 123-4567',
    subTitle:
      'You have a missed call from this number. Please call back at your earliest convenience.',
    timestamp: 'Saturday',
  },
  {
    id: '4',
    contact: true,
    unread: false,
    title: 'Catherine Davis',
    subTitle:
      'Hi, please find attached the invoice for the services provided last month. Let me know if you need any further information.',
    timestamp: 'Last Tuesday',
  },
  {
    id: '5',
    contact: true,
    unread: true,
    title: 'Daniel Brown',
    subTitle: "Hey, are you free for lunch this Thursday? Let's catch up!",
    timestamp: '10:15 AM',
  },
  {
    id: '6',
    contact: false,
    unread: false,
    title: '(555) 987-6543',
    subTitle:
      'Your service appointment is scheduled for June 29th. Please be available during the time slot.',
    timestamp: '2024-06-29',
  },
  {
    id: '7',
    contact: true,
    unread: false,
    title: 'Evelyn Clark',
    subTitle: 'Wishing you a very happy birthday! Have a great year ahead.',
    timestamp: '2024-06-29',
  },
  {
    id: '8',
    contact: false,
    unread: false,
    title: '(555) 321-7654',
    subTitle: "Don't forget to submit your timesheet by the end of the day.",
    timestamp: '2024-06-29',
  },
  {
    id: '9',
    contact: true,
    unread: false,
    title: 'Fiona Wilson',
    subTitle: 'Attached is the weekly report for your review. Please provide your feedback.',
    timestamp: '2024-06-29',
  },
  {
    id: '10',
    contact: true,
    unread: false,
    title: 'George Martinez',
    subTitle:
      'Hi all, we are planning a team outing next weekend. Please confirm your availability.',
    timestamp: '2024-06-29',
  },
  {
    id: '11',
    contact: false,
    unread: false,
    title: '(555) 654-3210',
    subTitle:
      'Congratulations! You are eligible for a special promotion. Contact us to learn more.',
    timestamp: '2024-06-29',
  },
  {
    id: '12',
    contact: true,
    unread: false,
    title: 'Hannah Lee',
    subTitle:
      'Hi, your contract is up for renewal. Please review the attached document and let us know if you have any questions.',
    timestamp: '2024-06-29',
  },
];
