import './App.css'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import Signup from './pages/customer/Signup'
import Login from './pages/customer/Login'
import Home from './pages/customer/Home'
import RestaurantSignup from './pages/restaurant/RestaurantSignup'
import RestaurantHome from './pages/restaurant/RestaurantHome'
import RestaurantLogin from './pages/restaurant/RestaurantLogin'
import SpecificRestaurant from './pages/customer/SpecificRestaurant'
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard'
import OrderTracking from './pages/customer/OrderTracking'
import EditProfile from './pages/customer/EditProfile'
import CheckEmail from './pages/customer/CheckEmail'
import VerifyEmail from './pages/customer/VerifyEmail'
import DisplayRestaurant from './pages/customer/DisplayRestaurant'

function App() {

  const location = useLocation()

  const authUser = Cookies.get('authorization')
  const authRest = Cookies.get('restaurant-auth')

  return (
    <>
      <Routes>

        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/all-restaurant' element={<DisplayRestaurant/>} />




        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckEmail />} />

        <Route path='/registerRestaurant' element={!authRest ? <RestaurantSignup /> : <Navigate to={'/RestaurantHome'} />} />
        <Route path='/loginRestaurant' element={!authRest ? <RestaurantLogin /> : <Navigate to={'/RestaurantHome'} />} />

        <Route path='/RestaurantHome' element={authRest ? <RestaurantHome /> : <Navigate to={'/registerRestaurant'} />} />

        <Route path='/restaurant/:id' element={<SpecificRestaurant />} />

        <Route path='/order-tracking' element={<OrderTracking />} />
        <Route path='/edit-profile' element={<EditProfile />} />

        <Route path='/dashboard/:id' element={<RestaurantDashboard />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
