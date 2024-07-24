import Logo from "../../assets/gong.svg";
import { GENERAL } from "../../constants/locals/en-Us.constants";

export default function Header(): JSX.Element {
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

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
      </nav>
    </header>
  );
}
