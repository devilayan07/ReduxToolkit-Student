import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchdelete, fetchproduct } from '../../ReduxToolkit/ProductSlice'
import {  Typography, Card, CardMedia, CardContent, CardActions, Button, CardActionArea, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


function Productlist() {
    const Products=useSelector(state=>state.Product)
    console.log(Products)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchproduct())
    },[dispatch])

    const handleDelete=(id)=>{
      const formdata=new FormData()
      formdata.append("id",id)
      dispatch(fetchdelete(id)).then(()=> dispatch(fetchproduct(id)))
      Swal.fire({
        title: "Deleted",
        text: "Your file has been deleted",
        icon: "success"
      });

    }

    const handleRemove=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result)=>{
        if(result.isConfirmed){
          handleDelete(id)
        }
      })


    }
  return (

    <section >
    <Typography variant='h5'textAlign={"center"} sx={{marginTop:"80px"}}>Avilabel Models</Typography>
    <Grid container  >
      {
        Array.isArray(Products.product?.data) && Products.product?.data?.map((item, index) =>
          <Grid item xs={12} md={4} sx={{ marginTop: "30px", paddingLeft: "10px"}}>
            <Card sx={{ marginTop: "20px", maxWidth: 350, height: "450px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  image={item?.image} />
                <CardContent>
                  <Typography variant='h5' component="div" textAlign="center">Name:{item.name}</Typography>
                  <Typography variant='h5' component="div" textAlign="center">Brand:{item.brand}</Typography>

                  <Typography variant='h6' component="div" >Description:{item.description}</Typography>
                  <Typography variant='h5' component="div" textAlign="center">Price:{item.price}</Typography>

                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
              <Link to={`/product/${item._id}`}><Button variant='contained'>Details</Button></Link>
              <Button variant='contained'onClick={()=>handleRemove(item._id)}>Delete</Button>
              </CardActions>

            </Card>
          </Grid>
        )
      }

    </Grid>
    </section>

  )
}

export default Productlist
