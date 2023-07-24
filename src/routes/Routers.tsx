import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
export default function Routers() {
    const MainRoutes = {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/home',
                element: <HomePage/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    };

    return useRoutes([MainRoutes])
}