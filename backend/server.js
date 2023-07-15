const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')
const PostRouter = require('./routes/PostRouter')
const CommentRouter = require('./routes/CommentRouter')
const AppRouter = require('./routes/AppRouter')
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
const app = express()

const PORT = process.env.PORT || 3001

// ... rest of your server code ...

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', AppRouter)
// app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/post', PostRouter)
app.use('/comment', CommentRouter)

app.options('/url...', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Headers', 'accept, content-type')
  res.header('Access-Control-Max-Age', '1728000')
  return res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
