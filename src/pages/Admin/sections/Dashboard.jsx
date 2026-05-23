import styles from '../Admin.module.css'

const stats = [
    { icon: '📅', label: "Today's Shifts", value: '8', change: '+2 vs yesterday' },
    { icon: '👥', label: 'Total Clients', value: '124', change: '+5 this week' },
    { icon: '💰', label: "Today's Revenue", value: '$240', change: '+$40 vs yesterday' },
    { icon: '⭐', label: 'Avg Rating', value: '4.8', change: 'Based on 98 reviews' },
]

const recentShifts = [
    { id: 1, client: 'John Doe', service: 'Haircut', time: '9:00 AM', status: 'completed' },
    { id: 2, client: 'Mike Smith', service: 'Beard Trim', time: '10:00 AM', status: 'completed' },
    { id: 3, client: 'Carlos Rivera', service: 'Shave', time: '11:30 AM', status: 'pending' },
    { id: 4, client: 'James Brown', service: 'Hair Treatment', time: '2:00 PM', status: 'pending' },
    { id: 5, client: 'Lucas White', service: 'Haircut + Beard', time: '3:30 PM', status: 'cancelled' },
]

const Dashboard = () => {
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
                <h2 className={styles.sectionTitle}>Today's Shifts</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentShifts.map((shift) => (
                        <tr key={shift.id}>
                            <td>{shift.client}</td>
                            <td>{shift.service}</td>
                            <td>{shift.time}</td>
                            <td>
                  <span className={`${styles.badge} ${styles[shift.status]}`}>
                    {shift.status}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard