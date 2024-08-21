import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchforgot } from '../../ReduxToolkit/AuthSlice';

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

export default function Forgot() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()

    const onSubmit=(data)=>{
        const data1={
            email:data.email,
            newPassword:data.newPassword,
            first_school:data.first_school
        }
        dispatch(fetchforgot(data1))
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
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                {...register("email",{required:"true"})}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email && "Email is required"}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                {...register("first_school",{required:"true"})}
                  required
                  fullWidth
                  id="first_school"
                  label="First School"
                  autoFocus
                  error={errors.first_school}
                  helperText={errors.first_school && "First school is required"}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                {...register("newPassword",{required:"true"})}
                  required
                  fullWidth
                  label="NewPassword"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  error={errors.newPassword}
                  helperText={errors.newPassword && "Password is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
                Submit
            </Button>
            <Grid container justifyContent="flex-end">

            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}