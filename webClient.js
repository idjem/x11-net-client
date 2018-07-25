'use strict'

const throttle = require('mout/function/throttle');


class Client {

  constructor(dom, client) {

    var x = 0;
    var y = 0;
  
    var handelMouseDown = throttle((e) => {
      var domRec = dom.getClientRects()[0];
      x = (e.clientX - domRec.x + 1) / domRec.width;
      y = (e.clientY - domRec.y + 1) / domRec.height;

      console.log(x, y);
      client.send("mouse", "click", x, y);
    }, 100);

    var handelMouseMove = throttle((e) => {
      var domRec = dom.getClientRects()[0];

      x = (e.clientX - domRec.x + 1) / domRec.width;
      y = (e.clientY - domRec.y + 1) / domRec.height;
      console.log(x, y, domRec);

      client.send("mouse", "move", x, y);
    }, 100);

    dom.addEventListener('mousemove', handelMouseMove, false);
    dom.addEventListener('touchmove', handelMouseDown, false);
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

