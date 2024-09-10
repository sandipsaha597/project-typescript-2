import { NavLink } from 'react-router-dom'
import { ContactType } from '../../../../types/contactTypes/contactTypes'

const ContactCard = ({
  contact,
  onDelete,
}: {
  contact: ContactType
  onDelete: () => void
}) => {
  return (
    <div className="bg-white border-2 border-black p-6 text-center">
      <div className="truncate">
        {contact.firstName} {contact.lastName}
      </div>
      <div className="flex flex-col items-center gap-2">
        <NavLink
          to={'create-view/' + contact.id}
          className={
            'text-white px-2 py-1 rounded-md text-sm bg-green-500 hover:bg-green-700'
          }
        >
          View
        </NavLink>
        <NavLink
          to={'edit-contact/' + contact.id}
          className={
            'text-white px-2 py-1 rounded-md text-sm bg-green-500 hover:bg-green-700'
          }
        >
          Edit
        </NavLink>
        <button
          onClick={onDelete}
          className={
            'text-white px-2 py-1 rounded-md text-sm bg-red-600 hover:bg-red-800'
          }
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ContactCard
