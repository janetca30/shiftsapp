import styles from '../Booking.module.css'

const services = [
    { id: 1, icon: '✂️', title: 'Haircut', duration: '30 min', price: '$25' },
    { id: 2, icon: '🪒', title: 'Shave', duration: '20 min', price: '$20' },
    { id: 3, icon: '💈', title: 'Beard Trim', duration: '15 min', price: '$15' },
    { id: 4, icon: '🧴', title: 'Hair Treatment', duration: '45 min', price: '$35' },
    { id: 5, icon: '💇', title: 'Hair Wash', duration: '15 min', price: '$10' },
    { id: 6, icon: '🎨', title: 'Hair Color', duration: '60 min', price: '$50' },
]

const ServiceSelector = ({ onSelect, selected }) => {
    const toggle = (service) => {
        const exists = selected.find((s) => s.id === service.id)
        if (exists) {
            onSelect(selected.filter((s) => s.id !== service.id))
        } else {
            onSelect([...selected, service])
        }
    }

    const isSelected = (id) => selected.some((s) => s.id === id)

    return (
        <div className={styles.selectorWrapper}>
            <h2 className={styles.stepTitle}>Select Services</h2>
            <p className={styles.stepHint}>You can select one or more services</p>
            <div className={styles.servicesGrid}>
                {services.map((service) => (
                    <button
                        key={service.id}
                        className={`${styles.serviceCard} ${isSelected(service.id) ? styles.selectedCard : ''}`}
                        onClick={() => toggle(service)}
                    >
                        {isSelected(service.id) && <span className={styles.checkmark}>✓</span>}
                        <span className={styles.serviceIcon}>{service.icon}</span>
                        <h3>{service.title}</h3>
                        <p>{service.duration}</p>
                        <span className={styles.servicePrice}>{service.price}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ServiceSelector