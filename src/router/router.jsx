import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AllGroups from "../Pages/AllGroups/AllGroups";
import CreateGroup from "../Pages/CreateGroup/CreateGroup";
import MyGroups from "../Pages/MyGroups/MyGroups";
import UpdateGroup from "../Pages/UpdateGroup/UpdateGroup";
import ErrorPage from "../Pages/Error/ErrorPage";
import GroupDetails from "../Pages/GroUPDetails/GroupDetails";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "allGroups",
        Component: AllGroups,
      },
      {
        path: "group/:id",
        Component: GroupDetails,
      },
      {
        path: "createGroup",
        Component: CreateGroup,
      },
      {
        path: "myGroups",
        Component: MyGroups,
      },
      {
        path: "updateGroup/:id",
        Component: UpdateGroup,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);
