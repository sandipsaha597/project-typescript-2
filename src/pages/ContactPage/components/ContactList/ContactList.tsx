import { ContactType } from '../../../../types/contactTypes/contactTypes'
import ContactCard from '../ContactCard/ContactCard'

const ContactList = ({
  contactList,
  deleteContact,
}: {
  contactList: ContactType[]
  deleteContact: (contactId: string) => void
}) => {
  return (
    // in mobile view it's 1 column, in tablet it's 2 and in laptop or desktop it's 3 columns
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {contactList.map((contact: ContactType) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={() => deleteContact(contact.id)}
        />
      ))}
    </div>
  )
}

export default ContactList
