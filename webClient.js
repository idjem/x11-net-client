'use strict'

const throttle = require('mout/function/throttle');


class Client {

  constructor(dom, client) {

    var x = 0;
    var y = 0;
  
    var handelMouseDown = (e) => {
      client.send("mouse", "click", e.which, client.client_key);
    };

    dom.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      client.send("mouse", "click", 3, client.client_key);
      return false;
    }, false);
    


    var handelMouseMove = throttle((e) => {
      var domRec = dom.getClientRects()[0];
      x = (e.clientX - domRec.x + 1) / domRec.width;
      y = (e.clientY - domRec.y + 1) / domRec.height;
      client.send("mouse", "move", x, y, client.client_key);
    }, 100);

    dom.addEventListener('mousemove', handelMouseMove, false);
    dom.addEventListener('touchmove', handelMouseMove, false);
    dom.addEventListener('click', handelMouseDown, false);

  }

}

module.exports = Client;


//onClick={this.handleClick}
//onDoubleClick={this.handleDoubleClick}
//onMouseEnter={this.handleMouseEnter}
//onMouseMove={this.handleMouseMove}
//onTouchEnd={this.handleTouchEnd}
//onTouchMove={this.handleTouchMove}
//onTouchStart={this.handleTouchStart}

