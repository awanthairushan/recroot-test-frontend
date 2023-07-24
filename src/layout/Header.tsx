import React from 'react';
import {Grid} from "@mui/material";
import './header.css'
import NavBar from "../components/common/NavBar";

const Header = () => {
    return (
        <Grid container justifyContent='end' className='navbar-section'>
            <NavBar/>
        </Grid>
    );
};

export default Header;