var express = require('express');
var request = require('request');
var url = require('url');
var log = console.log;
var http = require('http');

var calculator = require("./calculator.js");


  calculator.start(process.env.PORT || 5000, process.env.PORT || 5000, "localhost");
