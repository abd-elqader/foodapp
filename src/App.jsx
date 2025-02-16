import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Authentication/Login/Login.jsx'

function App() {
  return (
    <>
      <p className='bg-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod provident debitis distinctio, accusamus enim perferendis vitae ut reprehenderit laboriosam ab quos? Doloremque reprehenderit id eligendi perspiciatis officiis ex maiores doloribus?</p>
      <i className='fa fa-user'></i>
      <Login />
    </>
  )
}

export default App
