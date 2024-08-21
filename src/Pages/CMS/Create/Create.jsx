import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcreate } from '../../ReduxToolkit/CreateSlice';

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

export default function Create() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const{status}=useSelector(state=>state.Create)
    console.log(status)
    const[Image,setImage]=useState()
    const dispatch=useDispatch()

    const onSubmit=(data)=>{
      const formdata=new FormData()
      formdata.append("name",data.name)
      formdata.append("price",data.price)
      formdata.append("description",data.description)
      formdata.append("brand",data.brand)
      formdata.append("image",data.image[0])
      dispatch(fetchcreate(formdata))
        
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
          <Typography component="h1" variant="h5">
            Create Product
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                {...register("name",{required:"true"})}
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
              <Grid item xs={12} >
                <TextField
                {...register("price",{required:"true"})}
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  error={errors.price}
                  helperText={errors.price && "Price is required"}
                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                {...register("description",{required:"true"})}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  error={errors.description}
                  helperText={errors.description && "Description is required"}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                {...register("brand",{required:"true"})}
                  required
                  fullWidth
                  id="brand"
                  label="Brand"
                  error={errors.brand}
                  helperText={errors.brand && "Brand is required"}
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
              {
                status==="idle"?(
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit(onSubmit)}
                >
                    Submit
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


            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}