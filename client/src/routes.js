import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import Register from "src/pages/Register";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import ViewPost from "./pages/ViewPost";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "explore", element: <Explore /> },
      { path: "author/:authorID", element: <Profile /> },
      { path: "author/:authorID/post/:postID", element: <ViewPost /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" replace={true} /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
];

export default routes;
