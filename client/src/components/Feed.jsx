import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import '../App.css'
import '../styles/feed.css'

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [commentId, setCommentId] = useState(1)
  const [userName, setUserName] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  let { post_id } = useParams()
  let { user_id } = useParams()
  const getPostInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVERURL}/post`)
      const reversedPosts = res.data.reverse()
      setPosts(reversedPosts)
    } catch (error) {
      console.error('Error fetching post information:', error)
      // Handle the error, such as showing an error message to the user
    }
  }

  const deletePost = async (post) => {
    await Client.delete(`${process.env.REACT_APP_SERVERURL}/post/${post.id}`)
    setPosts(posts.filter((c) => c.id !== post.id))
  }
  const getUserName = async () => {
    const userName = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/auth/${user.id}/details`
    )
    setUserName(userName.data.userName)
    setUserDetails(userName.data)
  }
  useEffect(() => {
    getUserName()
    getPostInfo()
  }, [loaded])

  return user ? (
    <div className="Posts">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="postUserName">
            <h2>{post.userName}</h2>
          </div>
          <div className="postImage">
            <img src={post.image} />
          </div>
          <div className="postUserName">
            <h2 style={{ fontStyle: 'italic' }}>
              <strong>{post.userName}</strong>
            </h2>
            <h2>{post.message}</h2>
          </div>
          <div className="postStart">
            <h4>Starting: {post.startLocation}</h4>
          </div>
          <div className="postEnd">
            <h4>Ending: {post.endLocation}</h4>
          </div>
          <div className="postDistance">
            <h4> Distance: {post.distance}</h4>
          </div>
          <div className="postTime">
            <h3>{post.Time}</h3>
            {post.userId === user.id && (
              <button onClick={() => deletePost(post)}>Delete</button>
            )}
          </div>
          <div className="commentForm">
            <CommentForm
              post_id={parseInt(post.id)}
              user={user}
              userName={userName}
              setLoaded={setLoaded}
            />
          </div>
        </div>
      ))}
      <div className="comments"></div>
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
