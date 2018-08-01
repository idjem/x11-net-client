'use strict';

const ClientWs = require('ubk/client/ws');

const webClient = require('../webClient');


const wsUrl  = `http://localhost:9000/`;



//var client = new ClientWs(wsUrl);
var client = new ClientWs("ws://" + window.location.host, { registration_parameters: { client_capability: ["player-activscreen"] } });

client.connect();



document.addEventListener("DOMContentLoaded", async () => {
  new webClient(document.body, client);
});