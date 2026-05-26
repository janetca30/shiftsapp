import { useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from './components/Calendar'
import TimeSlots from './components/TimeSlots'
import ServiceSelector from './components/ServiceSelector'
import StylistSelector from './components/StylistSelector'
import BookingSummary from './components/BookingSummary'
import BookingSuccess from './components/BookingSuccess'
import { shiftService } from '@/services/api'
import useAuthStore from '@/store/useAuthStore'
import styles from './Booking.module.css'

const Booking = () => {
    const { isAuthenticated } = useAuthStore()
    const [step, setStep] = useState(1)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [guestInfo, setGuestInfo] = useState({ name: '', phone: '' })
    const [booking, setBooking] = useState({
        services: [],
        stylist: null,
        date: null,
        time: null,
    })

    const updateBooking = (field, value) => setBooking({ ...booking, [field]: value })

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

    const handleConfirm = async () => {
        setLoading(true)
        try {
            const payload = {
                stylist: booking.stylist._id,
                services: booking.services.map((s) => ({
                    title: s.title,
                    price: parseInt(s.price.replace('$', '')),
                    duration: s.duration,
                })),
                date: booking.date.toISOString().split('T')[0],
                time: booking.time,
                totalPrice: booking.services.reduce(
                    (acc, s) => acc + parseInt(s.price.replace('$', '')), 0
                ),
            }

            if (isAuthenticated) {
                await shiftService.create(payload)
            } else {
                await shiftService.createGuest({ ...payload, guestInfo: guestInfo })
            }

            setSuccess(true)
            } catch (error) {
            console.error('Error creating shift:', error)
            } finally {
            setLoading(false)
            }
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

    if (success) {
        return <BookingSuccess booking={booking} totalPrice={totalPrice} />
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Book an Appointment</h1>
                <p className={styles.subtitle}>Follow the steps to reserve your spot</p>

                {/* Login banner para invitados */}
                {!isAuthenticated && (
                    <div className={styles.loginBanner}>
                        <p>Have an account? <Link to="/login" className={styles.loginLink}>Sign in</Link> to manage your bookings. Or continue as guest below.</p>
                    </div>
                )}
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
                    <ServiceSelector onSelect={(v) => updateBooking('services', v)} selected={booking.services} />
                )}
                {step === 2 && (
                    <StylistSelector onSelect={(v) => updateBooking('stylist', v)} selected={booking.stylist} services={booking.services} />
                )}
                {step === 3 && (
                    <Calendar onSelect={(v) => updateBooking('date', v)} selected={booking.date} />
                )}
                {step === 4 && (
                    <TimeSlots onSelect={(v) => updateBooking('time', v)} selected={booking.time} date={booking.date} />
                )}
                {step === 5 && (
                    <>
                        {!isAuthenticated && (
                            <div className={styles.guestForm}>
                                <h3 className={styles.guestTitle}>Your Information</h3>
                                <div className={styles.guestFields}>
                                    <input
                                        className={styles.guestInput}
                                        id='guestName'
                                        name= 'guestName'
                                        placeholder="Your name *"
                                        value={guestInfo.name}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                                    />
                                    <input
                                        className={styles.guestInput}
                                        id='guestPhone'
                                        name= 'guestPhone'
                                        placeholder="Your phone *"
                                        value={guestInfo.phone}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                        <BookingSummary
                            booking={booking}
                            totalPrice={totalPrice}
                            onConfirm={handleConfirm}
                            onEdit={handleEdit}
                            loading={loading}
                            disableConfirm={!isAuthenticated && (!guestInfo.name || !guestInfo.phone)}
                        />
                    </>
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