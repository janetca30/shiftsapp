import styles from '../Home.module.css'

const About = () => {
    return (
        <section className={styles.about} id="about">
            <div className={styles.aboutContent}>
                <span className={styles.badge}>Our story</span>
                <h2 className={styles.sectionTitle}>About Us</h2>
                <p className={styles.aboutText}>
                    With over 10 years of experience, our team of expert barbers is
                    dedicated to providing the highest quality cuts and grooming services.
                    We combine traditional techniques with modern styles to give you
                    the perfect look.
                </p>
                <ul className={styles.aboutList}>
                    <li>✅ 10+ years of experience</li>
                    <li>✅ Expert certified barbers</li>
                    <li>✅ Premium products only</li>
                    <li>✅ Satisfaction guaranteed</li>
                </ul>
            </div>
            <div className={styles.aboutImage}>
                <div className={styles.imagePlaceholder}>✂️</div>
            </div>
        </section>
    )
}

export default About