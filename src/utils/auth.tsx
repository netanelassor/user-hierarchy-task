import { redirect } from "react-router-dom";
import { User } from "../components/users-hierarchy/user.types";

export function getLoggedInUser() {
  const loggedUser = localStorage.getItem("user");
  if (loggedUser) {
    const parsedUser: User = JSON.parse(loggedUser);
    return parsedUser;
  }
  return null;
}

export function setUserInLocalStorage(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
}

export function isLoggedIn(): boolean {
  return localStorage.getItem("user") !== null;
}

export function logout(): void {
  localStorage.removeItem("user");
}

export function isAuthValid() {
  if (!isLoggedIn()) {
    return redirect("/login");
  }
  return null;
}

export function isAuthValidLogin() {
  if (isLoggedIn()) {
    return redirect("/");
  }
  return null;
}


