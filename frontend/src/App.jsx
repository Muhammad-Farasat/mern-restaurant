import './App.css'
import { Toaster } from 'react-hot-toast'
import Signup from './Pages/signup'
import {Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
