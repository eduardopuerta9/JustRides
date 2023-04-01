import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'


const CommentForm = ({ post_id, user, userName, getUserName, setLoaded }) => {
  let username = userName
  const initialState = {
    comment: '',
    userId: user.id,
    userName: '',
    postId: parseInt(post_id)
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
      userName: userName
    })
    setLoaded(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `http://localhost:3001/api/comment/${post_id}/addcomment`,
      formValues
    )

    setFormValues(res.data)
    setFormValues(initialState)

    setLoaded(true)
  }

  useEffect(() => {
    getUserName()
  }, [formValues])
  return (
    <div className='formDiv'>
      <h1>Comment!</h1>
      <form onSubmit={handleSubmit}>
        <textarea id="review" cols="50" rows="10" onChange={handleChange} value={formValues.comment} placeholder="Comment here..."></textarea>
          <button type="submit" className='postButton'>Post</button>
      </form>
    </div>
  )
}

export default CommentForm
