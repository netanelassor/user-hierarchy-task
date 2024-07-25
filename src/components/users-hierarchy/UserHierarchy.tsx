import { useQuery } from "@tanstack/react-query";
import { fetchUsers, groupByManagerId } from "./users-hierarchy.service";
import { User } from "./user.types";
import UserNode from "./user-node/UserNode";
import { USER_HIERARCHY } from "../../constants/locals/en-Us.constants";
import Loading from "../shared/Loading";

export default function UserHierarchy(): JSX.Element {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const usersByManagers = users ? groupByManagerId(users) : null;

  return (
    <>
      <div className="flex p-2 text-start">
        <h2 className="text-2xl font-bold">{USER_HIERARCHY.TITLE}</h2>
      </div>
      {isPending && <Loading />}

      {usersByManagers && (
        <div className="flex flex-col text-start gap-4 p-2">
          {usersByManagers.root?.map((usr: User, index) => {
              return (
                <UserNode
                  key={index}
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
