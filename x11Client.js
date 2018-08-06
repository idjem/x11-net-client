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
      client.register_rpc('display', 'resolution', this.resolution.bind(this));
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
      defered.resolve()
    })
    await defered;
    var resolution = await this.resolution();
    this.width  = resolution.width;
    this.height = resolution.height;
  }


  resolution() {
    var defered = defer()
    this.X.GetGeometry(this.root, (err, result) => {
      if(err)
        defered.reject(err)
      var width  = result.width;
      var height = result.height;
      defered.resolve({width, height})
    });
    return defered;
  }

  move(x, y) {
    var posX = Math.round(this.width * x);
    var posY = Math.round(this.height * y);
    this.X.WarpPointer(0, this.root, 0, 0, 0, 0, posX, posY);	
  }

  async click(clickCode, x, y) {
    this.move(x, y);
    var defered = defer()
    this.X.require('xtest', (err, test) => {
      if(err)
        return defered.reject(err);
      test.FakeInput(test.ButtonPress, clickCode, 0, this.root, 0, 0);
      test.FakeInput(test.ButtonRelease, clickCode, 0, this.root, 0, 0);
      defered.resolve()
    });
    return defered;
  }
  
}

module.exports = x11Client;
