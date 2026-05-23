import styles from '../Home.module.css'

const services = [
    { icon: '✂️', title: 'Haircut', description: 'Classic and modern cuts tailored to your style.', price: '$25' },
    { icon: '🪒', title: 'Shave', description: 'Traditional straight razor shave for a clean finish.', price: '$20' },
    { icon: '💈', title: 'Beard Trim', description: 'Shape and style your beard to perfection.', price: '$15' },
    { icon: '🧴', title: 'Hair Treatment', description: 'Nourishing treatments for healthy, strong hair.', price: '$35' },
]

const Services = () => {
    return (
        <section className={styles.services} id="services">
            <div className={styles.sectionHeader}>
                <span className={styles.badge}>What we offer</span>
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <p className={styles.sectionSubtitle}>
                    Quality services tailored to make you look and feel your best.
                </p>
            </div>

            <div className={styles.servicesGrid}>
                {services.map((service) => (
                    <div key={service.title} className={styles.serviceCard}>
                        <span className={styles.serviceIcon}>{service.icon}</span>
                        <h3 className={styles.serviceTitle}>{service.title}</h3>
                        <p className={styles.serviceDescription}>{service.description}</p>
                        <span className={styles.servicePrice}>{service.price}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services