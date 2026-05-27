import { useEffect } from 'react'
import useUIStore from '@/store/useUIStore'
import styles from './Notification.module.css'

const Notification = () => {
    const { notification, clearNotification } = useUIStore()

    useEffect(() => {
        if (!notification) return
        const timer = setTimeout(() => clearNotification(), 3000)
        return () => clearTimeout(timer)
    }, [notification, clearNotification])

    if (!notification) return null

    return (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
      <span className={styles.icon}>
        {notification.type === 'success' ? '✅' : '❌'}
      </span>
            <p className={styles.message}>{notification.message}</p>
            <button className={styles.close} onClick={clearNotification}>✕</button>
        </div>
    )
}

export default Notification