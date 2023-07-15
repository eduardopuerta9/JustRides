const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const PostRouter = require('./routes/PostRouter')
const CommentRouter = require('./routes/CommentRouter')
const AppRouter = require('./routes/AppRouter')

const app = express()

const PORT = process.env.PORT || 3001

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', AppRouter)
// app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/post', PostRouter)
app.use('/comment', CommentRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
