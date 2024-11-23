// src/data.ts
export type Person = {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  email: string;
  dueDate: string;
  amount: number;
  status: string;
};

export const defaultData = [
  {
    id: '62447',
    name: 'Francis Sanford MD',
    userName: 'George33',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    email: 'Marya.Barrow@yahoo.com',
    dueDate: '2023-10-18T13:24:00.760Z',
    amount: 544,
    status: 'Paid',
  },
  {
    id: '46291',
    name: 'Nina Taylor',
    userName: 'Nina89',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    email: 'Nina.Taylor@yahoo.com',
    dueDate: '2023-11-10T10:44:00.760Z',
    amount: 320,
    status: 'Pending',
  },
  // Add more data if needed
];
