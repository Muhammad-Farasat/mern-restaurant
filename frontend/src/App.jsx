import './App.css'
import { Toaster } from 'react-hot-toast'
import Signup from './Pages/signup'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Cookies from 'js-cookie'
import RestaurantSignup from './Pages/RestaurantSignup'
import RestaurantHome from './Pages/RestaurantHome'
import RestaurantLogin from './Pages/RestaurantLogin'
import SpecificRestaurant from './Pages/SpecificRestaurant'

function App() {

  const authUser = Cookies.get('authorization')
  const authRest = Cookies.get('restaurant-auth')

  return (
    <>
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to={'/login'} /> } />
        <Route path='/signup' element={ !authUser ? <Signup /> :<Navigate to={'/'} /> } />
        <Route path='/login' element={ !authUser ? <Login /> :<Navigate to={'/'} /> } />
        <Route path='/registerRestaurant' element={!authRest ? <RestaurantSignup /> : <Navigate to={'/RestaurantHome'}/> } />
        <Route path='/loginRestaurant' element={ !authRest ? <RestaurantLogin /> : <Navigate to={'/RestaurantHome'} /> } />
        <Route path='/RestaurantHome' element={ authRest ? <RestaurantHome /> : <Navigate to={'/registerRestaurant'} /> } />
        <Route path='/restaurant/:id' element={<SpecificRestaurant />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
