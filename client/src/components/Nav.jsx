import { NavLink } from 'react-router-dom'
import '../App.css'
import '../styles/nav.css'
const Nav = ({ user, handleLogout, checkToken }) => {
  let userOptions
  return user ? (
    <nav className="Nav-Bar">
      <div className="links">
        <h1 className="title">JUST RIDES</h1>
        <NavLink to="/feed" className="Nav-Bar link">
          FEED
        </NavLink>
        <NavLink to="/post/create" className="Nav-Bar link">
          CREATE POST
        </NavLink>
        <NavLink to="/" onClick={handleLogout} className="Nav-Bar link">
          LOG OUT
        </NavLink>
      </div>
      <div className="just-rides"></div>
      <div>
        {user.id === 1 && (
          <NavLink to="/admincontrols" className="Nav-Bar link">
            <div className="adminControls">
              <span className="material-symbols-outlined" id="settings-icon">
                settings_input_component
              </span>{' '}
              <h1 className="admin">ADMIN</h1>
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  ) : (
    <nav className="Nav-Bar">
      <NavLink to="/register" className="Nav-Bar link"></NavLink>
      <NavLink to="/login" className="Nav-Bar  link"></NavLink>
      <NavLink to="/createpost" className="Nav-Bar  link"></NavLink>
    </nav>
  )
}

export default Nav
