import React, {useContext} from 'react';
import {Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const NavBar = () => {
    const {isLogged, setIsLogged} = useContext(AuthContext)

    const handleOnLogout = () => {
      setIsLogged(false)
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
                    <NavLink to='/addpost' className='navbar-link'>Add Post</NavLink>
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