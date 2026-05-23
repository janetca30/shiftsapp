import { useState } from 'react'
import styles from '../Admin.module.css'
import sharedStyles from '@/styles/shared.module.css'

const initialStylists = [
    {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@barbershop.com',
        phone: '+1 234 567 001',
        specialties: ['Haircut', 'Beard Trim', 'Shave'],
        status: 'active',
        shifts: 124,
        rating: 4.9,
    },
    {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria@barbershop.com',
        phone: '+1 234 567 002',
        specialties: ['Hair Color', 'Hair Treatment', 'Haircut'],
        status: 'active',
        shifts: 98,
        rating: 4.8,
    },
    {
        id: 3,
        name: 'Chris Lee',
        email: 'chris@barbershop.com',
        phone: '+1 234 567 003',
        specialties: ['Shave', 'Beard Trim'],
        status: 'inactive',
        shifts: 45,
        rating: 4.6,
    },
]

const allSpecialties = ['Haircut', 'Shave', 'Beard Trim', 'Hair Treatment', 'Hair Color', 'Hair Wash']

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    specialties: [],
    status: 'active',
}

const Stylists = () => {
    const [stylists, setStylists] = useState(initialStylists)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const handleOpen = (stylist = null) => {
        if (stylist) {
            setForm({
                name: stylist.name,
                email: stylist.email,
                phone: stylist.phone,
                specialties: stylist.specialties,
                status: stylist.status,
            })
            setEditingId(stylist.id)
        } else {
            setForm(emptyForm)
            setEditingId(null)
        }
        setShowForm(true)
    }

    const handleClose = () => {
        setShowForm(false)
        setForm(emptyForm)
        setEditingId(null)
    }

    const handleSpecialtyToggle = (specialty) => {
        const updated = form.specialties.includes(specialty)
            ? form.specialties.filter((s) => s !== specialty)
            : [...form.specialties, specialty]

        setForm({...form, specialties: updated})


    }

    const handleSave = () => {
        if (!form.name || !form.email) return

        if (editingId) {
            setStylists((prev) =>
                prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
            )
        } else {
            setStylists((prev) => [
                ...prev,
                { ...form, id: Date.now(), shifts: 0, rating: 0 },
            ])
        }
        handleClose()
    }

    const handleToggleStatus = (id) => {
        setStylists((prev) =>
            prev.map((s) =>
                s.id === id
                    ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
                    : s
            )
        )
    }

    return (
        <div className={styles.stylistsWrapper}>
            <div className={styles.stylistsHeader}>
                <p className={styles.resultsCount}>{stylists.length} stylists</p>
                <button className={styles.addBtn} onClick={() => handleOpen()}>
                    + Add Stylist
                </button>
            </div>

            <div className={styles.stylistsGrid}>
                {stylists.map((stylist) => (
                    <div key={stylist.id} className={styles.stylistCard}>
                        <div className={styles.stylistCardHeader}>
                            <div className={styles.stylistAvatar}>
                                {stylist.name.charAt(0)}
                            </div>
                            <span className={`${styles.badge} ${styles[stylist.status]}`}>
                {stylist.status}
              </span>
                        </div>

                        <h3 className={styles.stylistName}>{stylist.name}</h3>
                        <p className={styles.stylistContact}>📧 {stylist.email}</p>
                        <p className={styles.stylistContact}>📞 {stylist.phone}</p>

                        <div className={styles.stylistStats}>
                            <span>✂️ {stylist.shifts} shifts</span>
                            <span>⭐ {stylist.rating}</span>
                        </div>

                        <div className={sharedStyles.specialtiesList}>
                            {stylist.specialties.map((s) => (
                                <span key={s} className={sharedStyles.specialtyBadge}>{s}</span>
                            ))}
                        </div>

                        <div className={styles.stylistActions}>
                            <button
                                className={styles.editStylistBtn}
                                onClick={() => handleOpen(stylist)}
                            >
                                Edit
                            </button>
                            <button
                                className={stylist.status === 'active' ? styles.cancelBtn : styles.completeBtn}
                                onClick={() => handleToggleStatus(stylist.id)}
                            >
                                {stylist.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showForm && (
                <div className={styles.modalOverlay} onClick={handleClose}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{editingId ? 'Edit Stylist' : 'Add Stylist'}</h3>
                            <button className={styles.modalClose} onClick={handleClose}>✕</button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name *</label>
                            <input
                                className={styles.input}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Full name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email *</label>
                            <input
                                className={styles.input}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="email@barbershop.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone</label>
                            <input
                                className={styles.input}
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                placeholder="+1 234 567 890"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Specialties</label>
                            <div className={styles.specialtiesSelector}>
                                {allSpecialties.map((s) => (
                                    <button
                                        key={s}
                                        className={`${styles.specialtyOption} ${form.specialties.includes(s) ? styles.selectedSpecialty : ''}`}
                                        onClick={() => handleSpecialtyToggle(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Status</label>
                            <select
                                className={styles.select}
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={styles.cancelFormBtn} onClick={handleClose}>Cancel</button>
                            <button className={styles.saveBtn} onClick={handleSave}>
                                {editingId ? 'Save Changes' : 'Add Stylist'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Stylists