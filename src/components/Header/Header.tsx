import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({
  title,
  menuClick,
}: {
  title: string
  menuClick: () => void
}) => {
  return (
    <header className="h-12 sm:h-16 bg-sky-500 flex items-center justify-center relative">
      <button className="sm:hidden p-2 absolute left-5" onClick={menuClick}>
        <FontAwesomeIcon icon={faBars} className="text-gray-700 h-6 w-6" />
      </button>
      <h1 className="text-xl sm:text-3xl">{title}</h1>
    </header>
  )
}

export default Header
