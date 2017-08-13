let Router = require('express').Router;
const itemRouter = Router()
let helpers = require('../config/helpers.js')

let Item = require('../db/itemSchema.js')

  itemRouter
    .get('/', function(req, res){
      Item.find(req.query , "-password", function(err, results){
        if(err) return res.json(err)
        res.json(results)
      })
    })

    itemRouter
      .post('/add', function(req, res){
        // passport appends json-data to request.body
        let newItem = new Item(req.body)
    console.log(newItem)
        Item.find({id: newItem._id}, function(err, results){
          if (err) return res.status(500).json(err)

          if(results !== null && results.length > 0 ) {
            return res.status(401).send(`oops, record for <${req.body.firstName}> <${req.body.lastName}> already exists`)
          }

          newItem.save(function(err, record){
            if(err) return res.status(500).json(err)
            let clientCopy = newItem.toObject()
            res.json(clientCopy)
          })
        })
      })

  itemRouter
    .get('/:_id', function(req, res){
      Item.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err)
        res.json(record)
      })
    })


  itemRouter
    .put('/:_id', function(req, res){
      Item.findByIdAndUpdate(req.params._id, req.body, function(err, record){
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


    .delete('/:_id', function(req, res){
      Item.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

module.exports = itemRouter