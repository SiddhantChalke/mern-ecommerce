import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/userSlice'
import { logout } from '../../redux/features/auth/authSlice'

import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineLogout } from 'react-icons/ai'
// import { FaHeart } from 'react-icons/fa'
import './Navigation.css'

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth)
  const favorites = useSelector((state) => state.favorites);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSideBar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSideBar)
  }
  const closeSidebar = () => {
    setShowSidebar(!showSideBar)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for Logging out
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');

    } catch (error) {
      console.error(error);
    }
  }

  return (
    // <div
    //   style={{ zIndex: 999 }}
    //   className={`${showSideBar ? 'hidden' : 'flex'} 
    // xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
    // p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`
    //   } id='navigation-container'>
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
    //       <AiOutlineHome className='mr-2 mt-[3rem' size={26} />
    //       <span className="hidden nav-item-name mt-[3rem">
    //         Home
    //       </span>
    //     </Link>
    //   </div>
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
    //       <AiOutlineShopping className='mr-2 mt-[3rem' size={26} />
    //       <span className="hidden nav-item-name mt-[3rem">
    //         Shop
    //       </span>
    //     </Link>
    //   </div>
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
    //       <AiOutlineShoppingCart className='mr-2 mt-[3rem' size={26} />
    //       <div className="absolute top-4">
    //         {cartItems.length > 0 && (
    //             <span className="px-1 py-0 text-sm text-white bg-red-500 rounded-full">
    //               {cartItems.reduce((a, c) => a + c.qty, 0)}
    //             </span>
    //         )}
    //         <span className="hidden nav-item-name mt-[3rem">
    //         Cart
    //       </span>
    //       </div>
    //     </Link>
    //   </div>
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link to='/favorites' className='flex items-center transition-transform transform hover:translate-x-2'>
    //       <AiOutlineHeart className='mr-2 mt-[3rem' size={26} />
    //         {favorites.length > 0 && (
    //           <span className="px-1 py-0 text-sm text-white bg-red-500 rounded-full">
    //             {favorites.length}
    //           </span>
    //         )}
    //       <span className="hidden nav-item-name mt-[3rem">
    //         Favorites
    //       </span>
    //     </Link>
    //   </div>

    //   <div className="relative">
    //     <button onClick={toggleDropdown} className='flex items-center text-gray-8000 focus:outline-none '>
    //       {userInfo ? <span className='text-white'>{userInfo.username}</span> : <></>}
    //     </button>

    //     {
    //       dropdownOpen && userInfo && (
    //         <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
    //           {userInfo.isAdmin && (
    //             <>
    //               <li>
    //                 <Link to='/admin/dashboard'
    //                   className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
    //               </li>
    //               <li>
    //                 <Link to='/admin/allproductslist'
    //                   className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
    //               </li>
    //               <li>
    //                 <Link to='/admin/userlist'
    //                   className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
    //               </li>
    //             </>
    //           )
    //           }
    //           <li>
    //             <Link to='/profile'
    //               className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
    //           </li>
    //           <li>
    //             <button onClick={logoutHandler}
    //               className='block px-4 py-2 hover:bg-gray-100'>Logout</button>
    //           </li>

    //         </ul>
    //       )
    //     }
    //   </div>

    // {
    //   !userInfo && (
    //     <ul>
    //       <li>
    //         <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
    //           <AiOutlineLogin className='mr-2 mt-[3rem' size={26} />
    //           <span className="hidden nav-item-name mt-[3rem">
    //             Login
    //           </span>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
    //           <AiOutlineUserAdd className='mr-2 mt-[3rem' size={26} />
    //           <span className="hidden nav-item-name mt-[3rem">
    //             Register
    //           </span>
    //         </Link>
    //       </li>
    //     </ul>
    //   )
    // }

    // </div>

    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <img className="h-8" src="/logo.svg" alt="Logo" />
          </div>

          {/* Links in the center */}
          <div className="hidden md:flex flex-grow justify-center">
            <Link to='/' className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              <AiOutlineHome className='hidden mr-2 mt-[3rem' size={26} />
              <span className="text-gray-300 mt-[3rem">
                Home
              </span>
            </Link>
            <Link to='/shop' className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              <AiOutlineHome className='hidden mr-2 mt-[3rem' size={26} />
              <span className="text-gray-300 mt-[3rem">
                Shop
              </span>
            </Link>
            <Link to='/cart' className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              <AiOutlineHome className='hidden mr-2 mt-[3rem' size={26} />
              <span className="text-gray-300 mt-[3rem">
                Cart
              </span>
            </Link>
            <Link to='/favorites' className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              <AiOutlineHome className='hidden mr-2 mt-[3rem' size={26} />
              <span className="text-gray-300 mt-[3rem">
                Favorites
              </span>
            </Link>
          </div>

          {/* Dropdown button on the right */}
          <div className="ml-4 relative flex-shrink-0">
            <div>
              <button onClick={toggleDropdown} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                {userInfo ? <span className='text-white px-2'>{userInfo.username}</span> : <></>}
              </button>
            </div>

            {/* Dropdown menu */}
                        {/* For Users */}
            {dropdownOpen && userInfo && (
              <ul className={`absolute left-[-1.5rem] mt-4 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? 'top-200' : 'top0'}`}>
                
                {/* For Admin Users */}
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link to='/admin/dashboard'
                        className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                    </li>
                    <li>
                      <Link to='/admin/allproductslist'
                        className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                    </li>
                    <li>
                      <Link to='/admin/userlist'
                        className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
                    </li>
                  </>
                )
                }

                {/* For Non-Admins */}
                <li>
                  <Link to='/profile'
                    className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler}
                    className='block px-4 py-2 hover:bg-gray-100'>Logout</button>
                </li>

              </ul>
            )}

            {/* For non-users */}
            {
        !userInfo && (
          <ul>
            <li>
              <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                <AiOutlineLogin className='mr-2 mt-[3rem' size={26} />
                <span className="hidden nav-item-name mt-[3rem">
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                <AiOutlineUserAdd className='mr-2 mt-[3rem' size={26} />
                <span className="hidden nav-item-name mt-[3rem">
                  Register
                </span>
              </Link>
            </li>
          </ul>
        )
      }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation