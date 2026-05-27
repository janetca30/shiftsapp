import { createBrowserRouter } from 'react-router-dom'
import Layout from '@components/Layout/Layout.jsx'
import Home from '@pages/Home/Home.jsx'
import Booking from '@pages/Booking/Booking.jsx'
import Admin from '@pages/Admin/Admin.jsx'
import Login from '@pages/Login/Login.jsx'
import NotFound from '@pages/NotFound/NotFound.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Register from '@pages/Register/Register.jsx'
import MyShifts from '@pages/MyShifts/MyShifts.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'booking', element: <Booking />},
            { path: 'admin', element: (
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
                )
            },
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />},
            { path: 'my-shifts', element: (
                <ProtectedRoute>
                    <MyShifts />
                </ProtectedRoute>
                )
            },
        ]
    },
    { path: '*', element: <NotFound /> }
])

export default router
