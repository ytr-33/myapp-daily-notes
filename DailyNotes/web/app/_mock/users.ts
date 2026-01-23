export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  updatedAt: string;
};

export const mockUsers: User[] = [
  {
    id: 1,
    name: "太郎",
    email: "taro@example.com",
    phone: "090-1234-5678",
    age: 28,
    updatedAt: "2026-01-20",
  },
  {
    id: 2,
    name: "花子",
    email: "hanako@example.com",
    phone: "090-8765-4321",
    age: 25,
    updatedAt: "2026-01-18",
  },
  {
    id: 3,
    name: "次郎",
    email: "jiro@example.com",
    phone: "090-5555-5555",
    age: 30,
    updatedAt: "2026-01-22",
  },
];

export const getUserById = (id: number) => mockUsers.find((user) => user.id === id);

export const getLatestUpdatedUser = () =>
  [...mockUsers].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
