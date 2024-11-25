import { Dimensions, TextStyle, ViewStyle } from 'react-native';

import { createContextItem } from '~/components/nativewindui/ContextMenu/utils';

export const ITEMS = [
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
export const CONTEXT_MENU_ITEMS = [
  createContextItem({
    actionKey: 'hide-alerts',
    title: 'Edit Property',
    icon: { name: 'pencil' },
  }),
  createContextItem({
    actionKey: 'delete',
    title: 'Delete',
    icon: { name: 'trash-can-outline', color: 'red' },
    destructive: true,
  }),
];
export const TIME_STAMP_WIDTH = 96;

export const TIMESTAMP_CONTAINER_STYLE = {
  maxWidth: TIME_STAMP_WIDTH,
};
export const TEXT_STYLE: TextStyle = {
  paddingRight: TIME_STAMP_WIDTH,
};

export const dimensions = Dimensions.get('window');

export const BUTTON_WIDTH = 75;

export const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const ACTION_BUTTON_STYLE: ViewStyle = {
  width: BUTTON_WIDTH,
};

export function noop() {}
export function getInitials(name: string): string {
  const nameParts = name.trim().split(/\s+/);
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  if (nameParts.length === 1) {
    return firstInitial;
  }
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}
