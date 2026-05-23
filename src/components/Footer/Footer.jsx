import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.brand}>
                    <h3 className={styles.logo}>✂️ BarberShop</h3>
                    <p>Professional cuts & styles</p>
                </div>

                <div className={styles.links}>
                    <h4>Navigation</h4>
                    <Link to="/">Home</Link>
                    <Link to="/booking">Book Now</Link>
                    <Link to="/login">Admin</Link>
                </div>

                <div className={styles.contact}>
                    <h4>Contact</h4>
                    <p>📍 123 Main Street</p>
                    <p>📞 +1 234 567 890</p>
                    <p>📧 info@barbershop.com</p>
                </div>

                <div className={styles.hours}>
                    <h4>Hours</h4>
                    <p>Mon - Fri: 9am - 7pm</p>
                    <p>Saturday: 9am - 5pm</p>
                    <p>Sunday: Closed</p>
                </div>

            </div>

            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} BarberShop. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer