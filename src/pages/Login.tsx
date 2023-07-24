import React, {useContext, useState} from 'react';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import {Button, FormHelperText, Grid, OutlinedInput, Stack} from "@mui/material";
import './auth.css'
import {DataContext} from "../contexts/DataContext";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";

const Login = () => {
        const navigate = useNavigate();
        const {postData} = useContext(DataContext)
        const {setIsLogged} = useContext(AuthContext)
        const validationSchema = yup.object({
            username: yup.string().max(255),
            password: yup.string().min(8, 'Password is too short')
                .max(16, 'password is too large')
                .required('Password is required'),
        });

        const formik = useFormik({
            initialValues: {
                username: '',
                password: ''
            },
            validationSchema: validationSchema,
            onSubmit: async (values: any) => {
                const data = {
                    "username": values.username,
                    "password": values.password
                }
                if (postData) {
                    postData("/api/user/login", data).then((response: any) => {
                        if (response?.status === 200) {
                            setIsLogged(true)
                            navigate('/home')
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: response?.data?.message,
                                showConfirmButton: false,
                                timer: 4000
                            })
                        }
                    })
                }
            }
        });

        return (
            <Grid container justifyContent='center'>
                <Grid container justifyContent='center'>
                    <div className='auth-section-header'>Sign In</div>
                </Grid>
                <Grid item xs={8}>
                    <form onSubmit={formik.handleSubmit} className='contact-form'>
                        <Stack spacing={1}>
                            <OutlinedInput
                                id="username"
                                type="text"
                                value={formik.values.username}
                                name="username"
                                onChange={formik.handleChange}
                                placeholder="Username"
                                fullWidth
                                size='medium'
                                className='form-input'
                                error={Boolean(formik.touched.username && formik.errors.username)}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <FormHelperText error id="helper-text-username">
                                    {formik.errors.username}
                                </FormHelperText>
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            <OutlinedInput
                                id="password"
                                type="password"
                                value={formik.values.password}
                                name="password"
                                onChange={formik.handleChange}
                                placeholder="Password"
                                fullWidth
                                size='medium'
                                className='form-input'
                                error={Boolean(formik.touched.password && formik.errors.password)}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <FormHelperText error id="helper-text-password">
                                    {formik.errors.password}
                                </FormHelperText>
                            )}
                        </Stack>
                        <Button variant='contained' color='success' type='submit'>
                            Sign In
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
;

export default Login;