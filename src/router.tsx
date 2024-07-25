import { createBrowserRouter } from "react-router-dom";
import { AboutPage, LoginPage, RootPage, UserHierarchyPage, ErrorPage } from "./pages";
import { isAuthValid, isAuthValidLogin } from "./utils/auth";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: isAuthValid,
    children: [
      {
        path: "/",
        element: <UserHierarchyPage />,
        loader: isAuthValid
      },
      {
        path: "/about",
        element: <AboutPage />,
        loader: isAuthValid
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    loader: isAuthValidLogin,
  },
]);