import { useState, useEffect } from 'react'
import styles from '../Admin.module.css'
import { shiftService } from '@/services/api'

const Shifts = () => {
    const [shifts, setShifts] = useState([])
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterDate, setFilterDate] = useState('')

    const fetchShifts = async () => {
        const data = await shiftService.getAll()
        setShifts(data)
    }

    useEffect(() => {
        fetchShifts().catch((err) => console.error(err))
    }, [])

    const filtered = shifts.filter((shift) => {
        const matchSearch =
            shift.client?.name.toLowerCase().includes(search.toLowerCase()) ||
            shift.service?.some((s) => s.title.toLowerCase().includes(search.toLowerCase()))
        const matchStatus = filterStatus === 'all' || shift.status === filterStatus
        const matchDate = filterDate === '' || shift.date === filterDate
        return matchSearch && matchStatus && matchDate
    })

    const handleStatusChange = async (id, status) => {
        try {
            const updated = await shiftService.updateStatus(id, status)
            setShifts((prev) => prev.map((s) => s._id === id ? updated : s))
        } catch (error) {
            console.error('Error updating shift:', error)
        }
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
                        <tr key={shift._id}>
                            <td>{shift.client?.name}</td>
                            <td>{shift.service?.map((s) => s.title).join(', ')}</td>
                            <td>{shift.stylist?.name}</td>
                            <td>{shift.date}</td>
                            <td>{shift.time}</td>
                            <td>${shift.totalPrice}</td>
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
                                            onClick={() => handleStatusChange(shift._id, 'completed')}
                                        >
                                            ✓ Complete
                                        </button>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={() => handleStatusChange(shift._id, 'cancelled')}
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