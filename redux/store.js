import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import DarkModeReducer from './DarkModeReducer'
import SiteSlice from './SiteSlice'
import MedicalSlice from './MedicalSlice'

export const store = configureStore({
  reducer: {
    UserAuth: AuthSlice,
    darkMode : DarkModeReducer,
    sites: SiteSlice,
    medical: MedicalSlice
  },
})