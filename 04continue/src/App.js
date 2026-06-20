import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { Provider } from "react-redux";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import ErrorHome from "./components/ErrorHome";
import ResturantMenu from "./components/ResturantMenu";

import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";

import {
  LocationProvider,
} from "./context/LocationContext";

const App = () => {
  const [userName, setUserName] =
    useState("Ayush");

  const [email, setEmail] =
    useState(
      "ayushkant2807@gmail.com"
    );

  return (
    <div
      id="parent"
      className="app"
    >
      <Provider store={appStore}>
        <LocationProvider>
          <UserContext.Provider
            value={{
              userName,
              setUserName,
              email,
              setEmail,
            }}
          >
            <Header />

            <Outlet />

            <Footer />
          </UserContext.Provider>
        </LocationProvider>
      </Provider>
    </div>
  );
};

const appRouter =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,

      errorElement:
        <ErrorHome />,

      children: [
        {
          path: "/",
          element: <Body />,
        },

        {
          path: "/about",
          element: <About />,
        },

        {
          path:
            "/resturants/:resId",

          element:
            <ResturantMenu />,
        },
      ],
    },
  ]);

const root =
  ReactDOM.createRoot(
    document.getElementById(
      "root"
    )
  );

root.render(
  <RouterProvider
    router={appRouter}
  />
);