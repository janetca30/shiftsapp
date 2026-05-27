import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import styles from './Navbar.module.css'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                ✂️ BarberShop
            </Link>

            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/booking"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Book Now
                </NavLink>

                {isAuthenticated ? (
                    <>
                        {user?.role === 'admin' && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }
                            >
                                Admin
                            </NavLink>
                        )}

                        {user?.role === 'client' && (
                            <NavLink
                                to="/my-shifts"
                                className={({ isActive }) =>
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }
                            >
                                My Shifts
                            </NavLink>
                        )}

                        <div className={styles.userMenu}>
                            <span className={styles.userName}>👤 {user?.name}</span>
                            <button className={styles.logoutBtn} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Navbar