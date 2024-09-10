import { createSlice } from '@reduxjs/toolkit'
import { ContactType } from '../../types/contactTypes/contactTypes'

const initialState: ContactType[] = []
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Action to add a new contact.
    addContact: (state, { payload }) => {
      const { id, firstName, lastName, status } = payload
      state.push({
        id,
        firstName,
        lastName,
        status,
      })
    },

    // Action to edit the details of an existing contact.
    editContact: (state, { payload }) => {
      if (!payload.id) return
      const contactIndex = state.findIndex((v) => v.id === payload.id)
      const { firstName, lastName, status } = payload.newDetails
      if (contactIndex === -1) return
      const contact = state[contactIndex]
      contact.firstName = firstName
      contact.lastName = lastName
      contact.status = status
    },

    // Action to delete a contact by ID.
    deleteContact: (state, { payload }) => {
      const filteredContacts = state.filter((v) => v.id !== payload.id)
      return filteredContacts
    },
  },
})

const contactsSliceReducer = contactsSlice.reducer
export const contactsSliceActions = contactsSlice.actions

export const contactsSelector = (state: { contacts: ContactType[] }) =>
  state.contacts

export default contactsSliceReducer
