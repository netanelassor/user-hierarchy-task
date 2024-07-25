import { Button } from "flowbite-react";
import UserAvatar from "../../shared/UserAvatar";
import { User, UserMap } from "../user.types";
import { FaPlus, FaMinus, FaPencilAlt } from "react-icons/fa";

type UserNodeProps = {
  user: User;
  groupedByManagerId: UserMap;
};
export default function UserNode({
  user,
  groupedByManagerId,
}: UserNodeProps): JSX.Element {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center gap-4 hover:bg-gray-800 p-4 group">
        <div>{groupedByManagerId[user.id] ? <FaPlus /> : <FaMinus />}</div>
        <UserAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          photo={user.photo || ""}
        />
        <div className="flex gap-2">
          {user.firstName} {user.lastName} <span>|</span>
          <a
            className="underline text-indigo-400"
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        </div>
        <div className="flex justify-end items-center flex-1">
          <div className="hidden group-hover:flex">
            <Button outline pill gradientDuoTone="purpleToBlue">
              <FaPencilAlt className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {groupedByManagerId[user.id]
        ? groupedByManagerId[user.id].map((employee, employeeIndex) => {
            return (
              <div className="px-12" key={employeeIndex}>
                <UserNode
                  user={employee}
                  groupedByManagerId={groupedByManagerId}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}
