import { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useContacts } from '../../../../hooks/useContacts/useContacts'
import { ContactStatusType } from '../../../../types/contactTypes/contactTypes'
import { contactsSelector } from '../../../../store/contactsSlice/contactsSlice'

const CreateContactForm = ({ mode }: { mode: 'create' | 'edit' }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [status, setStatus] = useState<ContactStatusType>('active')
  const contactList = useSelector(contactsSelector)
  const { contactId } = useParams()

  useEffect(() => {
    // fills up the form if mode is edit
    if (mode === 'edit') {
      // if mode is edit it takes the contact id from params and finds the contact data
      const contact = contactList.find((v) => v.id === contactId)
      if (!contact) return
      setFirstName(contact.firstName)
      setLastName(contact.lastName)
      setStatus(contact.status)
    }
  }, [contactList, contactId, mode])

  const { addContact, editContact } = useContacts()
  const params = useParams()
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mode === 'edit'
      ? editContact(params.contactId || '', { firstName, lastName, status })
      : addContact(firstName, lastName, status)

    navigate('/contacts')
  }

  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="mb-5 text-2xl">
        {mode === 'edit' ? 'Edit contact' : 'Create contact'}
      </h2>
      <form className="flex flex-col gap-5 justify-center" onSubmit={onSubmit}>
        <div className="flex gap-2">
          <label htmlFor="first-name" className="w-20 text-center">
            First Name:
          </label>
          <input
            id={'first-name'}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="last-name" className="w-20 text-center">
            Last Name:
          </label>
          <input
            id={'last-name'}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-20 text-center">Status:</div>
          <div className="flex flex-col text-left">
            <label>
              <input
                type="radio"
                name="radioGroup"
                value="active"
                checked={status === 'active' ? true : false}
                onChange={(e) => setStatus(e.target.value as ContactStatusType)}
              />
              <span className="ml-2">Active</span>
            </label>
            <label>
              <input
                type="radio"
                name="radioGroup"
                value="inActive"
                checked={status === 'inActive' ? true : false}
                onChange={(e) => setStatus(e.target.value as ContactStatusType)}
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white px-4 py-2 rounded-md text-lg bg-green-500 hover:bg-green-700 justify-self-center"
        >
          {mode === 'edit' ? 'Save Edited Contact' : 'Save Contact'}
        </button>
      </form>
    </div>
  )
}

export default CreateContactForm
