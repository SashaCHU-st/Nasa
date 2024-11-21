import React from 'react'
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Detail from '../pages/detail/Detail';
// import Signup from '../pages/signup/Signup';

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "login" element = {<Login/>} />
          <Route path = "detail" element = {<Detail/>} />
          {/* <Route path = "signup" element = {<Signup/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
