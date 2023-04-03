import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import {CreateComment} from '../services/PostServices'

const CommentForm = ({ post_id, user, setLoaded}) => {
  const initialState = {
    userId:user.id,
    postId:parseInt(post_id),
    comment: '',
    userName: user.userName,

    
  }

  const [formValues, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({ ...formValues, [e.target.id]: e.target.value, [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
      userName: user.userName})
      console.log(formValues)
      setLoaded(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res= await Client.post(`http://localhost:3001/comment/addcomment/${post_id}/${user.id}`, formValues)

    setFormState(res.data)
    setFormState(initialState)
    setLoaded(true)

    
  }
  return (
    <div className='comment-form-container'>
      <form className="form" onSubmit={handleSubmit}>
        <textarea id="comment" cols="20" rows="10" onChange={handleChange} value={formValues.comment} placeholder="Comment here..."></textarea>
          <button type="submit" className='postButton' onClick={handleSubmit}>Comment</button>
      </form>
      </div>
    
  )
}

export default CommentForm
