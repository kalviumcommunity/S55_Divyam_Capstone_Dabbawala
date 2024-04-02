import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes,Route } from 'react-router-dom'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/login' element = {<Login/>} />
    </Routes>
     
    </>
  )
}

export default App
