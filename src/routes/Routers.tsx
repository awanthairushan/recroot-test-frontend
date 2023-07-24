import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AddPost from "../pages/AddPost";
import Profile from "../pages/Profile";
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
            },
            {
                path: '/add-post',
                element: <AddPost/>
            },
            {
                path: '/profile',
                element: <Profile/>
            }
        ]
    };

    return useRoutes([MainRoutes])
}