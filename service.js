var express = require('express');
var request = require('request');
var url = require('url');
var log = console.log;
var http = require('http');

var calculator = require("./calculator.js");


  calculator.start(process.env.PORT || 5000, 80, "stormy-temple-7147.herokuapp.com");

