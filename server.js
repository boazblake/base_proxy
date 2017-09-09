const PROJECT_NAME = 'TenantFit'

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
const authRouter = require('./routes/v1/auth.js')
const userRouter = require('./routes/v1/users.js')
const tenantsRouter = require('./routes/v1/tenants.js')
const storesRouter = require('./routes/v1/stores.js')

// Load DB User Model (for appAuthentication configuration)
const User = require('./db/v1/user.js')


// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 8080
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
  const origin = req.headers.origin
  let allowedOrigins =
    [ "https://tenant-fit.herokuapp.com"
    , "http://localhost:9000"
    ]
  if(allowedOrigins.indexOf(origin) === -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", ["DELETE", "UPDATE", "GET", "PUT", "POST"]);
  next();
});

app.use( '/auth', authRouter )
app.use( '/user', userRouter )
app.use( '/tenants', tenantsRouter )
app.use( '/stores', storesRouter )

app.use(appMiddleWare.errorHandler);

app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
