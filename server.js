'use strict'

//const http = require('http');
//const staticServer = require('node-static'); //статику раздает теперь express
//const file = new staticServer.Server('.');
const express = require('express');
const app = express();

const data = require('./data.js'); //подключили ресурс фотки

app.use(express.static(__dirname));
app.listen(3000);

app.get('/', (req,res) =>{
  res.sendFile(__dirname + '/index.html')
});

app.get('/data', (req,res) =>{
  res.send(JSON.stringify(data.photos))
});

//http.createServer(function(req, res) {
//  if (req.url == '/hello'){
//    res.writeHead(200, {
//      'Content-Type':'text/plain',
//      'Content-Control':'no-cache'
//    });
//    res.end('Hi!');
//  }else{
//    file.serve(req, res);
//  }
//
//  //фотки
//
//  if (req.url == '/data'){
//    res.writeHead(200, {
//      'Content-Type':'text/plain',
//      'Content-Control':'no-cache'
//    });
//    //res.end('Hi!');
//    res.end(JSON.stringify(data.photos));
//  }else{
//    file.serve(req, res);
//  }
//  //file.serve(req, res);
//}).listen(3000);



console.log('Server running on port 3000');