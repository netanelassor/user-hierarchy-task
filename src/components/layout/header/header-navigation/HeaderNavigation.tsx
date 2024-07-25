import { NavLink } from "react-router-dom";
import { NavItemType } from "./nav-item.types";
import { HEADER } from "../../../../constants/locals/en-Us.constants";

export default function HeaderNavigation(): JSX.Element {
  const SidebarList: NavItemType[] = [
    {
      name: HEADER.USER_HIERARCHY_NAV,
      routeName: "/",
    },
    {
      name: HEADER.ABOUT_NAV,
      routeName: "/about",
    },
  ];
  return (
    <div className="flex gap-6 text-sm text-violet-900">
      {SidebarList.map((navItem: NavItemType, index) => {
        return (
          <NavLink
            key={index}
            to={navItem.routeName}
            className={({ isActive, isPending }) =>
              `hover:font-bold ${
                isPending
                  ? "pending"
                  : isActive
                  ? "font-bold"
                  : ""
              }`
            }>
            {navItem.name}
          </NavLink>
        );
      })}
    </div>
  );
}
