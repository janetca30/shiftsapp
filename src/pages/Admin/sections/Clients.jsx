import { useState, useEffect } from 'react'
import ClientDetail from './ClientDetail'
import styles from '../Admin.module.css'
import { authService } from '@/services/api'

const Clients = () => {
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')
    const [selectedClient, setSelectedClient] = useState(null)

    useEffect(() => {
        authService.getClients()
            .then((data) => setClients(data))
            .catch((err) => console.error(err))
    }, [])

    const filtered = clients.filter((client) =>
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

    const handleView = async (client) => {
        try {
            const data = await authService.getClientById(client._id)
            setSelectedClient(data)
        } catch (error) {
            console.error('Error fetching client:', error)
        }
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
                    <th>Joined</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filtered.length === 0 ? (
                    <tr>
                        <td colSpan={5} className={styles.noResults}>No clients found</td>
                    </tr>
                ) : (
                    filtered.map((client) => (
                        <tr key={client._id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone || '—'}</td>
                            <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => handleView(client)}
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