const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

let mlabLocation = 'mongodb://boazblake:boazblake@ds159493.mlab.com:59493/shindigit_v1' //'mongodb://localhost/'+ projectName'



module.exports = {
   connectToDB: function(projectName){
      console.log('running db-setup')
      let dbLocation = 'mongodb://boazblake:boazblake@ds159493.mlab.com:59493/shindigit_v1'

      if (process.env.NODE_ENV === "development"){
        //dbLocation += "_dev"
        mongoose.connect(dbLocation ,
          { socketTimeoutMS: 0
          , keepAlive: true
          , reconnectTries: 30
          } ,(err, db)=>{
              if (err) {
                console.log(err)
              }
              else console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
        })
      } else {
        mongoose.connect(process.env.MONGODB_URI ,
          { socketTimeoutMS: 0
          , keepAlive: true
          , reconnectTries: 30
          } , (err, db) => {
            if (err) {
              console.log(err)
            }
            else console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
        })
      }
      console.log('finished setup')
    }
}
