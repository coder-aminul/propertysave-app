import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';
import * as React from 'react';
import { Platform } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { DropdownMenu } from '~/components/nativewindui/DropdownMenu';
import { createDropdownItem } from '~/components/nativewindui/DropdownMenu/utils';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

export function LeftView({
  isSelecting,
  setIsSelecting,
}: {
  isSelecting: boolean;
  setIsSelecting: (value: boolean) => void;
}) {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  const dropdownItems = React.useMemo(() => {
    return [
      createDropdownItem({
        actionKey: 'go-home',
        title: 'Go Home',
        icon: { name: 'home' },
      }),
      createDropdownItem({
        actionKey: 'select-messages',
        title: 'Select Properties',
        icon: { name: 'checkmark.circle', namingScheme: 'sfSymbol' },
      }),
      // createDropdownItem({
      //   actionKey: 'toggle-theme',
      //   title: 'Toggle Theme',
      //   icon: { name: isDarkColorScheme ? 'moon.stars' : 'sun.min', namingScheme: 'sfSymbol' },
      // }),
    ];
  }, [isDarkColorScheme]);

  function onItemPress({ actionKey }: { actionKey: string }) {
    if (actionKey === 'go-home') {
      router.push('../');
      return;
    }
    if (actionKey === 'toggle-theme') {
      toggleColorScheme();
      return;
    }
    if (actionKey === 'select-messages') {
      setIsSelecting(true);
      return;
    }
    console.log('NOT IMPLEMENTED');
  }

  if (isSelecting) {
    return (
      <Button
        variant="plain"
        size="md"
        className="ios:px-0 px-2 py-1"
        onPress={() => setIsSelecting(false)}>
        <Text className="font-normal text-primary">Done</Text>
      </Button>
    );
  }
  return (
    <DropdownMenu items={dropdownItems} onItemPress={onItemPress}>
      <Button variant="plain" size="md" className="ios:px-0 px-2 py-1">
        <Text className="font-normal text-primary">Edit</Text>
      </Button>
    </DropdownMenu>
  );
}

export function rightView() {
  return <RightView />;
}

function RightView() {
  const { colors } = useColorScheme();
  return (
    <Button size="icon" variant="plain" className="ios:justify-end">
      <Icon
        size={24}
        name="pencil-box-outline"
        color={Platform.select({ ios: colors.primary, default: colors.foreground })}
      />
    </Button>
  );
}
