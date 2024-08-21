import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container,Box,Typography,Grid } from '@mui/material';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { fetchProfile } from '../../ReduxToolkit/ProfileSlice';
import { image } from '../../../Component/Helper/Helper';
import { reset_redirectTo } from '../../ReduxToolkit/AuthSlice';


function Home() {
const{profile}=useSelector(state=>state.Profile)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch((fetchProfile()))
  },[dispatch])

  useEffect(()=>{
    dispatch(reset_redirectTo(null))
  },[dispatch])


  return (
    <>
          <Box sx={{ paddingTop: "100px", paddingBottom: "50px",display:"flex",justifyContent:"center" }}>
      <Container>
        <Grid
          container
          sx={{
            height: "500px",
            // width: "1400px",
            // margin: "0 auto",
            border: "2px solid white",
            justifyContent:"center",
            alignItems:"center",
            gap:"20px"
          }}
        >
                {Array.isArray(profile) && profile?.map((item,index)=>     <Grid
            item
            lg={6}
            sx={{ backgroundColor: "#cb2d1b", textAlign: "center" }}
          >
            <img
              src={image(item?.image)}
              alt=""
              height={"200px"}
              width={"200px"}
              style={{ marginTop: "20px", borderRadius: "50%" }}
            />
            <Box sx={{ marginTop: "30px" }}>
              <Typography variant="h5" color={"whitesmoke"}>
                Name:{item?.name}
              </Typography>
              <Typography variant="h6" color={"whitesmoke"}>
                Email Id:{item?.email}
              </Typography>
              <Typography variant="h6" color={"whitesmoke"}>
                Mobile:{item?.mobile}
              </Typography>
              <Typography variant="h6" color={"whitesmoke"}>
                First School:{item?.first_school}
              </Typography>


            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ paddingLeft: "8px" ,color:"whitesmoke"}}>
                <FacebookIcon />
              </Typography>
              <Typography sx={{ paddingLeft: "8px",color:"whitesmoke" }}>
                <TwitterIcon />
              </Typography>
              <Typography sx={{ paddingLeft: "8px",color:"whitesmoke"}}>
                <InstagramIcon />
              </Typography>
            </Box>
          </Grid>  )}
  
          </Grid>
          </Container>
          </Box>

    </>
  )
}

export default Home
