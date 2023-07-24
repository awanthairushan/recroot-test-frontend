import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import './profile.css'
import {DataContext} from "../contexts/DataContext";
import {UserType} from "../types/types";
import {AuthContext} from "../contexts/AuthContext";

const Profile = () => {
    const {getData} = useContext(DataContext)
    const {userId} = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState<UserType | null>(null);

    useEffect(() => {
        const connect = async () => {
            if (getData) {
                getData('/api/user/current/' + userId).then((response: any) => {
                        if (response?.data?.data) {
                            setUserDetails(response?.data?.data?.user)
                        }
                    }
                )
            }
        }
        connect();
    }, [getData])
    return (
        <Grid container justifyContent='center'>
            <div className='profile-section-header'>
                My Profile
            </div>
            <Grid container item xs={12} py={2}>
                <Grid item xs={6}>
                    <div className='profile-content'>
                        <b>Username : </b> {userDetails?.username}
                    </div>
                    <div className='profile-content'>
                        <b>Email : </b>{userDetails?.email}
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='profile-image'>
                        <img width='300px' src={userDetails?.profilePictureLink} alt='Profile'/>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;