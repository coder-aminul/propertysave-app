import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

type TransactionType = {
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  message?: string;
  icon: any;
  iconWrapperFill: string;
};

const statData: TransactionType[] = [
  {
    title: 'Total Property',
    amount: '500',
    increased: true,
    percentage: '3200 sqft',
    message: 'Land Listed this month',
    icon: 'home-outline',
    iconWrapperFill: '#8A63D2',
  },
  {
    title: 'Total Agents',
    amount: '120',
    increased: true,
    percentage: '1800 sqft',
    message: 'Listed By agents this month',
    icon: 'cube-outline',
    iconWrapperFill: '#00CEC9',
  },
  {
    title: 'Top Listed Agent',
    amount: '$38,503k',
    increased: true,
    percentage: '32.45%',
    icon: 'cash-outline',
    iconWrapperFill: '#0070F3',
    message: 'Land Listed this month',
  },
  {
    title: 'Total Expense',
    amount: '$27,432k',
    increased: false,
    percentage: '32.45%',
    icon: 'folder-outline',
    iconWrapperFill: '#F5A623',
    message: 'Land Listed this month',
  },
];

export default function PropertyStatsSlider() {
  const flatListRef = useRef<FlatList>(null);

  // const scrollToRight = () => {
  //   flatListRef.current?.scrollToOffset({
  //     offset: width / 1,
  //     animated: true,
  //   });
  // };

  // const scrollToLeft = () => {
  //   flatListRef.current?.scrollToOffset({
  //     offset: 0,
  //     animated: true,
  //   });
  // };

  const renderItem = ({ item }: { item: TransactionType }) => (
    <View style={styles.card} className="flex flex-row gap-2">
      <View style={[styles.iconWrapper, { backgroundColor: item.iconWrapperFill }]}>
        <Ionicons name={item.icon} size={32} color="#fff" />
      </View>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.percentage}>{item.percentage}</Text>
        {item.message && <Text style={styles.message}>{item.message}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={scrollToLeft} style={styles.navButton}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity> */}
      <FlatList
        ref={flatListRef}
        data={statData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `stat-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={width / 1.3}
        decelerationRate="fast"
      />
      {/* <TouchableOpacity onPress={scrollToRight} style={styles.navButton}>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  navButton: {
    // padding: 0,
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    width: width / 1.3,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  message: {
    fontSize: 12,
    color: '#888',
  },
});
