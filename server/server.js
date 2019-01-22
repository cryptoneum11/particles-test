const express = require('express');
const session = require('express-session');
const server = express();
const port = process.env.PORT || 8080; // can be any port, most commonly port 80, 8080, or 3000
const eol = require('os').EOL; // uses OS generalized 'End-Of-Line' character
const fs = require('fs'); // require NodeJS filesystem package

server.set('trust proxy', 1);
server.use(session({ secret: 'sector5', resave:false, saveUninitialized:true, cookie: { maxAge:9999999999 } }));

// Our server will use the /dist directory for static assets (html,css,js)
server.use(express.static(__dirname + '/../client/dist'));

server.post('/route/:num', (req, res, next)=>{
  req.session.num = req.params.num;
  console.log( req.params );
  res.send( '1' );
});

server.get('/route', (req, res, next)=>{
  if(req.session.num){
    console.log( req.session.num );
    res.send( req.session.num );
  }else{
    console.log( 10 );
    res.send( '10' );
  }
});

server.listen(port, ()=>{
  console.log(`server.js listening on port ${port}`);
});
