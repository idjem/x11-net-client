'use strict';

const x11   = require('x11');
const defer = require('nyks/promise/defer');

class x11Client {


  constructor(client) {
    if(!client)
      return;
    this.createXManager().then(() => {
      client.register_rpc('mouse', 'move', this.move.bind(this));
      client.register_rpc('mouse', 'click', this.click.bind(this));
    });
  }


  async createXManager () {
    var defered = defer()
    x11.createClient((err, display) => {
      if(err)
        return defered.reject(err);
      this.X = display.client;
      this.root  = display.screen[0].root;

      this.min_keycode = this.X.display.min_keycode;
      this.max_keycode = this.X.display.max_keycode;
      
      this.X.GetGeometry(this.root, (err, result) => {
        this.width  = result.width;
        this.height = result.height;
        defered.resolve()
      });
    })
    return defered;
  }

  move(x, y) {
    var posX = Math.round(this.width * x);
    var posY = Math.round(this.height * y);
    this.X.WarpPointer(0, this.root, 0, 0, 0, 0, posX, posY);	
  }

  async click(clickCode) {
    var defered = defer()
    this.X.require('xtest', (err, test) => {
      if(err)
        return defered.reject(err);
      var posX = Math.round(this.width * x);
      var posY = Math.round(this.height * y);
      test.FakeInput(test.ButtonPress, clickCode, 0, this.root, 0, 0);
      test.FakeInput(test.ButtonRelease, clickCode, 0, this.root, 0, 0);
      defered.resolve()
    });
    return defered;
  }
  
}

module.exports = x11Client;
