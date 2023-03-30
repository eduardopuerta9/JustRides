import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { Link } from 'react-router-dom'

const Feed= ({ user})=> {
  const [posts, setPosts]= useState([])
  const [userName, setUserName]= useState('')
  const [loaded, setLoaded]= useState(false)
  const [userDetails, setUserDetails] = useState({})
  let { post_id } = useParams()
  const getPostInfo = async () => {
    let res = await axios.get(`http://localhost:3001/api/post`)
    setPosts(res.data[0])
    
  }
 console.log(posts)
  const getUserName = async () => {
    const userName = await axios.get(
      `http://localhost:3001/api/auth/${user.id}/details`
    )
    setUserName(userName.data.userName)
    setUserDetails(userName.data)
  }
  useEffect(()=> {
    getUserName()
    getPostInfo()
  }, [loaded])

  return user ?  (
    <div className='Posts'>

        <div className='postUserName'>
        <h2>{posts.userName}</h2><h3>{posts.message}</h3>
        </div>
        <div className='postImage'>
        <img src={posts.image} />
        </div>
        <div className='postStart'>
        <h3>Starting: {posts.startLocation}</h3>
        </div>
        <div className='postEnd'>
        <h3>Ending: {posts.endLocation}</h3>
        </div>
        <div className='postDistance'>
        <h3> Distance: {posts.distance}</h3>
        </div>
        <div className='postTime'>
        <h3>{posts.Time}</h3>
        </div>
        <div className='comments'>
    </div>
    </div>

      


  ) : (
    <div>
      <h1>Please Sign In!</h1>
      <Link to="/login" className="register-login">
        Sign In
      </Link>
      <h1>
        Don't have an account?{' '}
        <Link to="/register" className="create-new-account">
          Create New Account
        </Link>
      </h1>
    </div>
  )

}
export default Feed