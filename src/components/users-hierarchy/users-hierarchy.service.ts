import { ENDPOINT } from "../../constants/endpoints.constants";
import { User, UserMap } from "./user.types";

export async function fetchUsers({ signal }: any): Promise<User[] | null> {
  const response = await fetch(`${ENDPOINT.getUsers}`, { signal });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const {users} = await response.json();
  return users;
}

export async function fetchUser(id:number): Promise<User | null> {
  const response = await fetch(`${ENDPOINT.getUsers}/${id}`);

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const {user} = await response.json();
  return user;
}

export function groupByManagerId(users: User[] = []): UserMap {
  const gropedByUsers = users.reduce((usrMap, usr) => {
    const managerId = usr.managerId || "root";
    if (managerId) {
      if (!usrMap[managerId]) {
        usrMap[managerId] = [];
      }
      usrMap[managerId].push(usr);
    }
    return usrMap;
  }, {} as UserMap);

  return gropedByUsers;
}
