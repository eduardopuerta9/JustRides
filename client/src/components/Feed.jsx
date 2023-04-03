import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [commentId, setCommentId] = useState(1)
  const [userName, setUserName] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  let { post_id } = useParams()
  let { user_id } = useParams()
  const getPostInfo = async () => {
    const res = await axios.get(`http://localhost:3001/post`)
    setPosts(res.data)
  }

  const deletePost = async (post) => {
    await Client.delete(`http://localhost:3001/post/${post.id}`)
    setPosts(posts.filter((c) => c.id !== post.id))
  }
  const getUserName = async () => {
    const userName = await axios.get(
      `http://localhost:3001/auth/${user.id}/details`
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
            <h3>{post.message}</h3>
          </div>
          <div className="postImage">
            <img src={post.image} />
          </div>
          <div className="postStart">
            <h3>Starting: {post.startLocation}</h3>
          </div>
          <div className="postEnd">
            <h3>Ending: {post.endLocation}</h3>
          </div>
          <div className="postDistance">
            <h3> Distance: {post.distance}</h3>
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
              // getUserName={getUserName}
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
