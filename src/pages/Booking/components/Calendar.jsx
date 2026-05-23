import { useState } from 'react'
import styles from '../Booking.module.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const Calendar = ({ onSelect, selected }) => {
    const today = new Date()
    const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

    const isDisabled = (day) => {
        const date = new Date(year, month, day)
        return date < today || date.getDay() === 0 // disabled sundays and past dates
    }

    const isSelected = (day) => {
        if (!selected) return false
        const date = new Date(year, month, day)
        return date.toDateString() === selected.toDateString()
    }

    return (
        <div className={styles.calendarWrapper}>
            <h2 className={styles.stepTitle}>Select a Date</h2>
            <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                    <button onClick={prevMonth} className={styles.navBtn}>←</button>
                    <span className={styles.monthTitle}>{MONTHS[month]} {year}</span>
                    <button onClick={nextMonth} className={styles.navBtn}>→</button>
                </div>

                <div className={styles.calendarGrid}>
                    {DAYS.map((day) => (
                        <div key={day} className={styles.dayLabel}>{day}</div>
                    ))}

                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        return (
                            <button
                                key={day}
                                disabled={isDisabled(day)}
                                className={`${styles.dayBtn} ${isSelected(day) ? styles.selectedDay : ''} ${isDisabled(day) ? styles.disabledDay : ''}`}
                                onClick={() => onSelect(new Date(year, month, day))}
                            >
                                {day}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Calendar