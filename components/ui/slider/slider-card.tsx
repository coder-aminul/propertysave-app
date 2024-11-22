import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Card 1', value: '+0 sqft' },
  { id: '2', title: 'Card 2', value: '$38k' },
  { id: '3', title: 'Card 3', value: '+32%' },
  { id: '4', title: 'Card 4', value: '+45%' },
];

export default function CardSlider() {
  const renderCard = (item) => (
    <View style={styles.card} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        containerStyle={styles.swiperContainer}
        slideStyle={styles.slideStyle}
        activeSlideAlignment="center"
        cardSpacing={15}
        nextButton={<Text style={styles.navButton}>›</Text>}
        prevButton={<Text style={styles.navButton}>‹</Text>}>
        {data.map((item) => renderCard(item))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  swiperContainer: {
    width: screenWidth,
    height: 200,
    justifyContent: 'center',
  },
  slideStyle: {
    width: screenWidth * 0.7, // Center card width
    marginHorizontal: 5, // Space between slides
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: 'green',
  },
  navButton: {
    fontSize: 24,
    color: '#aaa',
    fontWeight: 'bold',
  },
});
