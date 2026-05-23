import { Link } from 'react-router-dom'
import styles from '../Home.module.css'

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <span className={styles.badge}>Professional Barbershop</span>
                <h1 className={styles.heroTitle}>
                    The Art of <br /> a Perfect Cut
                </h1>
                <p className={styles.heroSubtitle}>
                    Expert barbers, premium service, and a style that speaks for itself.
                </p>
                <div className={styles.heroButtons}>
                    <Link to="/booking" className={styles.btnPrimary}>
                        Book Now
                    </Link>
                    <a href="#services" className={styles.btnSecondary}>
                        Our Services
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero