import React from 'react';
import {Grid} from "@mui/material";
import PostSection from "../components/home/post-section/PostSection";

const HomePage = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <PostSection/>
            </Grid>
        </Grid>
    );
};

export default HomePage;