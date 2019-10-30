const express = 'express';
const router = require("express").Router();
const { validateUserId, validateUser, validatePost } = require('../middleware/index')
const userdb = require('./userDb')
const postdb = require('../posts/postDb')

// ADD USER
router.post('/', validateUser, (req, res) => {
    const user = req.body
    userdb.insert(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error creating a user."})
    })
});

// ADD POST BY USER
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body
  postdb.insert({user_id: req.params.id, text: post.text})
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error creating a post"})
  })
});

// GET ALL USERS
router.get('/', (req, res) => {
    userdb.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error retrieving users from the database."})
    })
});

// GET USER BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params
    userdb.getById(id)
    .then(user => {
      if (user){
        res.status(200).json(user)
      } else {
        res.status(404).json({message: "There is no user by that specified ID."})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error retrieving a user from the database."})
    })
});

// GET POSTS BY USER
router.get('/:id/posts', validateUserId, (req, res) => {
    userdb.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error retrieving posts."})
    })
});

// DELETE USER
router.delete('/:id', validateUserId, (req, res) => {
  userdb.remove(req.params.id)
  .then(id => {
    res.status(200).json({message: `User with ID ${req.params.id} deleted.`})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error deleting a user from the database."})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  userdb.update(req.params.id, req.body)
  .then(changes => {
    userdb.getById(req.params.id)
    .then(user => {
      res.status(200).json({"User has been updated to": user.name})
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "There was an error updating the user in the database."})
  })
});


module.exports = router;
