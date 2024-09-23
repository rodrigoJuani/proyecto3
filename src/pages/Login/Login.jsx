import React from 'react'
import './Login.css'
import assets from 'C:/Users/pc/Desktop/proyecto1/src/assets/assets'
const Login=()=>{
    return(
        <div className='login'>
          <img src={assets.logo_big} alt="" className="logo" />
          <form action="" className="login-fomm">
            <h2>sign Up</h2>
            <input type="text" placeholder="username" className="form-input" required/>
            <input type="email" placeholder='Email adress' className="form-input" />
            <input type="password" placeholder='password' className="form-input" />
          </form>
        </div>
    )
}
export default Login
