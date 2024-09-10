import { useCallback } from 'react'
import { contactsSliceActions } from '../../store/contactsSlice/contactsSlice'
import { useDispatch } from 'react-redux'
import {
  ContactStatusType,
  ContactType,
} from '../../types/contactTypes/contactTypes'

/**
 * a reusable custom hook to modify global contactList state
 * @returns {Object} - returns methods to add, delete, edit contact
 */
export const useContacts = () => {
  const dispatch = useDispatch()

  /**
   * Function to add a new contact.
   * Generates a unique ID using the crypto.randomUUID() method,
   * then dispatches an action to add the contact to the Redux store.
   *
   * @param firstName - The first name of the contact
   * @param lastName - The last name of the contact
   * @param status - The status of the contact (active/inactive)
   */
  const addContact = useCallback(
    (firstName: string, lastName: string, status: ContactStatusType) => {
      const id = crypto.randomUUID() // generates cryptographically safe unique id
      dispatch(
        contactsSliceActions.addContact({
          id,
          firstName,
          lastName,
          status,
        })
      )
    },
    [dispatch]
  )

  /**
   * Function to delete a contact by ID.
   * Dispatches an action to remove the contact from the Redux store.
   *
   * @param id - The unique ID of the contact to be deleted
   */
  const deleteContact = useCallback(
    (id: string) => {
      if (!id) return
      dispatch(contactsSliceActions.deleteContact({ id }))
    },
    [dispatch]
  )

  /**
   * Function to edit the details of an existing contact.
   * Checks if the contact ID exists, then dispatches an action
   * to update the contact in the Redux store with new details.
   *
   * @param id - The unique ID of the contact to be edited
   * @param newDetails - The updated contact details excluding the ID
   */
  const editContact = useCallback(
    (id: string, newDetails: Omit<ContactType, 'id'>) => {
      if (!id) return
      dispatch(contactsSliceActions.editContact({ id, newDetails }))
    },
    [dispatch]
  )

  return { addContact, deleteContact, editContact }
}
