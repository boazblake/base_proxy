let Router = require('express').Router;
let helpers = require('../../config/helpers.js')
let Tenant = require('../../db/v1/tenant.js')

const tenant = Router()

tenant
  .get('/', function(req, res){
    Tenant.find(req.query , function(err, results){
      if(err) {
        console.log('ERR WITH GETTING ITEMS', err)
        return res.json(err)
      }
      console.log('ITEMS FOUND', results)
      res.json(results)
    })
  })


tenant
  .post('/add', function(req, res){
    // passport appends json-data to request.body
    let newTenant = new Tenant(req.body)

    Tenant.find({id: newTenant._id}, function(err, results){
      if (err) {
        console.log('ERROR WITH SAVING!', err);
        return res.status(500).json(err)
      }

      if(results !== null && results.length > 0 ) {
        return res.status(401).send(`ERROR ITEM EXISTS WITH THIS ID  <${req.body}>`)
      }

      newTenant.save(function(err, record){
        if(err) {
          console.log('ERROR WITH SAVING ITEM',err);
          return res.status(500).json(err)
        }
        let clientCopy = newTenant.toObject()
        console.log('ITEM SUCESFULLY SAVED',clientCopy);
        return res.json(clientCopy)
      })
    })
    })

tenant
  .get('/:_id', function(req, res){
    console.log('req.params', req.params)
    Tenant.find({userId: req.params._id}, function(err, record){
      if(err || !record ) {
        console.error('ERROR WITH GETTING ITEM', err)
        return res.json(err)
      }
      console.log('ITEM REQUESTED', record)
      res.json(record)
      res.end()
    })
  })


tenant
  .put('/:_id', function(req, res){
    Tenant.findByIdAndUpdate(req.params._id, req.body, function(err, record){
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

tenant
  .delete('/:_id', function(req, res){
    Tenant.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

module.exports = tenant