import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogout, checkToken }) => {
  let userOptions
  return user ? (
    <nav className="Nav-Bar">
      <div className="links">
        <NavLink to="/feed" className="Nav-Bar link">
          FEED
        </NavLink>
        <NavLink to="/api/post/create" className="Nav-Bar link">
          CREATE POST
        </NavLink>
        <NavLink to="/" onClick={handleLogout} className="Nav-Bar link">
          LOG OUT
        </NavLink>
      </div>
      <div className="just-rides">
        <h1 className="title">JUST</h1>
        <h1 className="rides">RIDES</h1>
      </div>
      <div>
        {user.id === 1 && (
          <NavLink to="/admincontrols" className="Nav-Bar link">
            <div className='adminControls'>
              <span className="material-symbols-outlined" id="settings-icon">
                settings_input_component
              </span>{' '}
              <h1 className="admin">ADMIN</h1>
            </div>
          </NavLink>
        )}
        {user.id !== 1 && (
          <NavLink to="/about" className="Nav-Bar link">
            About
          </NavLink>
        )}
      </div>
    </nav>
  ) : (
    <nav className="Nav-Bar">
    
      <NavLink to="/register" className="Nav-Bar link">
        
      </NavLink>
      <NavLink to="/login" className="Nav-Bar  link">
       
      </NavLink>
      <NavLink to="/createpost" className="Nav-Bar  link">
       
      </NavLink>
    </nav>
  )
}

export default Nav