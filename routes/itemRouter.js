let Router = require('express').Router;
const itemRouter = Router()
let helpers = require('../config/helpers.js')
let Item = require('../db/itemSchema.js')

  itemRouter
    .get('/', function(req, res){
      Item.find(req.query , function(err, results){
        if(err) {
          console.log('ERR WITH GETTING ITEMS', err)
          return res.json(err)
        }
        console.log('ITEMS FOUND', results)
        res.json(results)
      })
    })


    itemRouter
      .post('/add', function(req, res){
        // passport appends json-data to request.body
        let newItem = new Item(req.body)

        Item.find({id: newItem._id}, function(err, results){
          if (err) {
            console.log('ERROR WITH SAVING!', err);
            return res.status(500).json(err)
          }

          if(results !== null && results.length > 0 ) {
            return res.status(401).send(`ERROR ITEM EXISTS WITH THIS ID  <${req.body}>`)
          }

          newItem.save(function(err, record){
            if(err) {
              console.log('ERROR WITH SAVING ITEM',err);
              return res.status(500).json(err)
            }
            let clientCopy = newItem.toObject()
            console.log('ITEM SUCESFULLY SAVED',clientCopy);
            return res.json(clientCopy)
          })
        })
      })

  itemRouter
    .get('/:_id', function(req, res){
      Item.findById(req.params._id, function(err, record){
        if(err || !record ) {
          console.log('ERROR WITH GETTING ITEM', err)
          return res.json(err)
        }
        console.log('ITEM REQUESTED', record)
        res.json(record)
        res.end()
      })
    })


  itemRouter
    .put('/:_id', function(req, res){
      Item.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            console.log('ERROR WITH UPDATING ITEM', err)
            return res.status(500).send(err)
          }
          else if (!record) {
            console.log('ERROR WITH UPDATING ITEM', err)
            return res.status(400).send('no record found with that id')
          }
          else {
            console.log('SUCCESSFULLY UPDATED ITEM', err)
            return res.json(Object.assign({},req.body,record))
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