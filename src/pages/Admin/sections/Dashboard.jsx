import { useState, useEffect } from 'react'
import styles from '../Admin.module.css'
import { shiftService } from '@/services/api'

const Dashboard = () => {
    const [shifts, setShifts] = useState([])

    useEffect(() => {
        shiftService.getAll()
            .then((data) => setShifts(data))
            .catch((err) => console.error(err))
    }, [])

    const today = new Date().toISOString().split('T')[0]

    const todayShifts = shifts.filter((s) => s.date === today)
    const pendingShifts = shifts.filter((s) => s.status === 'pending')
    const completedShifts = shifts.filter((s) => s.status === 'completed')
    const todayRevenue = todayShifts
        .filter((s) => s.status === 'completed')
        .reduce((acc, s) => acc + s.totalPrice, 0)

    const stats = [
        { icon: '📅', label: "Today's Shifts", value: todayShifts.length, change: `${pendingShifts.length} pending` },
        { icon: '✅', label: 'Completed', value: completedShifts.length, change: 'Total completed' },
        { icon: '💰', label: "Today's Revenue", value: `$${todayRevenue}`, change: 'Completed shifts only' },
        { icon: '📋', label: 'Total Shifts', value: shifts.length, change: 'All time' },
    ]

    const recentShifts = [...shifts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    return (
        <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <span className={styles.statIcon}>{stat.icon}</span>
                        <div>
                            <p className={styles.statLabel}>{stat.label}</p>
                            <h3 className={styles.statValue}>{stat.value}</h3>
                            <p className={styles.statChange}>{stat.change}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.recentShifts}>
                <h2 className={styles.sectionTitle}>Recent Shifts</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Client</th>
                        <th>Services</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentShifts.length === 0 ? (
                        <tr>
                            <td colSpan={7} className={styles.noResults}>No shifts yet</td>
                        </tr>
                    ) : (
                        recentShifts.map((shift) => (
                            <tr key={shift._id}>
                                <td>{shift.client?.name || shift.guestInfo?.name || 'Guest'}</td>
                                <td>{shift.services?.map((s) => s.title).join(', ')}</td>
                                <td>{shift.stylist?.name}</td>
                                <td>{shift.date}</td>
                                <td>{shift.time}</td>
                                <td>${shift.totalPrice}</td>
                                <td>
                    <span className={`${styles.badge} ${styles[shift.status]}`}>
                      {shift.status}
                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard