import * as React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { Toolbar } from '~/components/nativewindui/Toolbar';
import { cn } from '~/lib/cn';

export default function SelectingToolbar({
  hasSelectedAMessage,
}: {
  hasSelectedAMessage: boolean;
}) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute bottom-0 left-0 right-0">
      <Toolbar
        leftView={
          <Button size="sm" variant="plain">
            <Text className="text-primary">Read All</Text>
          </Button>
        }
        rightView={
          <Button size="sm" variant="plain" disabled={!hasSelectedAMessage}>
            <Text className={cn(!hasSelectedAMessage ? 'text-muted-foreground' : 'text-primary')}>
              Delete
            </Text>
          </Button>
        }
      />
    </Animated.View>
  );
}
