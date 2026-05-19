import { createBrowserRouter } from 'react-router-dom'
import Layout from '@components/Layout/Layout.jsx'
import Home from '@pages/Home/Home.jsx'
import Booking from '@pages/Booking/Booking.jsx'
import Admin from '@pages/Admin/Admin.jsx'
import Login from '@pages/Login/Login.jsx'
import NotFound from '@pages/NotFound/NotFound.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'booking', element: <Booking />},
            { path: 'admin', element: <Admin />},
            { path: 'login', element: <Login />},
        ]
    },
    { path: '*', element: <NotFound /> }
])

export default router
