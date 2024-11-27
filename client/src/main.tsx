import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Blog from "./pages/SingleBlog";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/blog/:blogId",
        element: <Blog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-blog/:blogId",
        element: <Edit />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
