import {isRouteErrorResponse, useRouteError} from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        {/*lesson 9 variant 1*/}
        {/*<h2>{error.statusText || "Something went wrong!"}</h2>*/}

        {/*lesson 9 variant 2*/}
        <h2>{error.data.message || "Something went wrong!"}</h2>
        <h3>{error.data.reason}</h3>
      </div>
    )
  }

  // return "Something went wrong!";
  throw error
}

export {ErrorPage}