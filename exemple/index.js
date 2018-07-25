const clientubk = require('ubk/client/tcp');
const x11client = require('../x11Client');


var client = new clientubk({server_port : 9000});
client.connect("127.0.0.1");
new x11client(client);
