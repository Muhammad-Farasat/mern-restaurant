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
import RestaurantDashboard from './Pages/RestaurantDashboard'
import OrderTracking from './Pages/OrderTracking'
import EditProfile from './Pages/EditProfile'
import CheckEmail from './Pages/CheckEmail'
import VerifyEmail from './Pages/VerifyEmail'

function App() {

  const authUser = Cookies.get('authorization')
  const authRest = Cookies.get('restaurant-auth')

  return (
    <>
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to={'/login'} /> } />
        <Route path='/signup' element={ !authUser ? <Signup /> :<Navigate to={'/'} /> } />
        <Route path='/login' element={ !authUser ? <Login /> :<Navigate to={'/'} /> } />
        <Route path='/registerRestaurant' element={!authRest ? <RestaurantSignup /> : <Navigate to={'/RestaurantHome/:id'}/> } />
        <Route path='/loginRestaurant' element={ !authRest ? <RestaurantLogin /> : <Navigate to={'/RestaurantHome/:id'} /> } />
        <Route path='/RestaurantHome/:id' element={ authRest ? <RestaurantHome /> : <Navigate to={'/registerRestaurant'} /> } />
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
