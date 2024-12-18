import { Icon } from '@roninoss/icons';
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { ACTION_BUTTON_STYLE, BUTTON_WIDTH, dimensions, SPRING_CONFIG } from './utils';

export default function Swipeable({
  children,
  isUnread,
}: {
  children: React.ReactNode;
  isUnread: boolean;
}) {
  const translateX = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const initialTouchLocation = useSharedValue<{ x: number; y: number } | null>(null);

  const rootStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const statusActionStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      flex: 1,
      height: '100%',
      width: interpolate(translateX.value, [0, dimensions.width], [0, dimensions.width]),
    };
  });
  const trashActionStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      right: 0,
      flex: 1,
      height: '100%',
      width: interpolate(-translateX.value, [0, dimensions.width], [0, dimensions.width]),
    };
  });
  const notificationActionStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      left: interpolate(-translateX.value, [0, dimensions.width], [dimensions.width, 0]),
      flex: 1,
      height: '100%',
      width:
        previousTranslateX.value > translateX.value
          ? interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, BUTTON_WIDTH * 3, dimensions.width],
              [0, BUTTON_WIDTH, BUTTON_WIDTH * 1.2, 0]
            )
          : interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, dimensions.width],
              [0, BUTTON_WIDTH, 0]
            ),
    };
  });
  const statusIconStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      left: interpolate(
        translateX.value,
        [0, BUTTON_WIDTH, BUTTON_WIDTH * 2, BUTTON_WIDTH * 3, dimensions.width],
        [-BUTTON_WIDTH, 0, 0, BUTTON_WIDTH * 2, dimensions.width - BUTTON_WIDTH]
      ),

      flex: 1,
      height: '100%',
      width: BUTTON_WIDTH,
    };
  });
  const trashIconStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      right:
        previousTranslateX.value > translateX.value
          ? interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, BUTTON_WIDTH * 3, BUTTON_WIDTH * 3 + 40, dimensions.width],
              [-BUTTON_WIDTH, 0, 0, BUTTON_WIDTH + 40, dimensions.width - BUTTON_WIDTH]
            )
          : interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, dimensions.width],
              [-BUTTON_WIDTH, 0, dimensions.width - BUTTON_WIDTH]
            ),
      flex: 1,
      height: '100%',
      width: BUTTON_WIDTH,
    };
  });

  function onToggleMarkAsRead() {
    console.log('onToggleMarkAsRead');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  function onDelete() {
    console.log('onDelete');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  function onToggleNotifications() {
    console.log('onToggleNotifications');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  const pan = Gesture.Pan()
    .manualActivation(Platform.OS !== 'ios')
    .onBegin((evt) => {
      initialTouchLocation.value = { x: evt.x, y: evt.y };
    })
    .onStart(() => {
      previousTranslateX.value = translateX.value;
    })
    // Prevents blocking the scroll view
    .onTouchesMove((evt, state) => {
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = Math.abs(evt.changedTouches[0].x - initialTouchLocation.value.x);
      const yDiff = Math.abs(evt.changedTouches[0].y - initialTouchLocation.value.y);
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning && xDiff > 0.5) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((event) => {
      translateX.value = clamp(
        event.translationX + previousTranslateX.value,
        -dimensions.width,
        dimensions.width
      );
    })
    .onEnd((event) => {
      const right = event.translationX > 0 && translateX.value > 0;
      const left = event.translationX < 0 && translateX.value < 0;

      if (right) {
        if (translateX.value > BUTTON_WIDTH * 2) {
          translateX.value = withSpring(0, SPRING_CONFIG);
          runOnJS(onToggleMarkAsRead)();
          return;
        }
        translateX.value = withSpring(
          event.translationX > 0 ? BUTTON_WIDTH : -BUTTON_WIDTH,
          SPRING_CONFIG
        );
        return;
      }

      if (left) {
        if (translateX.value < -BUTTON_WIDTH * 3) {
          translateX.value = withSpring(-dimensions.width, SPRING_CONFIG);
          runOnJS(onDelete)();
          return;
        }
        translateX.value = withSpring(
          event.translationX > 0 ? BUTTON_WIDTH * 2 : -BUTTON_WIDTH * 2,
          SPRING_CONFIG
        );
        return;
      }

      translateX.value = withSpring(0, SPRING_CONFIG);
    });

  function onStatusActionPress() {
    translateX.value = withSpring(0, SPRING_CONFIG);
    onToggleMarkAsRead();
  }

  function onDeleteActionPress() {
    translateX.value = withSpring(-dimensions.width, SPRING_CONFIG);
    onDelete();
  }

  function onNotificationActionPress() {
    translateX.value = withSpring(0, SPRING_CONFIG);
    onToggleNotifications();
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        {/* <Animated.View style={statusActionStyle} className="bg-primary">
          <Animated.View style={statusIconStyle}>
            <Pressable
              style={ACTION_BUTTON_STYLE}
              onPress={onStatusActionPress}
              className="absolute bottom-0 right-0 top-0 items-center justify-center">
              <Icon
                ios={{ name: isUnread ? 'checkmark.message.fill' : 'message.badge.fill' }}
                materialIcon={{
                  type: 'MaterialCommunityIcons',
                  name: isUnread ? 'read' : 'email-mark-as-unread',
                }}
                size={24}
                color="white"
              />
            </Pressable>
          </Animated.View>
        </Animated.View> */}
        <Animated.View style={trashActionStyle} className="bg-destructive">
          <Animated.View style={trashIconStyle}>
            <Pressable
              style={ACTION_BUTTON_STYLE}
              onPress={onDeleteActionPress}
              className="absolute bottom-0 right-0 top-0 items-center justify-center">
              <Icon name="trash-can" size={24} color="white" />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <Animated.View style={notificationActionStyle} className="bg-violet-600">
          <Pressable
            style={ACTION_BUTTON_STYLE}
            onPress={onNotificationActionPress}
            className="absolute bottom-0 left-0 top-0 items-center justify-center">
            <Icon
              ios={{ name: 'pencil' }}
              materialIcon={{ type: 'MaterialCommunityIcons', name: 'pencil' }}
              size={24}
              color="white"
            />
          </Pressable>
        </Animated.View>
        <Animated.View style={rootStyle}>{children}</Animated.View>
      </View>
    </GestureDetector>
  );
}
