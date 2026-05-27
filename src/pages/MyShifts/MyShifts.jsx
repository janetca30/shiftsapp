import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import useUIStore from '@/store/useUIStore'
import { shiftService } from '@/services/api'
import styles from './MyShifts.module.css'

const MyShifts = () => {
    const { user } = useAuthStore()
    const { showNotification } = useUIStore()
    const [shifts, setShifts] = useState([])

    useEffect(() => {
        shiftService.getMy()
            .then((data) => setShifts(data))
            .catch((err) => console.error(err))
    }, [])

    const handleCancel = async (id) => {
        try {
            await shiftService.cancel(id)
            setShifts((prev) => prev.map((s) => s._id === id ? { ...s, status: 'cancelled' } : s))
            showNotification({ type: 'success', message: 'Appointment cancelled' })
        } catch (error) {
            showNotification({ type: 'error', message: error.message })
        }
    }

    const upcoming = shifts.filter((s) => s.status === 'pending')
    const past = shifts.filter((s) => s.status !== 'pending')

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Appointments</h1>
                <p className={styles.subtitle}>Welcome back, {user?.name}</p>
            </div>

            <Link to="/booking" className={styles.bookBtn}>
                + Book New Appointment
            </Link>

            {/* Upcoming */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Upcoming ({upcoming.length})</h2>
                {upcoming.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No upcoming appointments.</p>
                        <Link to="/booking" className={styles.emptyLink}>Book one now →</Link>
                    </div>
                ) : (
                    <div className={styles.shiftsGrid}>
                        {upcoming.map((shift) => (
                            <div key={shift._id} className={styles.shiftCard}>
                                <div className={styles.shiftCardHeader}>
                                    <span className={`${styles.badge} ${styles.pending}`}>Pending</span>
                                    <span className={styles.shiftDate}>📅 {shift.date}</span>
                                </div>
                                <div className={styles.shiftInfo}>
                                    <p className={styles.shiftTime}>🕐 {shift.time}</p>
                                    <p className={styles.shiftStylist}>💈 {shift.stylist?.name}</p>
                                    <div className={styles.shiftServices}>
                                        {shift.services?.map((s) => (
                                            <span key={s.title} className={styles.serviceBadge}>{s.title}</span>
                                        ))}
                                    </div>
                                    <p className={styles.shiftTotal}>💰 ${shift.totalPrice}</p>
                                </div>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => handleCancel(shift._id)}
                                >
                                    Cancel Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past */}
            {past.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Past ({past.length})</h2>
                    <div className={styles.shiftsGrid}>
                        {past.map((shift) => (
                            <div key={shift._id} className={`${styles.shiftCard} ${styles.pastCard}`}>
                                <div className={styles.shiftCardHeader}>
                  <span className={`${styles.badge} ${styles[shift.status]}`}>
                    {shift.status}
                  </span>
                                    <span className={styles.shiftDate}>📅 {shift.date}</span>
                                </div>
                                <div className={styles.shiftInfo}>
                                    <p className={styles.shiftTime}>🕐 {shift.time}</p>
                                    <p className={styles.shiftStylist}>💈 {shift.stylist?.name}</p>
                                    <div className={styles.shiftServices}>
                                        {shift.services?.map((s) => (
                                            <span key={s.title} className={styles.serviceBadge}>{s.title}</span>
                                        ))}
                                    </div>
                                    <p className={styles.shiftTotal}>💰 ${shift.totalPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyShifts