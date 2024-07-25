import Logo from "../../../assets/gong.svg";
import { FaSignOutAlt } from "react-icons/fa";
import HeaderNavigation from "./header-navigation/HeaderNavigation";
import { GENERAL, HEADER } from "../../../constants/locals/en-Us.constants";
import { User } from "../../users-hierarchy/user.types";
import { getLoggedInUser, logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Header({}): JSX.Element {
  const navigate = useNavigate();

  const loggedInUser: User | null = getLoggedInUser();

  function handleLogOut(): void {
    logout();
    navigate('/');
  }

  return (
    <header className="fixed w-full top-0 bg-white shadow">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8 gap-8">
        <div className="flex">
          <a href="#" className="flex gap-2 items-center">
            <img className="h-8 w-auto" src={Logo} alt="" />
            <span className="text-xl text-violet-700 font-bold">
              {GENERAL.COMPANY_NAME.toUpperCase()}
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <HeaderNavigation />
          {loggedInUser && (
            <div className="flex flex-1 justify-end text-gray-900 gap-4">
              <div className="flex">{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</div>
              <button
                className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
                onClick={handleLogOut}
              >
                <span aria-hidden="true">
                  <FaSignOutAlt />
                </span>
                <span>{HEADER.LOG_OUT} </span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
