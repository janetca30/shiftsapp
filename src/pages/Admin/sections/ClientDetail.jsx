import styles from '../Admin.module.css'

const ClientDetail = ({ client, onBack }) => {
    const completed = client.shifts.filter((s) => s.status === 'completed').length
    const cancelled = client.shifts.filter((s) => s.status === 'cancelled').length

    const serviceCount = client.shifts.reduce((acc, shift) => {
        acc[shift.service] = (acc[shift.service] || 0) + 1
        return acc
    }, {})

    const favoriteService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]

    return (
        <div className={styles.detailWrapper}>
            <button className={styles.backBtn} onClick={onBack}>
                ← Back to Clients
            </button>

            {/* Client header */}
            <div className={styles.detailHeader}>
                <div className={styles.clientAvatar}>
                    {client.name.charAt(0)}
                </div>
                <div>
                    <h2 className={styles.clientName}>{client.name}</h2>
                    <p className={styles.clientContact}>📧 {client.email}</p>
                    <p className={styles.clientContact}>📞 {client.phone}</p>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.clientStats}>
                <div className={styles.clientStatCard}>
                    <span className={styles.clientStatValue}>{client.visits}</span>
                    <span className={styles.clientStatLabel}>Total Visits</span>
                </div>
                <div className={styles.clientStatCard}>
                    <span className={styles.clientStatValue}>{completed}</span>
                    <span className={styles.clientStatLabel}>Completed</span>
                </div>
                <div className={styles.clientStatCard}>
                    <span className={styles.clientStatValue}>{cancelled}</span>
                    <span className={styles.clientStatLabel}>Cancelled</span>
                </div>
                <div className={styles.clientStatCard}>
                    <span className={styles.clientStatValue}>{favoriteService?.[0] ?? '—'}</span>
                    <span className={styles.clientStatLabel}>Favorite Service</span>
                </div>
            </div>

            {/* Shift history */}
            <h3 className={styles.sectionTitle}>Shift History</h3>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {client.shifts.map((shift) => (
                    <tr key={shift.id}>
                        <td>{shift.service}</td>
                        <td>{shift.date}</td>
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
    )
}

export default ClientDetail