import { useState, useEffect } from 'react'
import styles from '../Admin.module.css'
import sharedStyles from '@/styles/shared.module.css'
import { stylistService } from '@/services/api'
import useUIStore from '@/store/useUIStore'

const allSpecialties = ['Haircut', 'Shave', 'Beard Trim', 'Hair Treatment', 'Hair Color', 'Hair Wash']

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    specialties: [],
    status: 'active',
}

const Stylists = () => {
    const [stylists, setStylists] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const { showNotification } = useUIStore()

    const fetchStylists = async () => {
        const data = await stylistService.getAll()
        setStylists(data)
    }

    useEffect(() => {
        fetchStylists()
            .catch((err) => console.error(err))
    }, [])

    const handleOpen = (stylist = null) => {
        if (stylist) {
            setForm({
                name: stylist.name,
                email: stylist.email,
                phone: stylist.phone,
                specialties: stylist.specialties,
                status: stylist.status,
            })
            setEditingId(stylist._id)
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
        setForm({ ...form, specialties: updated })
    }

    const handleSave = async () => {
        if (!form.name || !form.email) return
        try {
            if (editingId) {
                const updated = await stylistService.update(editingId, form)
                setStylists((prev) => prev.map((s) => s._id === editingId ? updated : s))
            } else {
                const created = await stylistService.create(form)
                setStylists((prev) => [...prev, created])
            }
            showNotification({ type: 'success', message: editingId ? 'Stylist updated' : 'Stylist created' })
            handleClose()
        } catch (error) {
            showNotification({ type: 'error', message: error.message })
        }
    }

    const handleToggleStatus = async (stylist) => {
        const newStatus = stylist.status === 'active' ? 'inactive' : 'active'
        try {
            const updated = await stylistService.update(stylist._id, { ...stylist, status: newStatus })
            setStylists((prev) => prev.map((s) => s._id === stylist._id ? updated : s))
        } catch (error) {
            console.error('Error updating status:', error)
        }
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
                    <div key={stylist._id} className={styles.stylistCard}>
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
                                onClick={() => handleToggleStatus(stylist)}
                            >
                                {stylist.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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