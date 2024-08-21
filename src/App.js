import './App.css';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import Header from './Pages/Layout/Header/Header';
import Registration from './Pages/AUTH/Registration/Registration';
import Login from './Pages/AUTH/Login/Login';
import Forgot from './Pages/AUTH/Forgot/Forgot';
import Create from './Pages/CMS/Create/Create';
import Productlist from './Pages/CMS/Product/Productlist';
import SingleProduct from './Pages/CMS/SingleProduct/SingleProduct';
import Update from './Pages/CMS/Update/Update';
import Home from './Pages/CMS/Home/Home';
import Updatepass from './Pages/AUTH/Updatepass/Updatepass';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './Pages/ReduxToolkit/AuthSlice';


const PrivateRoute=({children})=>{
  console.log("children",children)

  const token=localStorage.getItem("token") || sessionStorage.getItem("token")
  return token!==null && token!==undefined?(
   children 

  ):(
    <>
   <Navigate to={"/login"}/>
   {toast("Please go for login page either you cannot access other pages")}
    </>

  )
}

const PublicRouteNames=[
  {
    path:"/login",
    Component:<Login/>
},
{
  path:"/register",
  Component:<Registration/>
},
{
  path:"/forgot",
  Component:<Forgot/>
},
{
  path:"/updatepass",
  Component:<Updatepass/>
}]

const PrivateRouteNames=[{
  path:"/",
  Component:<Home/>
},
{
  path:"/create",
  Component:<Create/>
},
{
  path:"/product",
  Component:<Productlist/>
},
{
  path:"/product/:id",
  Component:<SingleProduct/>
},
{
  path:"/edit/:id",
  Component:<Update/>
}]

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch((check_token()))
  })
  return (
    <div className="App">

      <Router>
        <Header/>
        <Routes>
          {
            PublicRouteNames?.map((route,index)=>{
              return(
                <Route key={index} exact path={route.path} element={route.Component}/>
              )
            })
          }
          {
            PrivateRouteNames?.map((route,index)=>{
              return(
                <Route key={index} exact path={route.path} element={<PrivateRoute>{route.Component}</PrivateRoute>}/>
              )
            })
          }
        </Routes>
      </Router>

    </div>
  );
}

export default App;
