import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { authService } from '@/services/api'
import styles from './Login.module.css'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setError('')

        if (!form.email || !form.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)

        try {
            const data = await authService.login(form)
            localStorage.setItem('token', data.token)
            login({ name: data.name, email: data.email, role: data.role })
            navigate('/admin')
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
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="admin@barbershop.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className={styles.hint}>
                    Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login