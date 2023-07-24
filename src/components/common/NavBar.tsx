import React, {useContext} from 'react';
import {Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const NavBar = () => {
    const {isLogged, removeSession} = useContext(AuthContext)

    const handleOnLogout = () => {
      removeSession()
    }

    return (
        <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={{xs: 1, sm: 2, md: 4}}
            justifyContent="end"
            alignItems="center"
        >
            <NavLink to='/home' className='navbar-link'>Home</NavLink>
            {isLogged ? (
                <>
                    <NavLink to='/add-post' className='navbar-link'>Add Post</NavLink>
                    <NavLink to='/profile' className='navbar-link'>Profile</NavLink>
                    <div onClick={handleOnLogout} className='navbar-link'>Logout</div>
                </>
            ) : (
                <>
                    <NavLink to='/login' className='navbar-link'>Sing In</NavLink>
                    <NavLink to='/signup' className='navbar-link'>Sign Up</NavLink>
                </>
            )
            }
        </Stack>
    );
};

export default NavBar;