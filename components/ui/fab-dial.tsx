import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SpeedFabView = () => {
  const translateY = useSharedValue(200); // Start off-screen
  const [isMenuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
    translateY.value = withTiming(isMenuVisible ? 200 : 0, { duration: 300 });
  };

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value - 15 }],
    opacity: withTiming(isMenuVisible ? 1 : 0, { duration: 300 }),
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value - 72 }],
    opacity: withTiming(isMenuVisible ? 1 : 0, { duration: 300 }),
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value - 130 }],
    opacity: withTiming(isMenuVisible ? 1 : 0, { duration: 300 }),
  }));

  return (
    <View style={styles.container}>
      {/* Option Items */}
      <Animated.View style={[styles.optionButton, animatedStyle3]}>
        <OptionButton iconname="home" label="Dashboard" onPress={() => router.push('/workspace')} />
      </Animated.View>
      <Animated.View style={[styles.optionButton, animatedStyle2]}>
        <OptionButton
          iconname="pluscircleo"
          label="Create Properties"
          onPress={() => router.push('/workspace/create')}
        />
      </Animated.View>
      <Animated.View style={[styles.optionButton, animatedStyle1]}>
        <OptionButton iconname="user" label="Profile" onPress={() => router.push('/profile')} />
      </Animated.View>
      {/* FAB */}
      <FabButton onPress={toggleMenu} isMenuVisible={isMenuVisible} />
    </View>
  );
};

const FabButton = ({ onPress, isMenuVisible }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.fabButton, styles.shadow]}>
      <Ionicons name={isMenuVisible ? 'close' : 'add'} size={32} color="#fff" />
    </TouchableOpacity>
  );
};

const OptionButton = ({ label, onPress, iconname }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionWrapper}>
      <View style={styles.optionTextbg}>
        <Text style={styles.optionText}>{label}</Text>
      </View>
      <View style={styles.innerOptionButton}>
        <AntDesign name={iconname} size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default SpeedFabView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    alignItems: 'flex-end',
    width: '100%',
  },
  fabButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#0070e9',
    color: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionButton: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'flex-end',
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  innerOptionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0070e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f3f3f3',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  optionTextbg: {
    backgroundColor: '#0070e9',
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    maxWidth: '100%',
  },
});
