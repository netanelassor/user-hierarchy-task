import { createBrowserRouter } from "react-router-dom";
import { AboutPage, RootPage, UserHierarchyPage } from "./pages";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/users-tree",
        element: <UserHierarchyPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);
