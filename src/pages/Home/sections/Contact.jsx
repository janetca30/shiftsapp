import styles from '../Home.module.css'

const Contact = () => {
    return (
        <section className={styles.contact} id="contact">
            <div className={styles.sectionHeader}>
                <span className={styles.badge}>Get in touch</span>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
            </div>

            <div className={styles.contactGrid}>
                <div className={styles.contactCard}>
                    <span className={styles.contactIcon}>📍</span>
                    <h4>Location</h4>
                    <p>123 Main Street, City</p>
                </div>
                <div className={styles.contactCard}>
                    <span className={styles.contactIcon}>📞</span>
                    <h4>Phone</h4>
                    <p>+1 234 567 890</p>
                </div>
                <div className={styles.contactCard}>
                    <span className={styles.contactIcon}>🕐</span>
                    <h4>Hours</h4>
                    <p>Mon - Fri: 9am - 7pm</p>
                    <p>Sat: 9am - 5pm</p>
                </div>
                <div className={styles.contactCard}>
                    <span className={styles.contactIcon}>📧</span>
                    <h4>Email</h4>
                    <p>info@barbershop.com</p>
                </div>
            </div>
        </section>
    )
}

export default Contact