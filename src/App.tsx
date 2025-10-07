import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Dashboard from "./features/Dashboard";
import Notfound from "./features/Notfound";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import Inbox from "./features/Inbox";
import Home from "./features/Home";
import ForgotPassword from "./features/ForgotPassword";
import Login from "./features/Login";
// import Services from "./features/Services";
import { fetchUser } from "./api/api";
import { Suspense, useContext, useMemo, type JSX } from "react";
import RouteError from "./components/useRouteError ";
import { UserContext } from "./hooks/UserContext";
import ServiceStatus from "./features/ServiceStatus";
import { ManageServices } from "./features/ManageService";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children: JSX.Element;
}

// Protected Route component wrapper for data mode
const ProtectedRoute = ({
  isAuthenticated,
  redirectTo,
  children,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

const PublicOnlyRoute = ({
  isAuthenticated,
  redirectTo,
  children,
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

function App() {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("UserContext must be used within a UserProvider");

  const { user } = userContext;
  const isAuthenticated = Boolean(user);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
              path: "login",
              element: (
                <PublicOnlyRoute
                  isAuthenticated={isAuthenticated}
                  redirectTo="/admin"
                >
                  <Login />
                </PublicOnlyRoute>
              ),
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
          ],
        },
        {
          path: "admin",
          loader: fetchUser,
          errorElement: <RouteError />,
          element: (
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirectTo="/login"
            >
              <PrivateLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Navigate to="inbox" replace /> },
            { path: "home", element: <Home /> },
            { path: "inbox", element: <Inbox /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "services", element: <ManageServices /> },
            { path: "status", element: <ServiceStatus /> },
          ],
        },
        { path: "*", element: <Notfound /> },
      ]),
    [isAuthenticated]
  );

  console.log(isAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
