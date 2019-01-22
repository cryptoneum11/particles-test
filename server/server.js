const express = require('express');
const session = require('express-session');
const server = express();
const port = process.env.PORT || 80; // can be any port, most commonly port 80, 8080, or 3000
const eol = require('os').EOL; // uses OS generalized 'End-Of-Line' character
const fs = require('fs'); // require NodeJS filesystem package

server.set('trust proxy', 1);
server.use(session({ secret: 'sector5', resave:false, saveUninitialized:true, cookie: { maxAge:9999999999 } }));

// Our server will use the /dist directory for static assets (html,css,js)
server.use(express.static(__dirname + '/../client/dist'));

server.post('/route/:vars', (req, res, next)=>{
  vars = JSON.parse(req.params.vars);
  req.session.num = vars.num;
  req.session.animate = vars.animate;
  console.log( req.session );
  res.send( '1' );
});

server.get('/route', (req, res, next)=>{
  if(req.session.num){
    res.send( { "num" : req.session.num, "animate" : req.session.animate } );
  }else{
    console.log( "initial values: { num: 10, animate: true }" );
    res.send( { num: 10, animate: true } );
  }
});

server.listen(port, ()=>{
  console.log(`server.js listening on port ${port}`);
});
