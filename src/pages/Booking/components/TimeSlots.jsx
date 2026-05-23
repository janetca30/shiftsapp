import styles from '../Booking.module.css'

const slots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM',
    '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
]

// mock unavailable slots
const unavailable = ['10:00 AM', '2:30 PM', '4:00 PM']

const TimeSlots = ({ onSelect, selected, date }) => {
    return (
        <div className={styles.slotsWrapper}>
            <h2 className={styles.stepTitle}>
                Select a Time — {date?.toDateString()}
            </h2>
            <div className={styles.slotsGrid}>
                {slots.map((slot) => {
                    const isUnavailable = unavailable.includes(slot)
                    return (
                        <button
                            key={slot}
                            disabled={isUnavailable}
                            className={`${styles.slotBtn} ${selected === slot ? styles.selectedSlot : ''} ${isUnavailable ? styles.unavailableSlot : ''}`}
                            onClick={() => onSelect(slot)}
                        >
                            {slot}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default TimeSlots