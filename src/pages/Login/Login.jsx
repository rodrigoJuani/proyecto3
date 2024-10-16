import React,{useState} from 'react'
import './Login.css'
import assets from 'C:/Users/pc/Desktop/proyecto3/src/assets/assets'
import { signup } from '../../config/firebase'
const Login=()=>{

          const[currState,setCurrState]=useState("Sign up");
          const[userName,setUserName]=useState("");///login de inicio(entrada de email password) 
          const[email,setEmail]=useState("");
          const[password,setPassword]=useState("");
    return(
        <div className='login'>
          <img src={assets.logo_big} alt="" className="logo" />
          <form action="" className="login-form">
            <h2>{currState}</h2>
            {currState==="Sign up"? <input type="text" placeholder="username" className="form-input" required/>:null}
            <input type="email" placeholder='Email address' className="form-input" required/>
            <input type="password" placeholder='password' className="form-input" required/>
            <button type='submit'>{currState==="Sign up"?"Create account":"Login now"}</button>
            <div className="login-term">
              <input type='checkbox'/>
              <p>Agree to the terms of use & privacy policy</p>
            </div>
            <div className="login-forgot">
              {
                currState==="Sig up"
                ?<p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>:<p className="login-toggle">Create an account<span onClick={()=>setCurrState("Sign up")}>click here</span></p>
              }
            </div>
          </form>
        </div>
    )
}
export default Login
