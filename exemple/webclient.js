'use strict';

const ClientWs = require('ubk/client/ws');

const webClient = require('../webClient');


const wsUrl  = `http://localhost:9000/`;


var client = new ClientWs(wsUrl);
client.connect();


//document.onload = () => {

//}


document.addEventListener("DOMContentLoaded", function() {
  var element = document.createElement('div');
  element.style.cssText = 'width:1000px;height:1000px'
  document.body.appendChild(element)
  new webClient(element, client);
  global.a  = element;
});