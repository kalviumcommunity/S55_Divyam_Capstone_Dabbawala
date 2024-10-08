import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Location from './components/Location'
import Cart from './components/Cart'
// import Payment from './components/Payment'
import {Routes,Route } from 'react-router-dom'
import Dabbwala from './components/Dabbwala'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/cart'  element={<Cart/>}/>
      {/* <Route path='/checkout/payment' element={<Payment/>}/> */}
      <Route path = '/location/:id' element = {<Location/>}/>
      <Route path='/dabbawala' element = {<Dabbwala/>}/>
    </Routes>
  
    </>
  )
}

export default App
