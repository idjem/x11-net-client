"use strict";

const http   = require('http');

//global.WebSocket = require('ws');
const WsServer   = require('ws').Server;
const ubk  = require('ubk');
const throttle = require('mout/function/throttle');
const defer  = require('nyks/promise/defer');
const forIn  = require('mout/object/forIn');

const express    = require('express');



const port   = 8080;
const wsPort = 9000;


class Server extends ubk.Server {

  constructor() {
    super({server_port : port});
    var app = express();
    app.use("/", express.static('./www'));
    this.httpServer = http.createServer(app);

    var web_sockets = new WsServer({
      server : this.httpServer,
      path   : '/'
    });
    web_sockets.on('connection', this.new_websocket_client);

    var sendMouseMouve = throttle((x, y, device_key) => {
      forIn(this._clientsList, function(client) {
        client.send('mouse', 'move', x, y);
      });
    }, 100);



    var sendMouseClick = throttle((clickCode, device_key) => {
      forIn(this._clientsList, function(client) {
        client.send('mouse', 'click', clickCode);
      });
    }, 1000);

    this.register_rpc('mouse', 'move', sendMouseMouve);
    this.register_rpc('mouse', 'click', sendMouseClick);

  }

  async start() {
    var defered = defer();
    await super.start();
    this.httpServer.listen(wsPort, defered.resolve);
    return defered;
  }
}


//new Server();
module.exports = Server;


