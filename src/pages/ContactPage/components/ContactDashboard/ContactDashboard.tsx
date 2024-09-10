import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useContacts } from '../../../../hooks/useContacts/useContacts'
import { contactsSelector } from '../../../../store/contactsSlice/contactsSlice'
import ContactList from '../ContactList/ContactList'

// main contact dashboard page where user can see all the contacts
// available and create new contacts, edit/view/delete existing contacts
const ContactsDashboard = () => {
  // getting contactList from redux store
  const contactList = useSelector(contactsSelector)
  const { deleteContact } = useContacts()

  return (
    <div className="px-5">
      <div className="my-10">
        {/* clicking the below link will redirect the user to a page/form where user will
        be able to fill in details and create a new contact */}
        <NavLink
          to={'create-contact'}
          className={
            'text-white px-4 py-2 rounded-md text-lg font-medium bg-green-500 hover:bg-green-700'
          }
        >
          Create Contact
        </NavLink>
      </div>
      {contactList.length === 0 ? (
        <div className="p-4 flex items-center w-full md:w-3/4 lg:w-2/4 border-2 border-black m-auto py-2">
          <div className="pr-4">
            <FontAwesomeIcon size="3x" icon={faCircleXmark} />
          </div>
          <span className="text-xl md:text-2xl text-left">
            No contact found please add contact from create contact button
          </span>
        </div>
      ) : (
        <ContactList contactList={contactList} deleteContact={deleteContact} />
      )}
    </div>
  )
}

export default ContactsDashboard
