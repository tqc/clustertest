var express = require('express');
var request = require('request');
var url = require('url');
var log = console.log;
var http = require('http');

var calculator = require("./calculator.js");

var cluster = require('cluster');
var numCPUs = 16 || require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server

  calculator.start(process.env.PORT || 5000, process.env.PORT || 5000,  "localhost");

}