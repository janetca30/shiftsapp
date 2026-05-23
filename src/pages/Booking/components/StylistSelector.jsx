import styles from '../Booking.module.css'
import sharedStyles from '@/styles/shared.module.css'

const stylists = [
    { id: 1, name: 'Alex Johnson', specialties: ['Haircut', 'Beard Trim', 'Shave'], rating: 4.9, shifts: 124 },
    { id: 2, name: 'Maria Garcia', specialties: ['Hair Color', 'Hair Treatment', 'Haircut'], rating: 4.8, shifts: 98 },
    { id: 3, name: 'Chris Lee', specialties: ['Shave', 'Beard Trim'], rating: 4.6, shifts: 45 },
]

const StylistSelector = ({ onSelect, selected, services }) => {
    const selectedServiceNames = services.map((s) => s.title)

    const canHandle = (stylist) =>
        selectedServiceNames.some((name) => stylist.specialties.includes(name))

    return (
        <div className={styles.selectorWrapper}>
            <h2 className={styles.stepTitle}>Select a Stylist</h2>
            <p className={styles.stepHint}>Showing stylists available for your selected services</p>

            <div className={styles.stylistsBookingGrid}>
                {stylists.map((stylist) => {
                    const available = canHandle(stylist)
                    return (
                        <button
                            key={stylist.id}
                            disabled={!available}
                            className={`${styles.stylistBookingCard} ${selected?.id === stylist.id ? styles.selectedCard : ''} ${!available ? styles.unavailableStylist : ''}`}
                            onClick={() => onSelect(stylist)}
                        >
                            <div className={styles.stylistBookingAvatar}>
                                {stylist.name.charAt(0)}
                            </div>
                            <h3 className={styles.stylistBookingName}>{stylist.name}</h3>
                            <div className={styles.stylistBookingStats}>
                                <span>⭐ {stylist.rating}</span>
                                <span>✂️ {stylist.shifts} shifts</span>
                            </div>
                            <div className={sharedStyles.specialtiesList}>
                                {stylist.specialties.map((s) => (
                                    <span
                                        key={s}
                                        className={`${sharedStyles.specialtyBadge} ${selectedServiceNames.includes(s) ? styles.matchedSpecialty : ''}`}
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                            {!available && (
                                <p className={styles.unavailableNote}>Not available for selected services</p>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default StylistSelector