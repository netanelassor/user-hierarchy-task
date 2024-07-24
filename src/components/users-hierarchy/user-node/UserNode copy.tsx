import UserAvatar from "../../shared/UserAvatar";
import { User, UserMap } from "../user.types";
import { FaPlus, FaMinus } from "react-icons/fa";

type UserNodeProps = {
  user: User;
  employees: User[];
  groupedByManagerId: UserMap;
};
export default function UserNode({
  user,
  employees,
  groupedByManagerId
}: UserNodeProps): JSX.Element {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center gap-4 hover:bg-gray-800 p-4">
        <div>
          {employees ? <FaPlus/> : <FaMinus /> }
        </div>
        <UserAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          photo={user.photo || ""}
        />
        {user.firstName} {user.lastName} - {user.email}
      </div>

      {employees
        ? employees.map((employee, employeeIndex) => {
            return (
              <div className="px-12" key={employeeIndex}>
                <UserNode
                  user={employee}
                  employees={groupedByManagerId[employee.id]}
                  groupedByManagerId={groupedByManagerId}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}
