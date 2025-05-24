import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../Pages/Home/Home";
import AllGroups from "../Pages/AllGroups/AllGroups";
import CreateGroup from "../Pages/CreateGroup/CreateGroup";
import MyGroups from "../Pages/MyGroups/MyGroups";
import UpdateGroup from "../Pages/UpdateGroup/UpdateGroup";
import GroupDetails from "../Pages/GroupDetails/GroupDetails";
import ErrorPage from "../Pages/Error/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AboutUs from "../Components/AboutUs/AboutUs";
import P_Overview from "../Components/P_Overview/P_Overview";
import Team from "../Components/Team/Team";
import Technologies from "../Components/Technologies/Technologies";
import PrivateRoute from "../Provider/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/allGroups",
        loader: () =>
          fetch("https://hobbyhub-server-steel.vercel.app/createGroup").then(
            (res) => res.json()
          ),
        element: <AllGroups />,
      },
      { path: "/group/:id", element: <GroupDetails /> },
      {
        path: "/createGroup",
        element: (
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "/myGroups",
        element: (
          <PrivateRoute>
            <MyGroups />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateGroup/:id",
        element: (
          <PrivateRoute>
            <UpdateGroup />
          </PrivateRoute>
        ),
      },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/P_Overview", element: <P_Overview /> },
      { path: "/team", element: <Team /> },
      { path: "/technologies", element: <Technologies /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },
]);
