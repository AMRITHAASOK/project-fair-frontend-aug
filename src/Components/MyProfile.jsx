import React from 'react'

function MyProfile() {
  return (
    <div>
        <div className='text-center border shadow py-3 my-5'>
            <h3>My profile</h3>
            <label>
                <input type="file" style={{display:'none'}} />
                <img width={'150px'}  height={'100px'} src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" alt="" />
            </label>

            <div className='w-50 mb-3' style={{marginLeft:"140px"}}>
                <input type="text" placeholder='Username' className='form-control my-3' />
                <input type="text" placeholder='Github' className='form-control mb-3' />
                <input type="text" placeholder='LinkedIn' className='form-control mb-3' />

            </div>
            
        </div>
    </div>
  )
}

export default MyProfile