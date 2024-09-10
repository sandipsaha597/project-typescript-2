import { Route, Routes } from 'react-router-dom'
import PageLayout1 from '../../components/layouts/PageLayout1/PageLayout1'
import ContactsDashboard from './components/ContactDashboard/ContactDashboard'
import ContactView from './components/ContactView/ContactView'
import CreateContactForm from './components/CreateContactForm/CreateContactForm'

const ContactsPage = () => {
  return (
    <PageLayout1 pageTitle="Contact Page">
      <Routes>
        <Route path="/" element={<ContactsDashboard />} />
        <Route path="/create-view/:contactId" element={<ContactView />} />
        <Route
          path="/create-contact"
          element={<CreateContactForm mode="create" />}
        />
        <Route
          path="/edit-contact/:contactId"
          element={<CreateContactForm mode="edit" />}
        />
      </Routes>
    </PageLayout1>
  )
}

export default ContactsPage
