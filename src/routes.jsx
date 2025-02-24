import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

const routers = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];

export default routers;
