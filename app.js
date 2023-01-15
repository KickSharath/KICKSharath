const express = require('express')
// const mongoose  = require('mongoose')
const { MongoClient } = require('mongodb');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const fileupload = require('express-fileupload')
const UserRouter = require('./routes/UserRouter')
const mime = require('mime-types')
const AdminRouter = require('./routes/AdminRouter')
const Posts = require('./models/posts')
const {gobleVariable} = require('./config/configerfile')
const {mongoDbURL, PORT} = require('./config/configerfile')

require('dotenv').config()

const app = express()

client.connect(mongoDbURL, { 
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
  .then( response =>{
    console.log('Connected Successfully'                                                                     )  
  }).catch(err =>{
      console.log('failed to Connected')      
  })
  
// mongoose.connect(mongoDbURL, { 
//     useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
//     .then( response =>{
//       console.log('Connected Successfully'                                                                     )  
//     }).catch(err =>{
//         console.log('failed to Connected')      
//     })

app.use(session({
        name:'uniqueSessionID',
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }))

app.use(flash())

app.use(bodyParser.urlencoded({
    extended: false
    }));
     
app.use(bodyParser.json());

app.use(express.static('public'))

app.use(gobleVariable)

app.use(fileupload())

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use('/',UserRouter)
app.use('/admin',AdminRouter)

app.listen(process.env.PORT || config.httpPort, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// app.listen(PORT, () =>{
//     console.log('Running on  Port '+PORT)
// })
