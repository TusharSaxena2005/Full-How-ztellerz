import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Explore from './components/Explore'
import Broadcast from './components/BroadCast'
import MarketPlace from './components/MarketPlace'

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Login /></>
        },
        {
            path: "https://full-how-ztellerz-7doj.vercel.app/home",
            element: <><Home /></>
        },
        {
            path: "https://full-how-ztellerz-7doj.vercel.app/signUp",
            element: <><SignUp /></>
        },
        {
            path: "https://full-how-ztellerz-7doj.vercel.app/explore",
            element: <><Explore /></>
        },
        {
            path: "https://full-how-ztellerz-7doj.vercel.app/broadcast",
            element: <><Broadcast /></>
        },
        {
            path: "https://full-how-ztellerz-7doj.vercel.app/marketPlace",
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
