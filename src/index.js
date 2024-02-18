import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ErrorPage from "./Components/Error-Page";
import Home from "./Components/Home/Home";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import LoginPage from "./Components/LoginLogout/LoginPage";
import { AuthProvider } from "./Components/auth/useAuth";
import ConsolePage from "./Components/Console/Console";
import TwilioCreds from "./Components/TwilioCreds/TwilioCreds";
import Numbers from "./Components/Numbers/Numbers";
import Assets from "./Components/Assets/Assets";
import CallLogs from "./Components/CallLogs/CallLogs";
import Clients from "./Components/Clients/Clients";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Console",
        element: <ConsolePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/TwilioCreds",
        element: <TwilioCreds />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Numbers",
        element: <Numbers />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Assets",
        element: <Assets />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/CallLogs",
        element: <CallLogs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Clients",
        element: <Clients />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
