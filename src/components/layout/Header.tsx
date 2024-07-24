import Logo from "../../assets/gong.svg";
import { GENERAL } from "../../constants/locals/en-Us.constants";
import { FaSignOutAlt } from "react-icons/fa";

export default function Header(): JSX.Element {
  const loggedInUser: any = {
    firstName: "Nati",
    lastName: "Assor",
  };
  return (
    <header className="fixed w-full top-0 bg-white shadow">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="flex gap-2 items-center">
            <img className="h-8 w-auto" src={Logo} alt="" />
            <span className="text-xl text-violet-700 font-bold">
              {GENERAL.COMPANY_NAME.toUpperCase()}
            </span>
          </a>
        </div>

        <div className="text-gray-900">{GENERAL.HEADER_TITLE}</div>

        <div className="flex flex-1 justify-end text-gray-900 gap-4">
          <div className="flex">{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"
          >
            <span aria-hidden="true">
              <FaSignOutAlt />
            </span>
            <span>{GENERAL.LOG_OUT} </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
