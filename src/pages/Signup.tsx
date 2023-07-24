import React, {useContext, useState} from 'react';
import {Formik, useFormik} from 'formik';
import * as yup from 'yup';
import {Button, FormHelperText, Grid, OutlinedInput, Stack} from "@mui/material";
import './auth.css'
import {DataContext} from "../contexts/DataContext";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const {postData} = useContext(DataContext)
    const validationSchema = yup.object({
        username: yup.string().max(255),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(8, 'Password is too short')
            .max(16, 'password is too large')
            .required('Password is required'),
        file: yup.mixed().required("File is required")
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            file: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values: any) => {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("file", values.file.target.files[0]);
            if (postData) {
                postData("/api/user/register", formData).then((response: any) => {
                    if (response?.status === 201) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: response?.data?.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/login')
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
                <div className='auth-section-header'>Register</div>
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
                            id="email"
                            type="text"
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            placeholder="Email Address"
                            fullWidth
                            size='medium'
                            className='form-input'
                            error={Boolean(formik.touched.email && formik.errors.email)}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <FormHelperText error id="helper-text-email">
                                {formik.errors.email}
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
                    <Stack spacing={1}>
                        {/*<OutlinedInput*/}
                        {/*    id="file"*/}
                        {/*    type="file"*/}
                        {/*    value={formik.values.file}*/}
                        {/*    name="file"*/}
                        {/*    onChange={formik.handleChange}*/}
                        {/*    placeholder="file"*/}
                        {/*    fullWidth*/}
                        {/*    size='medium'*/}
                        {/*    className='form-input'*/}
                        {/*    error={Boolean(formik.touched.file && formik.errors.file)}*/}
                        {/*/>*/}
                        <input
                            id="file"
                            type="file"
                            name="file"
                            accept="image/gif, image/jpeg, image/png"
                            className='form-input'
                            onChange={(event) => {
                                if (event) {
                                    formik.setFieldValue(
                                        'file',
                                        event
                                    )
                                } else {
                                    formik.setErrors({file: "File is required"})
                                }
                            }}
                        />
                        {formik.touched.file && formik.errors.file && (
                            <FormHelperText error id="helper-text-file">
                                {formik.errors.file}
                            </FormHelperText>
                        )}
                    </Stack>
                    <Button variant='contained' color='success' type='submit'>
                        Register
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}
    ;

    export default Signup;