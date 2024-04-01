import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs'

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function Auth({register}) {

  const location = useNavigate()

  const isRegisterForm = register?true:false

  const [userData,setUserData] = useState({
    username:"",
    email:"",
    password:"",
  })

  const registerData=async()=>{

    const {username,email,password} = userData

    if(!username || !email || !password){
      alert("Please fill the form ")
    }
    else{

      const result = await registerAPI(userData)
      console.log(result);
        if(result.status==200){
          alert(result.data)//user registration successful
          location('/login')
        }
        else{
          alert(result.response.data)//user already registered
        }
    }
    
    console.log(userData); 

  }

  const loginData= async()=>{
    const {email,password} = userData
    if(!email||!password){
      alert("Please fill the form ")
    }
    else{
        const result = await loginAPI(userData)
        console.log(result);
        if(result.status==200){
          alert("login successful")//user login successful
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          location('/dashboard')
        }
        else{
          alert("Invalid user data")
        }
       
      }
  }
  

  return (
   <div>
    <MDBNavbar light bgColor='dark' className='text-white'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' className='text-white'>
          <i class="fa-solid fa-laptop-code fa-fad mx-3 fs-1 text-white"></i>
          Prject Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
     <div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'600px'}}>
     
     <div className="container">
         <div className="row ">
           <div className="col-6">
             {/* image */}
             <img width={'100%'} height={'400px'} src="https://cdni.iconscout.com/illustration/premium/thumb/task-registration-2081679-1756042.png" alt="" />
           </div> 
           <div className="col-6 card shadow p-2">
             {/* content */}
             <h2 className='text-center mt-3'>Project Fair</h2>

             <h5 className='text-center mt-5'>
               {
                 isRegisterForm ?'Register here':'Login here'
               }
             </h5>

               <form className='p-5'>
                 {
                   isRegisterForm && 
                   <input type="text" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} placeholder='Username' className='form-control mb-3' />
                 }
                 <input type="text" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}  placeholder='Email' className='form-control mb-3' />
                 <input type="text" value={userData.password}  onChange={e=>setUserData({...userData,password:e.target.value})} placeholder='Password' className='form-control ' />
               </form>

               {
                 isRegisterForm ? 
                 <div className='text-center m-3'>
                   <button onClick={registerData} className='btn btn-success '>Register</button>
                   <Link to={'/login'} style={{textDecoration:'none',color:'white'}}>
                   <p className='mt-3' >Already Register? please login from here...</p>
                   </Link>
                 </div>
                 :
                 <div className='text-center m-3'>
                   <button onClick={loginData} className='btn btn-warning '>Login</button>
                   <Link to={'/register'} style={{textDecoration:'none',color:'white'}}>
                   <p className='mt-3' >New to here? Please Register...</p>
                   </Link>
                 </div>
               }

           </div>
       </div>
       <div className='text-center m-4'>
         <Link to={'/'}>
            <button className='btn btn-dark'>Go Back</button>
         </Link>
       </div>
     </div>

   </div>
   </div>
  )
}

export default Auth