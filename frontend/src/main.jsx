import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'
// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
// Private route
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
// Admin route
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import UserList from './pages/Admin/userList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import Order from './pages/Orders/Order.jsx'
import UserOrder from './pages/User/UserOrder.jsx'
import OrderList from './pages/Admin/OrderList.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route index={true} path='/' element={<Home />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/placeorder' element={<PlaceOrder />} />
      <Route path='/order/:id' element={<Order />} />
      <Route path='/user-orders' element={<UserOrder />} />
      <Route  path='/sucess' element={<Success />}/>
      <Route  path='/cancel' element={<Cancel />}/>

      {/* Registered routes */}
      <Route path='' element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route path='/admin' element={<AdminRoutes />} >
        <Route path='userlist' element={<UserList />} />
        {/* Absolute route path "/userlist" nested under path "/admin" is not valid. An absolute child route path must start with the combined path of all its parent routes. */}
        <Route path='productlist' element={<ProductList />} />
        <Route path='productlist/:pageNo' element={<ProductList />} />
        <Route path='allproducts' element={<AllProducts />} />
        <Route path='updateproduct/:id' element={<ProductUpdate />} />
        <Route path='all-orders' element={<OrderList />} />
        <Route path='dashboard' element={<AdminDashboard />} />
      </Route>

    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      {/* <PaypalScriptProvider> */}
        <RouterProvider router={router} />
      {/* </PaypalScriptProvider> */}
    </Provider>
  </React.StrictMode>,
)
