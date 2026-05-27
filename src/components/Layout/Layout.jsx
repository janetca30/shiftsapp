import { Outlet } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar.jsx'
import Footer from '@components/Footer/Footer.jsx'
import Notification from '@components/Notification/Notification'
import styles from './Layout.module.css'

const Layout = ()  => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
            <Notification />
        </div>
    )
}
export default Layout