
import '../App.css'
import { Link } from 'react-router-dom'
const Home = ()=> {
  return(
    <section className='startSection'>
      
      <h1 className="WelcomeMessage">Welcome to Just rides</h1>
      <Link to={`/api/auth/register`}>
        
      <button className="SignUp">Sign Up</button>
      </Link>
      <Link to={`/api/auth/login`}>

      <button className="LogIn">Log In</button>
      </Link>
    </section>
  )
}
export default Home