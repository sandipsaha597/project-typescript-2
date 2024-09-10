import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import ChartsAndMapsPage from './pages/ChartsAndMapsPage/ChartsAndMapsPage'
import ContactsPage from './pages/ContactPage/ContactPage'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // if location is homepage redirect to "/contacts" currently there's no homepage
    if (location.pathname === '/') navigate('/contacts')
  }, [location.pathname, navigate])
  return (
    <div className="App">
      <Routes>
        {/* Contact page routes with nested routes in side of it like 
        /create-contact, /edit-contact etc */}
        <Route path="/contacts/*" element={<ContactsPage />} />
        <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
      </Routes>
    </div>
  )
}

export default App
