import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import MainDashboard from "./pages/Dashboard";
import DashboardNav from "./components/DashboardNav";



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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: < RegistrationPage/>,
      },

    ],
  },
];

export default routers;
