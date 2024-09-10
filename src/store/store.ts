import { configureStore } from '@reduxjs/toolkit'
import contactsSliceReducer from './contactsSlice/contactsSlice'

/**
 * Redux store configuration using @reduxjs/toolkit, the officially recommended way to use Redux.
 */

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
  },
})
