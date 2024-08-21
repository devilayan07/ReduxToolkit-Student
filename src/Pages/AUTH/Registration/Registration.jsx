import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchregister } from '../../ReduxToolkit/AuthSlice';
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Registration() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const{status}=useSelector(state=>state.AUTH)
    console.log(status)
    const[Image,setImage]=useState()
    const dispatch=useDispatch()



    const onSubmit=(data)=>{
        const formdata=new FormData()
        formdata.append("name",data.name)
        formdata.append("email",data.email)
        formdata.append("first_school",data.first_school)
        formdata.append("mobile",data.mobile)
        formdata.append("password",data.password)
        formdata.append("image",data.image[0])
        dispatch(fetchregister(formdata))

    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                {...register("name",{required:true,maxLength:20})}
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  error={errors.name}
                  helperText={errors.name && "Name is required"}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("email",{required:"true"})}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={errors.email}
                  helpertext={errors.email && "Email is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("mobile",{required:"true"})}
                  required
                  fullWidth
                  label="Mobile"
                  type="number"
                  id="mobile"
                  error={errors.mobile}
                  helperText={errors.mobile && "Mobile number is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("first_school",{required:"true"})}
                  required
                  fullWidth
                  label="First-School"
                  id="first_school"
                  error={errors.first_school}
                  helperText={errors.first_school && "First School is required"}
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                {...register("password",{required:"true"})}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors.password}
                  helperText={errors.password && "Password is required"}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
              {...register("image",{required:"true"})}
              variant='outlined'
              margin='normal'
              fullWidth
              type='file'
              error={!Image && !!errors.image}
              helperText={!Image && errors.image && "Image is required"}
              onChange={(e)=>setImage(e.target.files[0])}
              />

              {Image &&  (
                <img src={URL.createObjectURL(Image)} alt=""
                className="upload-img"
                style={{height:"180px"}}

                />
              ) }


              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {
              status==="idle" ?(
                <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
  
              ):(
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Loading...
              </Button>
  

              )
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}