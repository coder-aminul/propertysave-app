import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Sample data
const data = [
  {
    id: 1,
    customer: 'Francis Sanford MD',
    email: 'marya.barrow@yahoo.com',
    dueDate: 'October 18, 2023',
    time: '7:24 PM',
    amount: '$544',
    status: 'Paid',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 2,
    customer: 'Lucia Kshlerin',
    email: 'mason_davis4@yahoo.com',
    dueDate: 'July 18, 2023',
    time: '7:06 AM',
    amount: '$560',
    status: 'Pending',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    customer: 'Byron Hoppe III',
    email: 'jayda_schill35@yahoo.com',
    dueDate: 'December 18, 2024',
    time: '9:32 PM',
    amount: '$249',
    status: 'Pending',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

const Table = () => {
  return (
    <ScrollView>
      {data.map((row) => (
        <View key={row.id} className="flex-row items-center border-b border-gray-300 py-3">
          {/* Checkbox */}
          <TouchableOpacity className="w-12 items-center justify-center">
            <Text className="text-lg text-gray-500">✔</Text>
          </TouchableOpacity>

          {/* Customer Info */}
          <View className="flex-1 flex-row items-center">
            <Image source={{ uri: row.avatar }} className="mr-3 h-10 w-10 rounded-full" />
            <View>
              <Text className="text-lg font-semibold">{row.customer}</Text>
              <Text className="text-sm text-gray-500">{row.email}</Text>
            </View>
          </View>

          {/* Due Date */}
          <View className="w-44 items-start">
            <Text className="font-semibold">{row.dueDate}</Text>
            <Text className="text-sm text-gray-500">{row.time}</Text>
          </View>

          {/* Amount */}
          <Text className="w-28 font-semibold">{row.amount}</Text>

          {/* Status */}
          <View className="w-28">
            <Text className={row.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}>
              {row.status}
            </Text>
          </View>

          {/* Icon Button */}
          <TouchableOpacity className="w-10 items-center justify-center">
            <Text className="text-lg text-gray-500">⋮</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Table;
