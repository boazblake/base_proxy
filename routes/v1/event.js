let Router = require('express').Router;
let helpers = require('../../config/helpers.js')

let Event = require('../../db/v1/eventSchema')

const event = Router()

event
  .get('/', function(req, res){
    Event.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING EVENTS', err)
        return res.json(err)
      }
      console.log('EVENTS FOUND', results)
      res.json(results)
    })
  })


event
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newEvent = new Event(req.body)

    Event.find({id: newEvent._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR EVENT EXISTS WITH THIS ID  <${req.body}>`)
      }

      newEvent.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING EVENT',err);
          return res.status(500).json(err)
        }
        let clientCopy = newEvent.toObject()
        console.log('EVENT SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
  })

event
  .get('/:_id', function(req, res){
    Event.findById(req.params._id, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING EVENT', err)
        return res.json(err)
      }
      console.log('EVENT REQUESTED', record)
      res.json(record)
      res.end()
    })
  })


event
  .put('/:_id', function(req, res){
    Event.findByIdAndUpdate(req.params._id, req.body, function(err, record){
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

event
  .delete('/:_id', function(req, res){
    Event.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = event