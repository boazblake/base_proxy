const PROJECT_NAME = 'shinDB'

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x



const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load Configuration
const appMiddleWare = require('./config/middleware.js')
const appSecrets = require('./config/secrets.js')
const appAuthentication = require('./config/auth.js')
const connectToDB = require('./config/db-setup.js').connectToDB

// Import Routers
let authRouter = require('./routes/authRouter.js')
let apiRouter = require('./routes/apiRouter.js')

// Load DB User Model (for appAuthentication configuration)
let User = require('./db/schema.js').User


// =========
// RUN APP
// =========
const app = express()
const PORT = 8080
app.set('port', PORT)

// =========
// DATABASE
// =========
connectToDB(PROJECT_NAME)

// =========
// APPLICATION MIDDLEWARE
// =========
app.use( express.static( __dirname + '/dist/assets') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: true}) );
app.use( cookieParser() );
app.use( session({secret: appSecrets.sessionSecret,
                  resave: true,
                  saveUninitialized: true })
      );
app.use( passport.initialize() );
app.use( passport.session() );
appAuthentication(User)
app.use( appMiddleWare.cookifyUser )
app.use( appMiddleWare.parseQuery )
//
// =========
// ROUTERS
// =========
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use( '/auth', authRouter )
app.use( '/api', apiRouter )

app.use(appMiddleWare.errorHandler);

app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
