import  React, { useEffect, useState } from 'react';
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
import { fetchdetail, fetchupdate } from '../../ReduxToolkit/ProductSlice';
import { useParams } from 'react-router-dom';

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

export default function Update() {
    const{id}=useParams()
    console.log(id)
    const{register,handleSubmit,setValue,formState:{errors}}=useForm()
    const[image,setImage]=useState(null)
    const[form,setFormData]=useState({})
    const{detail}=useSelector(state=>state.Product)
    console.log(detail)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(fetchdetail(id))
    },[dispatch,id])

    useEffect(()=>{
        if(detail){
            setValue("name",detail.name)
            setValue("description",detail.description)
            setValue("brand",detail.brand)
            setValue("price",detail.price)
            setFormData(detail)


        }

    },[detail,setValue])

    const onSubmit=(data)=>{
        const formdata=new FormData()
        formdata.append("name",data?.name)
        formdata.append("description",data?.description)
        formdata.append("price",data?.price)
        formdata.append("brand",data?.brand)
        formdata.append("image",data?.image[0])
        formdata.append("id",id)

        dispatch(fetchupdate({id,formdata}))




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
            Update Product
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
                {...register("description",{required:"true"})}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoComplete="family-name"
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
                  autoComplete="family-name"
                  error={errors.brand}
                  helperText={errors.brand && "Brand is required"}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                {...register("price",{required:"true"})}
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  autoComplete="family-name"
                  error={errors.price}
                  helperText={errors.price && "Price is required"}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                {...register("image",{required:"true"})}
                 fullWidth
                 variant='outlined'
                 type='file'
                 margin='normal'
                 error={!errors.image}
                 helperText={errors.image && "Image is required"}
                 defaultValue={form?.image || ""}

                 onChange={(e)=>setImage(e.target.files[0])}
                />
              </Grid>
              <div
               style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  marginTop: "10px",
                }}
              >
               
                {image && (
                  <img
                   style={{
                      position: "absolute",
                       top: 0,
                       left: 0,
                       height: "180px",
                       width: "auto",
                     }}
                     src={URL.createObjectURL(image)}
                     alt=""
                     className="upload-img"
                   />
               )}
               {!image && detail?.image && (
                  <img                     src={`https://webskitters-student.onrender.com /product/${detail.image}`}
                     alt=""
                    style={{ width: "100%", height: "auto" }}
                   />
                )}
             </div> 




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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}