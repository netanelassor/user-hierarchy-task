import Logo from "../../../assets/gong.svg";
import { FaSignOutAlt } from "react-icons/fa";
import HeaderNavigation from "./header-navigation/HeaderNavigation";
import { GENERAL, HEADER } from "../../../constants/locals/en-Us.constants";

export default function Header(): JSX.Element {
  const loggedInUser: any = {
    firstName: "Nati",
    lastName: "Assor",
  };

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
          <div className="flex flex-1 justify-end text-gray-900 gap-4">
            <div className="flex">{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</div>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"
            >
              <span aria-hidden="true">
                <FaSignOutAlt />
              </span>
              <span>{HEADER.LOG_OUT} </span>
            </a>
          </div>
        </div>
        
      </nav>
    </header>
  );
}
