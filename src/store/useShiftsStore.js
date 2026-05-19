import { create } from 'zustand'

const useShiftsStore = create((set) => ({
    shifts: [],
    selectedShift: null,

    setShifts: (shifts) => set({ shifts }),

    addShift: (shift) => set((state) => ({
        shifts: [...state.shifts, shift]
    })),

    cancelShift: (shiftId) => set((state) => ({
        shifts: state.shifts.filter((s) => s.id !== shiftId)
    })),

    selectShift: (shift) => set({ selectedShift: shift }),

    clearSelection: () => set({ selectedShift: null }),
}))

export default useShiftsStore