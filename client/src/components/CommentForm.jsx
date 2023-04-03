import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import {CreateComment} from '../services/PostServices'

const CommentForm = ({ post, user}) => {
  const initialState = {
    comment: '',
    
    userName: user.userName,
    
  }

  const [formValues, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({ ...formValues, [e.target.id]: e.target.value})
    console.log(formValues)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/comment/addcomment/${post.id}`, formValues)

    setFormState(initialState)

    
  }
  return (
    <div className='comment-form-container'>
      <form className="form" onSubmit={handleSubmit}>
        <textarea id="comment" cols="50" rows="10" onChange={handleChange} value={formValues.comment} placeholder="Comment here..."></textarea>
          <button type="submit" className='postButton' onClick={handleSubmit}>Comment</button>
      </form>
      </div>
    
  )
}

export default CommentForm
