import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header";
import {Grid} from "@mui/material";
import './layout.css';

const Layout = () => {
    return (
        <Grid className='layout'>
            <Header/>
            <Outlet/>
        </Grid>
    );
};

export default Layout;