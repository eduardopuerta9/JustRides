import '../styles/home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <section className="startSection">
      <h1 className="WelcomeMessage">Welcome to JUST RIDES</h1>
      <Link to={`/register`}>
        <button className="SignUp">Sign Up</button>
      </Link>
      <Link to={`/login`}>
        <button className="LogIn">Log In</button>
      </Link>
    </section>
  )
}
export default Home
