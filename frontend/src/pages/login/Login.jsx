import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login'>
      <div className='formWr'>
        <form onSubmit="">
          <div className='inputWr'>
            <label htmlFor="name">Name</label>
            <input className='window' type="text" id='name' />
          </div>
          <div className='inputWr'>
            <label htmlFor="password">Password</label>
            <input className='window' type="text" id='password'/>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
      
    </div>
  )
}

export default Login
