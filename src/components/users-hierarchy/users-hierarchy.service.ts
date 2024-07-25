import { ENDPOINT } from "../../constants/endpoints.constants";
import { User, UserMap } from "./user.types";

export async function fetchUsers({ signal }:any): Promise<User[] | null> {
  const response = await fetch(`${ENDPOINT.getUser}.json`, { signal });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const userList = await response.json();
  return userList;
}


export function groupByManagerId(users: User[]): UserMap {
  return users.reduce((usrMap, usr) => {
    const managerId = usr.managerId || "root";
    if (managerId) {
      if (!usrMap[managerId]) {
        usrMap[managerId] = [];
      }
      usrMap[managerId].push(usr);
    }
    return usrMap;
  }, {} as UserMap);
}
