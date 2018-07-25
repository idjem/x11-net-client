"use strict";

const http   = require('http');

//global.WebSocket = require('ws');
const WsServer   = require('ws').Server;
const ubk  = require('ubk');
const throttle = require('mout/function/throttle');
const defer  = require('nyks/promise/defer');

const port   = 9000;
const wsPort = 8000;


class Server extends ubk.Server {

  constructor() {
    super({server_port : port});

    this.httpServer = http.createServer();
    var web_sockets = new WsServer({
      server : this.httpServer,
      path   : '/'
    });
    web_sockets.on('connection', this.new_websocket_client);

    var sendMouseMouve = throttle((x, y, device_key) => {
      forIn(this._clientsList, function(client) {
        if(client.device_capability.indexOf('player-activscreen') == -1)
          return
        client.send('mouse', 'move', x, y)
        //client.signal.apply(client, args);
      });
    }, 100);

    var sendMouseClick = throttle((x, y, device_key) => {
      forIn(this._clientsList, function(client) {
        if(client.device_capability.indexOf('player-activscreen') == -1)
          return
        client.send('mouse', 'click', x, y)
        //client.signal.apply(client, args);
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


