import { create } from 'zustand'

const useUIStore = create((set) => ({
    loading: false,
    isModalOpen: false,
    notification: null, // { type: 'success' | 'error', message: '' }

    setLoading: (value) => set({ loading: value }),

    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),

    showNotification: (notification) => set({ notification }),
    clearNotification: () => set({ notification: null }),
}))

export default useUIStore