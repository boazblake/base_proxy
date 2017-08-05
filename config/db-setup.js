const mongoose = require('mongoose')

module.exports = {
   connectToDB: function(projectName){
      console.log('running db-setup')
      let dbLocation = 'mongodb://localhost/'+ projectName

      if (process.env.NODE_ENV === "development"){
        dbLocation += "_dev"
        mongoose.connect(dbLocation , {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
},(err, db)=>{
          if (err) {
            console.log(err)
          }
          else {
            console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
          }
        })
      } else {
        mongoose.connect(process.env.MONGODB_URI , {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
},(err, db)=>{
          if (err) {
            console.log(err)
          }
          else {
            console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
          }
        })
      }
      console.log('finished setup')
    }
}