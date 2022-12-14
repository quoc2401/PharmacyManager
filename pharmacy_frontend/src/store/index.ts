import { User } from './../shared/types'
import create from 'zustand'
import { setAuthToken } from '../api/axiosClient'

interface StoreType {
  currentUser: undefined | null | User
  setCurrentUser: (user: User | null) => void
  logout: () => void
  lastCount: number | string
  setLastCount: (count: number | string) => void
}

export const useStore = create<StoreType>(set => ({
  currentUser: undefined,
  setCurrentUser: user => set({ currentUser: user }),
  logout: () => {
    localStorage.removeItem('pharmacy-token')
    setAuthToken(null)
    set({ currentUser: null })
    localStorage.setItem('last-visit', new Date().toISOString())
  },
  lastCount: '0',
  setLastCount: count => set({ lastCount: count })
}))
