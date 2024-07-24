export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  managerId?: string;
  photo?: string;
};

export type UserMap = {
  [key: string]: User[];
}



