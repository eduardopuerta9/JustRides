import { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'
import {CreateComment} from '../services/PostServices'

const CommentForm = ({ props, getAllPosts, posts, userName, post_id, user }) => {
  const initialState = {
    comment: '',
    userId: user.id,
    userName: '',
    postId: parseInt(post_id)
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    const { name, value}= e.target 
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`http://localhost:3001/comment/${post_id}/addcomment`, formValues).then(()=>{})

    setFormValues(initialState)

    getAllPosts()
  }
  return (
      <form className="form" onSubmit={handleSubmit}>
        <textarea id="review" cols="50" rows="10" onChange={handleChange} value={formValues.comment} placeholder="Comment here..."></textarea>
          <button type="submit" className='postButton'>Post</button>
      </form>
    
  )
}

export default CommentForm
