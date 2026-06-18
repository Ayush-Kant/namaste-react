import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import ErrorHome from "./components/ErrorHome";
import ResturantMenu from "./components/ResturantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
    const [userName, setUserName] = useState("Ayush")
    const [email, setEmail] = useState("ayushkant2807@gmail.com")

    return (
        
        <div id="parent" className="app">
        <Provider store={appStore}>
            <UserContext.Provider value={{userName, setUserName, email, setEmail}}>
            <Header/>
            <Outlet />
            <Footer/> 
             </ UserContext.Provider> 
        </Provider>
        </div>
       
        
    )
};
const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorHome />,
            children: [
                {
                    path: "/",
                    element: <Body/>

                },
                {
                    path: "/about",
                    element: <About/>
                },
                {
                    path: "/resturants/:resId",
                    element: <ResturantMenu/>
                }
            ]
        }
        // {
        //     path: "/about",
        //     element: <About />
        // }
    ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter} />);