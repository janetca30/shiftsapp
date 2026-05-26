import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    role: null, // 'admin' | 'client'

    login: (userData) => set({
        user: userData,
        isAuthenticated: true,
        role: userData.role
    }),

    logout: () => {
        localStorage.removeItem('token')
        set({
            user: null,
            isAuthenticated: false,
            role: null
        })
    },
}))

export default useAuthStore