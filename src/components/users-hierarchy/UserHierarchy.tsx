import { useQuery } from "@tanstack/react-query";
import { fetchUsers, groupByManagerId } from "./users-hierarchy.service";
import { User } from "./user.types";
import UserNode from "./user-node/UserNode";
import { USER_HIERARCHY } from "../../constants/locals/en-Us.constants";
import Loading from "../shared/Loading";
import { useMemo } from "react";

export default function UserHierarchy(): JSX.Element {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const usersByManagers = useMemo(
    () => (users ? groupByManagerId(users) : null),
    [users]
  );

  return (
    <>
      <div className="flex p-2 text-start">
        <h2 className="text-2xl font-bold">{USER_HIERARCHY.TITLE}</h2>
      </div>
      {isPending && <Loading />}

      {users && usersByManagers && (
        <div className="flex flex-col text-start gap-4 p-2">
          {usersByManagers.root?.map((usr: User) => {
            return (
              <UserNode
                key={usr.id}
                user={usr}
                groupedByManagerId={usersByManagers}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
