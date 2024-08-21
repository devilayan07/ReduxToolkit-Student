import React,{useState,useEffect} from 'react'
import { Grid,AppBar, Toolbar, Typography, Tabs, Tab, Box, Button,useTheme,useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom';
import DrawerComp from '../../../Component/DrawerComp/DrawerComp';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoggedout } from '../../ReduxToolkit/AuthSlice';

function Header() {
    const [authenticated, setAuthenticated] = useState(false);
    const{isloggedIn}=useSelector(state=>state.AUTH)
    const dispatch=useDispatch()
    console.log(isloggedIn)
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthenticated(true);
      }
    }, [authenticated]);
    const[value,setValue]=useState()
    // const token=localStorage.getItem("token")

    

    const theme=useTheme()
    console.log(theme)
    const isMatch=useMediaQuery(theme.breakpoints.down("md"))
    console.log(isMatch)

    const handleChange=((e,value)=>{
        setValue(value)

    })
    // const Hello=()=>{
    //     localStorage.removeItem("token")
    // }

    const logout=()=>{
      dispatch(handleLoggedout())
    }

  return (
    <>

     
        <AppBar sx={{backgroundColor:"#FFFFFF"}}>
        <Toolbar>
   
          { isMatch ? <>
           <Typography variant='h6' sx={{fontWeight:"700",marginLeft:"20px"}}>
                       ED-TECH
                   </Typography>
   
                <DrawerComp/>
           
          </> : <Grid sx={{placeItems:"center"}} container >
               <Grid item xs={2}>
                   <Typography variant='h6' sx={{fontWeight:"700",marginLeft:"20px",color:"green"}}>
                       ED-TECH
                   </Typography>
               </Grid>
               <Grid item xs={6} >
                   <Tabs sx={{marginLeft:"auto"}} textColor='inherit' indicatorColor='secondary' value={value} onChange={handleChange}>
                       <Tab sx={{color:"green"}} label="Home" to="/" component={Link}/>
                       <Tab sx={{color:"green"}} label="Product" to="/product" component={Link}/>
                       <Tab sx={{color:"green"}} label="Create" to="/create" component={Link}/>
                       {/* <Tab sx={{color:"green"}} label="Blog" to="/blog" component={Link}/> */}
                       {/* <Tab sx={{color:"green"}} label="Contact" to="/contact" component={Link}/> */}

        </Tabs>
                   </Grid>
                   <Grid item xs={1}>
                   <img src={""}alt=""
                                        height={"50px"}
                                        width={"50px"}
                                        style={{ marginLeft: "auto", borderRadius: "50%" }}
                   
                                      
                                      />



                   </Grid>
                   
                   
                   
                  
   
                   <Grid item xs={3}>
                       <Box display="flex">
                       {/* <Button sx={{marginLeft:"auto",backgroundColor:"#F77D0A"}}variant='contained' component={Link} to="/login">Login</Button> */}
                       {isloggedIn ? (
                 <Button
                   component={Link}
                   // onClick={Hello}
                   variant='contained'
                   to="/login"
                   sx={{ backgroundColor: "#F77D0A",marginLeft:"auto" }}
                   onClick={()=>logout()}
                 >
                   Logout
                 </Button>
               ) : (
                 <Button variant='contained' component={Link} to="/login" sx={{ backgroundColor: "#F77D0A",marginLeft:"auto" }}>
                   Login
                 </Button>
               )}
                       </Box>
   
   
                   </Grid>
               </Grid>}
           
        </Toolbar>
       </AppBar>
   


    

      
    
   </> 
  )
}

export default Header
