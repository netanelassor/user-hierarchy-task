export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  managerId?: string;
  photo?: string;
};

export type UserMap = {
  [key: string]: User[];
}



