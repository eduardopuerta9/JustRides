import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

const Feed= ({ user})=> {
  const [posts, setPosts]= useState([])
  const[comments, setComments]= useState([])
  const [commentId, setCommentId] = useState(1)
  const [userName, setUserName]= useState('')
  const [loaded, setLoaded]= useState(false)
  const [userDetails, setUserDetails] = useState({})
  let { post_id } = useParams()
  const getPostInfo = async () => {
    let res = await axios.get(`http://localhost:3001/api/post`)
    setPosts(res.data[0])
    
  }
 console.log(posts)
 const getComments = async () => {
  let comments = await axios.get(
    `http://localhost:3001/api/comment/${post_id}/comment`
  )

  setComments((comments.data).reverse())
  setLoaded(false)
}
  const getUserName = async () => {
    const userName = await axios.get(
      `http://localhost:3001/api/auth/${user.id}/details`
    )
    setUserName(userName.data.userName)
    setUserDetails(userName.data)
  }
  useEffect(()=> {
    getUserName()
    getComments()
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
    <div className='reviewForm'>
    <CommentForm
      post_id={post_id}
      user={user}
      userName={userName}
      getUserName={getUserName}
      setLoaded={setLoaded}
    />
  </div>
  <div className="reviews-section">
    {comments.map((comment) => (
      <div key={comment.id} className="review">
        <h3 className='name'>{comment.userName}'s Review</h3>
        <div className='rr'>
          <h3 className='thing actualReview'>{comment.comment}</h3>
          


          {/* {comment.userName === userDetails.userName && !displayUpdate && (
            <div className="userButtons">
              <button className="reviewButton" onClick={() => deleteReview(comment)}>
                Delete
              </button>
              <button onClick={() => displayUpdateForm(comment.id)} className="reviewButton">
                Update
              </button>
            </div>
          )}
          {displayUpdate && comment.id === commentId && (
            <UpdateCommentForm
              userDetails={userDetails}
              comments={comments}
              commentId={commentId}
              setLoaded={setLoaded}
              
              comment={comment.comment}
            />
          )} */}
        </div>
      </div>
    ))}
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