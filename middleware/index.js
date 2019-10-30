const userdb = require('../users/userDb')

function validateUserId(req, res, next) {
  const { id } = req.params
  userdb.getById(id)
  .then(user => {
    if(!user){
      res.status(404).json({message: "There is no user with the specified ID."})
    } else {
      next()
    }
})
}

function validateUser (req, res, next) {
    if (!req.body.name){
        res.status(400).json({message: "Please include a name in your request"})
    } else {
        next()
    }
}

function validatePost (req, res, next) {
    if(!req.body){
        res.status(400).json({message: "Please include data for your request"})
    } else if (!req.body.text) {
        res.status(400).json({message: "Please include text for your post"})
    } else {
        next()
    }
}


module.exports = { validateUserId, validateUser, validatePost }