import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

const SidebarItems = [
  {
    id: crypto.randomUUID(),
    to: '/contacts',
    text: 'Contact',
  },
  {
    id: crypto.randomUUID(),
    to: '/charts-and-maps',
    text: 'Chart and Maps',
  },
]

const Sidebar = ({
  active,
  closeButtonClick,
}: {
  active: boolean
  closeButtonClick: () => void
}) => {
  return (
    <aside className={`${active ? 'active' : ''}`}>
      <button
        className="sm:hidden p-2 absolute top-2 right-2"
        onClick={closeButtonClick}
      >
        <FontAwesomeIcon icon={faTimes} className="text-gray-700 h-6 w-6" />
      </button>
      <nav>
        <ul className="text-base md:text-lg flex flex-col gap-2 py-7">
          {SidebarItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `w-full inline-block py-3 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100' : 'bg-transparent'
                  }`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
