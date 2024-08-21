import  React,{useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlogin } from '../../ReduxToolkit/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

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

export default function Login() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const{status,redirectTo}=useSelector(state=>state.AUTH)
    const navigate=useNavigate()
    console.log(status)
    const dispatch=useDispatch()

    const onSubmit=(data)=>{
        const data1={
            email:data.email,
            password:data.password
        }
        dispatch(fetchlogin(data1))
    }

 useEffect(()=>{
  const RedirectUser=()=>{
    const token=localStorage.getItem("token")
    let isLoginPage=window.location.pathname.toLowerCase()==="/login"
    if(token!==null && token!==undefined && token!==""){
      isLoginPage && navigate("/")
    }
  }
  RedirectUser()
 },[navigate,redirectTo])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
              {...register("email",{required:"true"})}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={errors.email}
                helperText={errors.email && "Email is required"}
                autoFocus
              />
              <TextField
              {...register("password",{required:"true"})}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                error={errors.password}
                helperText={errors.password && "Password is required"}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {
                status==="idle" ? (
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
    
                ):(
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Loading....
                  </Button>
    
                )
              }
              <Grid container>
                <Grid item xs>
                  <Link to={"/forgot"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link   to={"/register"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}