'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {FormControl, FormHelperText} from "@mui/material";
import {ApiResponse} from "@/lib/models/api-response";
import {API_URL} from "@/lib/constants";
import {redirect} from 'next/navigation'

export default function SignIn() {
    const defaultErrors = {email: '', password: ''}
    const [errors, setErrors] = useState(defaultErrors);
    const [authResult, setAuthResult] = useState({} as ApiResponse);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setAuthResult({} as ApiResponse)
        setErrors(defaultErrors)
        fetch(`${API_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        }).then(res => res.json())
        .then((res) => setAuthResult(res))
    };

    useEffect(() => {
        if(!authResult.statusCode){
            setErrors(defaultErrors)
        }
        if (authResult.statusCode >= 400) {
            const mappedErrors = authResult.message?.reduce((acc, it) => {
                acc[it.property] = it.constraint;
                return acc;
            }, {} as Record<string, string>)
            setErrors({...errors, ...mappedErrors});
        }
        if(authResult.statusCode === 200) {
            return redirect('/')
        }
    }, [authResult])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={(e)=>handleSubmit(e)} noValidate sx={{mt: 1}}>
                    <FormControl fullWidth error={errors["email"].length > 0} variant="standard">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            error={errors["email"].length > 0}
                            autoFocus
                        />
                        {errors["email"].length > 0 && (<FormHelperText id="component-error-text">{errors["email"]}</FormHelperText>)}
                    </FormControl>
                    <FormControl fullWidth error={errors["password"].length > 0} variant="standard">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={errors["password"].length > 0}
                        />
                        {errors["password"].length > 0 && (
                            <FormHelperText id="component-error-text">{errors["password"]}</FormHelperText>)}
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}