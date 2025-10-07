import { useRouteError, isRouteErrorResponse } from "react-router";

const RouteError = () => {
  const error = useRouteError();

  console.error("Route error:", error); // Optional for debugging

  // Handle known route error responses (from `throw json()`)
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <pre>{error.data.message}</pre>}
      </div>
    );
  }

  // Handle general JS errors or Axios errors
  if (error instanceof Error) {
    return (
      <div>
        <h1>Unexpected Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  // Fallback UI
  return (
    <div>
      <h1>Unknown Error</h1>
      <p>Something went wrong, and we couldn't identify the problem.</p>
    </div>
  );
};

export default RouteError;
