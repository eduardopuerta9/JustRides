import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import { CreateComment } from '../services/PostServices'

const CommentForm = ({ post_id, user }) => {
  const initialState = {
    userId: user.id,
    postId: post_id,
    comment: '',
    userName: user.userName
  }
  const [comments, setComments] = useState([])
  const getComments = async () => {
    const res = await axios.get(
      `http://localhost:3001/comment/${post_id}/comments`
    )

    setComments(res.data)
  }
  const deleteComment = async (comment) => {
    await Client.delete(`http://localhost:3001/comment/${comment.id}/delete`)
    setComments(comments.filter((c) => c.id !== comment.id))
  }
  const [formValues, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formValues,
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
      userName: user.userName
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `http://localhost:3001/comment/addcomment/${post_id}/${user.id}`,
      formValues
    )
    setComments([...comments, res.data])
    setFormState(res.data)

    setFormState(initialState)
  }
  useEffect(() => {
    getComments()
  }, [])
  return (
    <div className="comment-form-container">
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="review">
            <h3 className="name">{comment.userName}'s Review</h3>
            <div className="rr">
              <h3 className="thing actualReview">{comment.comment}</h3>

              {comment.userId === user.id && (
                <button onClick={() => deleteComment(comment)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          id="comment"
          cols="20"
          rows="10"
          onChange={handleChange}
          value={formValues.comment}
          placeholder="Comment here..."
        ></textarea>
        <button type="submit" className="postButton" onClick={handleSubmit}>
          Comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
