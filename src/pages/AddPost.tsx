import React, {useContext} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, FormHelperText, Grid, OutlinedInput, Stack} from "@mui/material";
import './auth.css'
import {DataContext} from "../contexts/DataContext";
import Swal from "sweetalert2";
import {DateTime} from "luxon";
import {AuthContext} from "../contexts/AuthContext";

const AddPost = () => {
        const {postData} = useContext(DataContext)
        const {userId} = useContext(AuthContext)
        const validationSchema = yup.object({
            header: yup.string().max(255).required('Header is required'),
            body: yup.string().required('Body is required'),
            authorName: yup.mixed().required("Author Name is required")
        });

        const formik = useFormik({
            initialValues: {
                header: '',
                body: '',
                authorName: '',
            },
            validationSchema: validationSchema,
            onSubmit: async (values: any) => {
                const data = {
                    header: values.header,
                    body: values.body,
                    postedDate: DateTime.now().toUnixInteger(),
                    authorName: values.authorName,
                    userId: userId
                }
                if (postData) {
                    postData("/api/post", data).then((response: any) => {
                        if (response?.status === 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: response?.data?.message,
                                showConfirmButton: false,
                                timer: 2000
                            })
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
                    <div className='auth-section-header'>POST</div>
                </Grid>
                <Grid item xs={8}>
                    <form onSubmit={formik.handleSubmit} className='contact-form'>
                        <Stack spacing={1}>
                            <OutlinedInput
                                id="header"
                                type="text"
                                value={formik.values.header}
                                name="header"
                                onChange={formik.handleChange}
                                placeholder="Header"
                                fullWidth
                                size='medium'
                                className='form-input'
                                error={Boolean(formik.touched.header && formik.errors.header)}
                            />
                            {formik.touched.header && formik.errors.header && (
                                <FormHelperText error id="helper-text-header">
                                    {formik.errors.header}
                                </FormHelperText>
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            <OutlinedInput
                                id="body"
                                type="text"
                                multiline
                                rows={6}
                                value={formik.values.body}
                                name="body"
                                onChange={formik.handleChange}
                                placeholder="Body"
                                fullWidth
                                size='medium'
                                className='form-input'
                                error={Boolean(formik.touched.body && formik.errors.body)}
                            />
                            {formik.touched.body && formik.errors.body && (
                                <FormHelperText error id="helper-text-body">
                                    {formik.errors.body}
                                </FormHelperText>
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            <OutlinedInput
                                id="authorName"
                                type="text"
                                value={formik.values.authorName}
                                name="authorName"
                                onChange={formik.handleChange}
                                placeholder="Author name"
                                fullWidth
                                size='medium'
                                className='form-input'
                                error={Boolean(formik.touched.authorName && formik.errors.authorName)}
                            />
                            {formik.touched.authorName && formik.errors.authorName && (
                                <FormHelperText error id="helper-text-password">
                                    {formik.errors.authorName}
                                </FormHelperText>
                            )}
                        </Stack>
                        <Button variant='contained' color='success' type='submit'>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
;

export default AddPost;