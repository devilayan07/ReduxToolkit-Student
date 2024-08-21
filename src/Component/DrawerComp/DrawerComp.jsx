import { Drawer, IconButton,List,  ListItemButton, ListItemIcon, ListItemText,Box } from '@mui/material'
import React,{useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { Log_out } from '../../Redux-Toolkit/Slice/authSlice';

//  const Pages=["home","about","product","login"]
function DrawerComp() {
    const[open,setOpen]=useState(false)
    const handleClose=()=>{
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(!open)
    }
    
    // const dispatch=useDispatch()
    // const logOut=()=>{
    //   dispatch(Log_out())
    // }
  return (
    <>
    <Drawer PaperProps={{sx:{backgroundColor:"#FFFFFF"}}} open={open} onClose={handleClose}>
    <List>
        
            <ListItemButton  onClick={handleClose} >
            <ListItemIcon>
                
                <ul className='mobile-navigation'>
                    <li>
                    <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/create"}>Create</Link>
                    </li>
                    <li>
                        <Link to={"/product"}>Product</Link>
                    </li>
                    <li>
                    <Link to={"/login"}>Login</Link>

                    </li>
                    {/* <li>
                        <Link onClick={logOut}  to={"/login"}  >Logout</Link>
                    </li> */}
                </ul>
                


            </ListItemIcon>
            </ListItemButton>

            
            
        
   

    </List>

    </Drawer>
    <IconButton sx={{marginLeft:"auto"}} onClick={handleOpen}>
        <MenuIcon/>
    </IconButton>
    
    </>
  )
}

export default DrawerComp
