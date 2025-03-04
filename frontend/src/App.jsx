import './App.css'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Cookies from 'js-cookie'
import RestaurantSignup from './pages/RestaurantSignup'
import RestaurantHome from './pages/RestaurantHome'
import RestaurantLogin from './pages/RestaurantLogin'
import SpecificRestaurant from './pages/SpecificRestaurant'
import RestaurantDashboard from './pages/RestaurantDashboard'
import OrderTracking from './pages/OrderTracking'
import EditProfile from './pages/EditProfile'
import CheckEmail from './pages/CheckEmail'
import VerifyEmail from './pages/VerifyEmail'

function App() {

  const location = useLocation()

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
        <Route path='/dashboard/:id' element={<RestaurantDashboard />} />
        <Route path='/order-tracking' element={<OrderTracking />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckEmail />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
