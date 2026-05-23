import { useState } from 'react'
import ClientDetail from './ClientDetail'
import styles from '../Admin.module.css'

const allClients = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@email.com',
        phone: '+1 234 567 890',
        visits: 8,
        lastVisit: '2026-05-20',
        shifts: [
            { id: 1, service: 'Haircut', date: '2026-05-20', time: '9:00 AM', status: 'completed' },
            { id: 2, service: 'Beard Trim', date: '2026-04-15', time: '10:00 AM', status: 'completed' },
            { id: 3, service: 'Shave', date: '2026-03-10', time: '11:00 AM', status: 'completed' },
        ]
    },
    {
        id: 2,
        name: 'Mike Smith',
        email: 'mike@email.com',
        phone: '+1 234 567 891',
        visits: 5,
        lastVisit: '2026-05-20',
        shifts: [
            { id: 4, service: 'Hair Treatment', date: '2026-05-20', time: '11:00 AM', status: 'completed' },
            { id: 5, service: 'Haircut', date: '2026-04-10', time: '2:00 PM', status: 'completed' },
        ]
    },
    {
        id: 3,
        name: 'Carlos Rivera',
        email: 'carlos@email.com',
        phone: '+1 234 567 892',
        visits: 12,
        lastVisit: '2026-05-18',
        shifts: [
            { id: 6, service: 'Haircut + Beard', date: '2026-05-18', time: '3:00 PM', status: 'completed' },
            { id: 7, service: 'Hair Color', date: '2026-04-20', time: '10:00 AM', status: 'completed' },
            { id: 8, service: 'Shave', date: '2026-03-05', time: '9:00 AM', status: 'cancelled' },
        ]
    },
    {
        id: 4,
        name: 'James Brown',
        email: 'james@email.com',
        phone: '+1 234 567 893',
        visits: 3,
        lastVisit: '2026-05-15',
        shifts: [
            { id: 9, service: 'Haircut', date: '2026-05-15', time: '4:00 PM', status: 'completed' },
        ]
    },
    {
        id: 5,
        name: 'Lucas White',
        email: 'lucas@email.com',
        phone: '+1 234 567 894',
        visits: 1,
        lastVisit: '2026-05-10',
        shifts: [
            { id: 10, service: 'Beard Trim', date: '2026-05-10', time: '1:00 PM', status: 'cancelled' },
        ]
    },
]

const Clients = () => {
    const [search, setSearch] = useState('')
    const [selectedClient, setSelectedClient] = useState(null)

    const filtered = allClients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
    )

    if (selectedClient) {
        return (
            <ClientDetail
                client={selectedClient}
                onBack={() => setSelectedClient(null)}
            />
        )
    }

    return (
        <div className={styles.clientsWrapper}>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <p className={styles.resultsCount}>{filtered.length} clients found</p>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Visits</th>
                    <th>Last Visit</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filtered.length === 0 ? (
                    <tr>
                        <td colSpan={6} className={styles.noResults}>No clients found</td>
                    </tr>
                ) : (
                    filtered.map((client) => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>
                                <span className={styles.visitsBadge}>{client.visits} visits</span>
                            </td>
                            <td>{client.lastVisit}</td>
                            <td>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => setSelectedClient(client)}
                                >
                                    View →
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Clients