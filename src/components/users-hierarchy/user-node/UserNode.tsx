import { Button } from "flowbite-react";
import UserAvatar from "../../shared/UserAvatar";
import { User, UserMap } from "../user.types";
import { FaPlus, FaMinus, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import EditUserForm from "./EditUserForm";

type UserNodeProps = {
  user: User;
  groupedByManagerId: UserMap;
};
export default function UserNode({
  user,
  groupedByManagerId,
}: UserNodeProps): JSX.Element {
  const [isEditMode, setIsEditMode] = useState(false);


  return (
    <div className="flex flex-col h-full w-full">
      <div className={`flex items-center gap-4 hover:bg-gray-800 p-4 group ${isEditMode ? 'bg-gray-800' : null}`}>
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
            <Button outline pill gradientDuoTone="purpleToBlue" onClick={()=>setIsEditMode(!isEditMode)}>
              <FaPencilAlt className="h-4 w-4" />
            </Button>
            <Button outline pill gradientDuoTone="purpleToBlue">
              <FaRegTrashAlt className="h-4 w-4" />
            </Button>
          </div>
        </div> 
      </div>

      {user && isEditMode && <div className="flex flex-col p-4 bg-gray-800"><EditUserForm user={user} handleClose={() => setIsEditMode(false)}></EditUserForm></div>}

      {groupedByManagerId[user.id]
        ? groupedByManagerId[user.id].map((employee) => {
            return (
              <div className="px-12" key={employee.id}>
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
