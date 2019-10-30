// code away!
const server = require('./server')
const userdb = require('./users/userDb')
const postdb = require('./posts/postDb') 
const { validateUserId, validateUser, validatePost } = require('./middleware/index')

const postRouter = require('./posts/postRouter')
server.use('/api/posts', postRouter);
const userRouter = require('./users/userRouter')
server.use('/api/users', userRouter)
// GET ALL USERS
server.get('/api/users', (req, res) =>{
  
})

//GET USERS BY ID
server.get('/api/users/:id', (req, res) =>{
 
})

//ADD A USER
server.post('/api/users', validateUser, (req, res) => {
  
})

//DELETE USER BY ID
server.delete('/api/users/:id', validateUserId, (req, res) => {
})

//EDIT USER BY ID
server.put('/api/users/:id', validateUserId, (req, res) =>{

})

//GET POSTS BY USER ID
server.get('/api/posts/:id', validateUserId, (req, res) => {
 
})

//ADD POST
server.post('/api/posts/:id', validateUserId, validatePost, (req, res) => {
})


server.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
  });