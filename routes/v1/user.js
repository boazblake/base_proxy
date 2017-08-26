let Router = require('express').Router;
const userRouter = Router()
let helpers = require('../../config/helpers.js')

let User = require('../../db/v1/userSchema.js')


userRouter
  .get('/', function(req, res){
    User.find(req.query , "-password", function(err, results){
      if(err) return res.json(err)
      res.json(results)
    })
  })

userRouter
  .get('/:_id', function(req, res){
    User.findById(req.params._id, "-password", function(err, record){
      if(err || !record ) return res.json(err)
      res.json(record)
    })
  })

userRouter
  .put('/:_id', function(req, res){
    User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          res.status(500).send(err)
        }
        else if (!record) {
          res.status(400).send('no record found with that id')
        }
        else {
          res.json(Object.assign({},req.body,record))
        }
    })
  })

userRouter
  .delete('/:_id', function(req, res){
    User.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

    // Routes for a Model(resource) should have this structure


module.exports = userRouter