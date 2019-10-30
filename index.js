// code away!
const server = require('./server')

const postRouter = require('./posts/postRouter')
server.use('/api/posts', postRouter);

const userRouter = require('./users/userRouter')
server.use('/api/users', userRouter)

server.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
  });