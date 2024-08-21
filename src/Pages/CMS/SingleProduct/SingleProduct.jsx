

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchdetail } from '../../ReduxToolkit/ProductSlice'
import { Box, Button, Container, Grid, Typography } from '@mui/material'

function SingleProduct() {
    const { id } = useParams()
    console.log(id)
    const { detail } = useSelector(state => state.Product)
    console.log(detail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchdetail(id))
    }, [dispatch, id])

    return (
        <Box sx={{ marginTop: "80px" }}>
            <Container sx={{ border: '2px solid black', padding: '16px' }}>
                <Grid container spacing={4} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={detail?.image}
                            alt={detail?.name}
                            sx={{
                                width: "100%",
                                height: "auto",
                                maxHeight: { xs: "300px", md: "500px" },
                                objectFit: "cover"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" textAlign="center">Name: {detail?.name}</Typography>
                        <Typography variant="h5" textAlign="center">Description: {detail?.description}</Typography>
                        <Typography variant="h5" textAlign="center">Price: {detail?.price}</Typography>

                        <Link to={`/edit/${detail?._id}`}><Button variant='contained'>Edit</Button></Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default SingleProduct

