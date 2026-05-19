import { Outlet } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar.jsx'
import styles from './Layout.module.css'

const Layout = ()  => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
            <footer>{}</footer>
        </div>
    )
}
export default Layout