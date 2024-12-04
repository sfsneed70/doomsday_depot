import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import App from "./App.jsx";
import Home from "./pages/Home";
// import Blog from "./pages/SingleBlog";
// import Profile from "./pages/Profile";
// import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WeaponsPage from "./pages/WeaponsPage";
import ShopDisplay from "./pages/ShopDisplay.js";

const staticRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/shop", element: <ShopDisplay /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
];

const DynamicRoutes: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading routes...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  const categoryRoutes = data.categories.map((category: { id: string; name: string }) => ({
    path: `/category/${category.name}`,
    element: <CategoryPage />,
  }));

  const router = createBrowserRouter([...staticRoutes, ...categoryRoutes]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <DynamicRoutes />
  </ApolloProvider>
);



