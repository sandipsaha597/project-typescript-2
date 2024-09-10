import { useSelector } from 'react-redux'
import { contactsSelector } from '../../../../store/contactsSlice/contactsSlice'
import { useParams } from 'react-router-dom'

const ContactView = () => {
  const contactList = useSelector(contactsSelector)
  const { contactId } = useParams()

  const contact = contactList.find((v) => v.id === contactId)

  return (
    <div>
      <div>First Name: {contact?.firstName}</div>
      <div>Last Name: {contact?.lastName}</div>
      <div>Status: {contact?.status === 'active' ? 'Active' : 'In active'}</div>
    </div>
  )
}

export default ContactView
