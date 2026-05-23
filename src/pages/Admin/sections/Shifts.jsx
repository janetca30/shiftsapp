import { useState } from 'react'
import styles from '../Admin.module.css'

const allShifts = [
    { id: 1, client: 'John Doe', service: 'Haircut', date: '2026-05-20', time: '9:00 AM', status: 'completed' },
    { id: 2, client: 'Mike Smith', service: 'Beard Trim', date: '2026-05-20', time: '10:00 AM', status: 'completed' },
    { id: 3, client: 'Carlos Rivera', service: 'Shave', date: '2026-05-20', time: '11:30 AM', status: 'pending' },
    { id: 4, client: 'James Brown', service: 'Hair Treatment', date: '2026-05-21', time: '2:00 PM', status: 'pending' },
    { id: 5, client: 'Lucas White', service: 'Haircut', date: '2026-05-21', time: '3:30 PM', status: 'cancelled' },
    { id: 6, client: 'Peter Jones', service: 'Hair Color', date: '2026-05-22', time: '10:00 AM', status: 'pending' },
]

const Shifts = () => {
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterDate, setFilterDate] = useState('')

    const filtered = allShifts.filter((shift) => {
        const matchSearch = shift.client.toLowerCase().includes(search.toLowerCase()) ||
            shift.service.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === 'all' || shift.status === filterStatus
        const matchDate = filterDate === '' || shift.date === filterDate
        return matchSearch && matchStatus && matchDate
    })

    const handleStatusChange = (id, newStatus) => {
        console.log(`Change shift ${id} to ${newStatus}`)
        // acá va la llamada a la API
    }

    return (
        <div className={styles.shiftsWrapper}>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by client or service..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className={styles.select}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <input
                    type="date"
                    className={styles.dateInput}
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                {(search || filterStatus !== 'all' || filterDate) && (
                    <button
                        className={styles.clearBtn}
                        onClick={() => { setSearch(''); setFilterStatus('all'); setFilterDate('') }}
                    >
                        Clear
                    </button>
                )}
            </div>

            <p className={styles.resultsCount}>{filtered.length} shifts found</p>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtered.length === 0 ? (
                    <tr>
                        <td colSpan={6} className={styles.noResults}>No shifts found</td>
                    </tr>
                ) : (
                    filtered.map((shift) => (
                        <tr key={shift.id}>
                            <td>{shift.client}</td>
                            <td>{shift.service}</td>
                            <td>{shift.date}</td>
                            <td>{shift.time}</td>
                            <td>
                  <span className={`${styles.badge} ${styles[shift.status]}`}>
                    {shift.status}
                  </span>
                            </td>
                            <td className={styles.actions}>
                                {shift.status === 'pending' && (
                                    <>
                                        <button
                                            className={styles.completeBtn}
                                            onClick={() => handleStatusChange(shift.id, 'completed')}
                                        >
                                            ✓ Complete
                                        </button>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={() => handleStatusChange(shift.id, 'cancelled')}
                                        >
                                            ✕ Cancel
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Shifts