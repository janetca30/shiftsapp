import { useState } from 'react'
import Calendar from './components/Calendar'
import TimeSlots from './components/TimeSlots'
import ServiceSelector from './components/ServiceSelector'
import StylistSelector from './components/StylistSelector'
import BookingSummary from './components/BookingSummary'
import styles from './Booking.module.css'

const Booking = () => {
    const [step, setStep] = useState(1)
    const [editMode, setEditMode] = useState(false)
    const [booking, setBooking] = useState({
        services: [],
        stylist: null,
        date: null,
        time: null,
    })

    const handleServiceSelect = (services) => setBooking({ ...booking, services })
    const handleStylistSelect = (stylist) => setBooking({...booking, stylist })
    const handleDateSelect = (date) => setBooking({ ...booking, date })
    const handleTimeSelect = (time) => setBooking({ ...booking, time })

    const handleNext = () => {
        if (editMode) {
            setStep(5)
            setEditMode(false)
        } else {
            setStep((prev) => prev + 1)
        }
    }

    const handleEdit = (targetStep) => {
        setEditMode(true)
        setStep(targetStep)
    }

    const handleConfirm = () => {
        console.log('Booking confirmed:', booking)
    }

    const canNext = () => {
        if (step === 1) return booking.services.length > 0
        if (step === 2) return booking.stylist !== null
        if (step === 3) return booking.date !== null
        if (step === 4) return booking.time !== null
        return false
    }

    const totalPrice = booking.services.reduce(
        (acc, s) => acc + parseInt(s.price.replace('$', '')), 0
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Book an Appointment</h1>
                <p className={styles.subtitle}>Follow the steps to reserve your spot</p>
            </div>

            <div className={styles.steps}>
                {['Service', 'Stylist', 'Date', 'Time', 'Confirm'].map((label, i) => (
                    <div
                        key={label}
                        className={`${styles.step} ${step > i + 1 ? styles.completed : ''} ${step === i + 1 ? styles.active : ''}`}
                    >
                        <span className={styles.stepNumber}>{i + 1}</span>
                        <span className={styles.stepLabel}>{label}</span>
                    </div>
                ))}
            </div>

            <div className={styles.content}>
                {step === 1 && (
                    <ServiceSelector onSelect={handleServiceSelect} selected={booking.services} />
                )}
                {step === 2 && (
                    <StylistSelector onSelect={handleStylistSelect} selected={booking.stylist} services={booking.services} />
                )}
                {step === 3 && (
                    <Calendar onSelect={handleDateSelect} selected={booking.date} />
                )}
                {step === 4 && (
                    <TimeSlots onSelect={handleTimeSelect} selected={booking.time} date={booking.date} />
                )}
                {step === 5 && (
                    <BookingSummary
                        booking={booking}
                        totalPrice={totalPrice}
                        onConfirm={handleConfirm}
                        onEdit={handleEdit}
                    />
                )}
            </div>

            {step < 5 && (
                <div className={styles.navigation}>
                    {step > 1 && (
                        <button className={styles.backBtn} onClick={() => setStep((prev) => prev - 1)}>
                            ← Back
                        </button>
                    )}
                    <button
                        className={styles.nextBtn}
                        onClick={handleNext}
                        disabled={!canNext()}
                    >
                        {editMode ? 'Save & Return' : step === 4 ? 'Review' : 'Next →'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Booking