let Router = require('express').Router;
let helpers = require('../../config/helpers.js')

let Store = require('../../db/v1/store')

const store = Router()

store
  .get('/', function(req, res){
    Store.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING EVENTS', err)
        return res.json(err)
      }
      console.log('EVENTS FOUND', results)
      res.json(results)
    })
  })


store
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newStore = new Store(req.body)

    Store.find({id: newStore._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR EVENT EXISTS WITH THIS ID  <${req.body}>`)
      }

      newStore.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING EVENT',err);
          return res.status(500).json(err)
        }
        let clientCopy = newStore.toObject()
        console.log('EVENT SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
  })


store
  .get('/:_id', function(req, res){
    Store.findById(req.params._id, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING STORE', err)
        return res.json(err)
      }
      console.log('STORE REQUESTED', record)
      res.json(record)
      res.end()
    })
  })

//get by tenantId
store
  .get('/tenants/:_id', function(req, res){
    Store.find({tenantId:req.params._id}, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING TENANTS STORES', err)
        return res.json(err)
      }
      console.log('TENANTS STORES REQUESTED', record)
      res.json(record)
      res.end()
    })
  })

//GET BY USER ID
store
  .get('/userId/:id', function(req, res) {
    Store.find({userId: req.params._id}, function(err, record) {
      if(err || !record ) {
        console.log('ERROR WITH GETTING USERS STORES', record)
        return res.json(err)
      }
      console.log('USERS STOREs REQUESTED', record)
      res.json(record)
      res.end()
    })
  })

store
  .put('/:_id', function(req, res){
    Store.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          console.log('ERROR WITH UPDATING EVENT', err)
          return res.status(500).send(err)
        }
        else if (!record) {
          console.log('ERROR WITH UPDATING EVENT', err)
          return res.status(400).send('no record found with that id')
        }
        else {
          console.log('SUCCESSFULLY UPDATED EVENT', err)
          return res.json(Object.assign({},req.body,record))
        }
    })
  })

store
  .delete('/:_id', function(req, res){
    Store.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = store