import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { authService } from '@/services/api'
import styles from './Register.module.css'

const Register = () => {
    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setError('')

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError('Please fill in all fields')
            return
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            const data = await authService.register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: 'client',
            })
            localStorage.setItem('token', data.token)
            login({ name: data.name, email: data.email, role: data.role })
            navigate('/booking')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>✂️ BarberShop</h1>
                    <p className={styles.subtitle}>Create your account</p>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                        className={styles.input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone</label>
                    <input
                        className={styles.input}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input
                        className={styles.input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                </div>

                <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <p className={styles.loginLink}>
                    Already have an account? <Link to="/login" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default Register