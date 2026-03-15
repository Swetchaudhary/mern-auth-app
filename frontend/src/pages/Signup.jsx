import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {

  const [SignupInfo,setSignupInfo]= useState({
    name:'',
    email:'',
    password:''
  })
  const navigate=useNavigate();

  const handleChange = (e) =>{
    const {name, value} =e.target;
    console.log(name, value);
    const copySignupInfo={...SignupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }
  
  const handleSignup = async(e)=>{
    e.preventDefault();
    const {name ,email ,password}= SignupInfo;
    if(!name || !email || !password){
      return handleError('name,email and password are required')
    }
    try{
        const url="http://localhost:8080/auth/signup";
        const response= await fetch(url,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(SignupInfo)
        })
        const result= await response.json();
        const {success ,message, error}=result;
        if(success){
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login')
          }, 1000);
        }
        else if(error){
          const details= error?.details[0].message;
          handleError(details);
        }
        else if(!success){
          handleError(message);  
        }

        console.log(result);
    }catch(err){
        handleError(err); 
    }
  }
  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div className='signup'>
          <div >
            <label htmlFor='name' >Name</label>
            <input
            onChange={handleChange}
              type="text"
              name='name'
              autoFocus
              placeholder='Enter your name...'
              value={SignupInfo.name}
            />
          </div>
          <div >
            <label htmlFor='email' >Email</label>
            <input
             onChange={handleChange}
              type="email"
              name='email'
              autoFocus
              placeholder='Enter your email...'
               value={SignupInfo.email}
            />
          </div>
          <div >
            <label htmlFor='password' >Password</label>
            <input
              onChange={handleChange} 
              type="text"
              name='password'
              autoFocus
              placeholder='Enter your password...'
               value={SignupInfo.password}
            />
          </div>
        </div>

        <button type='submit'>Signup</button>
        <span>Already have an account ?
          <Link to="/login" > Login</Link>

        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup