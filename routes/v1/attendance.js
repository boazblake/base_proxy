let Router = require('express').Router;
let helpers = require('../../config/helpers.js')
let AttendanceDetail = require('../../db/v1/attendanceSchema')

const attendance = Router()

attendance
  .get('/', function(req, res){
    AttendanceDetail.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING ATTENDANCE DETAILS', err)
        return res.json(err)
      }
      console.log('ATTENDANCE DETAILS FOUND', results)
      res.json(results)
    })
  })


attendance
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newAttendanceDetail = new AttendanceDetail(req.body)

    AttendanceDetail.find({id: newAttendanceDetail._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR ATTENDANCE DETAIL EXISTS WITH THIS ID  <${req.body}>`)
      }

      newAttendanceDetail.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING ATTENDANCE DETAIL',err);
          return res.status(500).json(err)
        }
        let clientCopy = newAttendanceDetail.toObject()
        console.log('ATTENDANCE DETAIL SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
  })

attendance
  .get('/:_id', function(req, res){
    AttendanceDetail.findById(req.params._id, function(err, record){
      if(err || !record ) {
        console.log('ERROR WITH GETTING ATTENDANCE DETAIL', err)
        return res.json(err)
      }
      console.log('ATTENDANCE DETAIL REQUESTED', record)
      res.json(record)
      res.end()
    })
  })


attendance
  .put('/:_id', function(req, res){
    AttendanceDetail.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          console.log('ERROR WITH UPDATING ATTENDANCE DETAIL', err)
          return res.status(500).send(err)
        }
        else if (!record) {
          console.log('ERROR WITH UPDATING ATTENDANCE DETAIL', err)
          return res.status(400).send('no record found with that id')
        }
        else {
          console.log('SUCCESSFULLY UPDATED ATTENDANCE DETAIL', err)
          return res.json(Object.assign({},req.body,record))
        }
    })
  })

attendance
  .delete('/:_id', function(req, res){
    AttendanceDetail.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = attendance