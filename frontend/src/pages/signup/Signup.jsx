import React from 'react'
import './Signup.css'
const Signup = () => {
  return (
    <div className='signup'>
      <div className='formWr'>
        <form onSubmit="">
          <div className='inputWr'>
          <label htmlFor="name">Name</label>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input className='window' type="text" id ="name"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input className='window' type="text" id='email'/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className='window' type="text" id='password' />
          </div>
          <button type='submit'>SignUp</button>
        </form>
      </div>
      
    </div>
  )
}

export default Signup
