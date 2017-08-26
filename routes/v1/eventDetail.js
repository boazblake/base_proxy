let Router = require('express').Router;
let helpers = require('../../config/helpers.js')
let EventDetail = require('../../db/v1/eventDetailShema')

const eventDetail = Router()

eventDetail
  .get('/', function(req, res){
    EventDetail.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING EVENT DETAILS', err)
        return res.json(err)
      }
      console.log('EVENT DETAILS FOUND', results)
      res.json(results)
    })
  })


eventDetail
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newEventDetail = new EventDetail(req.body)

    EventDetail.find({id: newEventDetail._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR EVENT DETAIL EXISTS WITH THIS ID  <${req.body}>`)
      }

      newEventDetail.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING EVENT DETAIL',err);
          return res.status(500).json(err)
        }
        let clientCopy = newEventDetail.toObject()
        console.log('EVENT DETAIL SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
  })

eventDetail
  .get('/:_id', function(req, res){
    EventDetail.findById(req.params._id, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING EVENT DETAIL', err)
        return res.json(err)
      }
      console.log('EVENT DETAIL REQUESTED', record)
      res.json(record)
      res.end()
    })
  })


eventDetail
  .put('/:_id', function(req, res){
    EventDetail.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          console.log('ERROR WITH UPDATING EVENT DETAIL', err)
          return res.status(500).send(err)
        }
        else if (!record) {
          console.log('ERROR WITH UPDATING EVENT DETAIL', err)
          return res.status(400).send('no record found with that id')
        }
        else {
          console.log('SUCCESSFULLY UPDATED EVENT DETAIL', err)
          return res.json(Object.assign({},req.body,record))
        }
    })
  })

eventDetail
  .delete('/:_id', function(req, res){
    EventDetail.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = eventDetail