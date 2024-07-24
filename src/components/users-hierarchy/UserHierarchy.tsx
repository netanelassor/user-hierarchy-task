import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./users-hierarchy.service";
import { User } from "./user.types";
import UserNode from "./user-node/UserNode";
import { USER_HIERARCHY } from "../../constants/locals/en-Us.constants";
import Loading from "../shared/Loading";

export default function UserHierarchy(): JSX.Element {
  const { data: usersGroupedByManagerId, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <>
      <div className="flex p-2 text-start">
        <h2 className="text-2xl font-bold">{USER_HIERARCHY.TITLE}</h2>
      </div>
      {isPending && <Loading />}

      {usersGroupedByManagerId && (
        <div className="flex flex-col text-start gap-4 p-2">
          {usersGroupedByManagerId["root"]?.map((usr: User, index) => {
              return (
                <UserNode
                  key={index}
                  user={usr}
                  groupedByManagerId={usersGroupedByManagerId}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
