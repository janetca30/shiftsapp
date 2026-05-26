import { Link } from 'react-router-dom'
import styles from '../Booking.module.css'

const BookingSuccess = ({ booking, totalPrice }) => {
    const { services, stylist, date, time } = booking

    return (
        <div className={styles.successWrapper}>
            <div className={styles.successIcon}>✅</div>
            <h2 className={styles.successTitle}>Appointment Confirmed!</h2>
            <p className={styles.successSubtitle}>
                We look forward to seeing you. Here's your booking summary:
            </p>

            <div className={styles.summaryCard}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Services</span>
                    <div className={styles.summaryValue}>
                        <div className={styles.servicesList}>
                            {services.map((s) => (
                                <span key={s.id} className={styles.serviceBadge}>
                  {s.icon} {s.title}
                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Stylist</span>
                    <div className={styles.summaryValue}>💈 {stylist?.name}</div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Date</span>
                    <div className={styles.summaryValue}>📅 {date?.toDateString()}</div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Time</span>
                    <div className={styles.summaryValue}>🕐 {time}</div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total</span>
                    <div className={`${styles.summaryValue} ${styles.totalPrice}`}>
                        💰 ${totalPrice}
                    </div>
                </div>
            </div>

            <div className={styles.successButtons}>
                <Link to="/" className={styles.successHomeBtn}>
                    Back to Home
                </Link>
                <Link to="/booking" className={styles.successNewBtn}>
                    Book Another
                </Link>
            </div>
        </div>
    )
}

export default BookingSuccess