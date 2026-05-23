import styles from '../Booking.module.css'

const BookingSummary = ({ booking, totalPrice, onConfirm, onEdit }) => {
    const { services, stylist, date, time } = booking

    return (
        <div className={styles.summaryWrapper}>
            <h2 className={styles.stepTitle}>Confirm your Appointment</h2>

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
                        <button className={styles.editBtn} onClick={() => onEdit(1)}>Edit</button>
                    </div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Stylist</span>
                    <div className={styles.summaryValue}>
                        💈 {stylist?.name}
                        <button className={styles.editBtn} onClick={() => onEdit(2)}>Edit</button>
                    </div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Date</span>
                    <div className={styles.summaryValue}>
                        📅 {date?.toDateString()}
                        <button className={styles.editBtn} onClick={() => onEdit(3)}>Edit</button>
                    </div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Time</span>
                    <div className={styles.summaryValue}>
                        🕐 {time}
                        <button className={styles.editBtn} onClick={() => onEdit(4)}>Edit</button>
                    </div>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total</span>
                    <div className={`${styles.summaryValue} ${styles.totalPrice}`}>
                        💰 ${totalPrice}
                    </div>
                </div>
            </div>

            <button className={styles.confirmBtn} onClick={onConfirm}>
                Confirm Appointment
            </button>
        </div>
    )
}

export default BookingSummary