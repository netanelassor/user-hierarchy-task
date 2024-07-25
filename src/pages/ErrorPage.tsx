import { useRouteError } from "react-router-dom";
import { ERROR_PAGE } from "../constants/locals/en-Us.constants";

export default function ErrorPage(): JSX.Element {
  const error: any = useRouteError();

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-full">
      <h1>{ERROR_PAGE.TITLE}</h1>
      <p>{ERROR_PAGE.MESSAGE}</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
