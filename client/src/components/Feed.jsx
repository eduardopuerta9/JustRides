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
    const res = await axios.get(`http://localhost:3001/api/post/${post_id}/details`)
    setPosts(res.data)
  }
 
  const getUserName = async () => {
    const userName = await axios.get(
      `http://localhost:3001/auth/${user.id}/details`
    )
    setUserName(userName.data.userName)
    setUserDetails(userName.data)
  }
  useEffect(()=> {
    getUserName()
    getPostInfo()
  }, [loaded])

  return   (
    <><div className='postid'>
      <h1>{posts.id}</h1>
    </div><div className='post image'>
        <img src={posts.image} className="image" />
      </div></>


  )

}
export default Feed