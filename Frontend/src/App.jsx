import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Explore from './components/Explore'
import Broadcast from './components/BroadCast'
import MarketPlace from './components/MarketPlace'
import Profile from './components/Profile'
import Navbar from './components/Navbar'

const Layout = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/', '/signup'];
    const showNavbar = !hideNavbarRoutes.includes(location.pathname);
    
    return (
        <>
            {showNavbar && <Navbar />}
            <Outlet />
        </>
    );
};

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Login />
                },
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/signup",
                    element: <SignUp />
                },
                {
                    path: "/explore",
                    element: <Explore />
                },
                {
                    path: "/broadcast",
                    element: <Broadcast />
                },
                {
                    path: "/marketPlace",
                    element: <MarketPlace />
                },
                {
                    path: "/profile",
                    element: <Profile />
                }
            ]
        }
    ])
    
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
