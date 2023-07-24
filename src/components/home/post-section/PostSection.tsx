import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import './post-section.css'
import {DataContext} from "../../../contexts/DataContext";
import {PostType} from "../../../types/types";
import {DateTime} from "luxon";

const PostSection = () => {
    const {getData} = useContext(DataContext)

    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const connect = async () => {
            if (getData) {
                getData('/api/post').then((response: any) => {
                    if (response?.data?.data) {
                        setPosts(response?.data?.data)
                    }
                })
            }
        }
        connect();
    }, [getData])


    return (
        <Grid container justifyContent='center' className='post-section'>
            <div className='post-section-header'>
                POSTS
            </div>
            {posts.map((post: PostType, index: number) => (
                <Grid item xs={12} py={2} key={index}>
                    <div className='post-header'>
                        {post.header}
                    </div>
                    <div className='post-content'>
                        {post.body}
                    </div>
                    <div className='post-content'>
                       Author: {post.authorName}
                    </div>
                    <div className='post-content'>
                        Posted date: {
                        post.postedDate ?
                            DateTime.fromSeconds(post.postedDate).toFormat("y-LL-dd") : ""
                    }
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

export default PostSection;