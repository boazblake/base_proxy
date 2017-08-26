let Router = require('express').Router;
const userDetail = Router()
let helpers = require('../../config/helpers.js')
let UserDetail = require('../../db/v1/userDetailSchema')

userDetail
  .get('/', function(req, res){
    UserDetail.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING USER DETAILS', err)
        return res.json(err)
      }
      console.log('USER DETAILS FOUND', results)
      res.json(results)
    })
  })


userDetail
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newUserDetail = new UserDetail(req.body)

    UserDetail.find({id: newUserDetail._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR USER DETAIL EXISTS WITH THIS ID  <${req.body}>`)
      }

      newUserDetail.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING USER DETAIL',err);
          return res.status(500).json(err)
        }
        let clientCopy = newUserDetail.toObject()
        console.log('USER DETAIL SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
  })

userDetail
  .get('/:_id', function(req, res){
    UserDetail.findById(req.params._id, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING USER DETAIL', err)
        return res.json(err)
      }
      console.log('USER DETAIL REQUESTED', record)
      res.json(record)
      res.end()
    })
  })


userDetail
  .put('/:_id', function(req, res){
    UserDetail.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          console.log('ERROR WITH UPDATING USER DETAIL', err)
          return res.status(500).send(err)
        }
        else if (!record) {
          console.log('ERROR WITH UPDATING USER DETAIL', err)
          return res.status(400).send('no record found with that id')
        }
        else {
          console.log('SUCCESSFULLY UPDATED USER DETAIL', err)
          return res.json(Object.assign({},req.body,record))
        }
    })
  })


userDetail
  .delete('/:_id', function(req, res){
    UserDetail.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = userDetail