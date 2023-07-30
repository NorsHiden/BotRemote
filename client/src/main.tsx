import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./styles.css"
import Select from './select'

const Home = () => {
  return (
    <Select />
  )
}

const LoginPage = () => {
  return (<div className='center'>
    <h1>Login</h1>
    <p>Click the button below to login</p>
    <a className='btn' href='/api/oauth'>login</a>
    </div>)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
