import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
  

function Header() {
  const location = useNavigate()

  const logout=()=>{
    sessionStorage.clear();
    location('/')
  }

  return (
    <div> <MDBNavbar light bgColor='dark' className='text-white'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' className='text-white'>
          <i class="fa-solid fa-laptop-code fa-fad mx-3 fs-1 text-white"></i>
          Prject Fair
          </MDBNavbarBrand>
          <button onClick={logout} className='btn'><i class="fa-solid fa-right-from-bracket fs-2"></i></button>
        </MDBContainer>
      </MDBNavbar></div>
  )
}

export default Header