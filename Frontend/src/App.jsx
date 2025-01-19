import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Explore from './components/Explore'
import Broadcast from './components/Broadcast'
import MarketPlace from './components/MarketPlace'

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Login /></>
        },
        {
            path: "/home",
            element: <><Home /></>
        },
        {
            path: "/signUp",
            element: <><SignUp /></>
        },
        {
            path: "/explore",
            element: <><Explore /></>
        },
        {
            path: "/broadcast",
            element: <><Broadcast /></>
        },
        {
            path: "/marketPlace",
            element: <><MarketPlace /></>
        }
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
