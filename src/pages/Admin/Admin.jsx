import { useState } from 'react'
import Dashboard from './sections/Dashboard'
import Shifts from './sections/Shifts'
import Clients from './sections/Clients'
import Stylists from './sections/Stylists'
import styles from './Admin.module.css'

const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'shifts', label: '📅 Shifts' },
    { id: 'clients', label: '👥 Clients' },
    { id: 'stylists', label: '💈 Stylists' },
]

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard')

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Manage your barbershop</p>
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'shifts' && <Shifts />}
                {activeTab === 'clients' && <Clients />}
                {activeTab === 'stylists' && <Stylists />}
            </div>
        </div>
    )
}

export default Admin