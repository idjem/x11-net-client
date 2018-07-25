'use strict'

class Client {

  constructor(dom, client) {

    var handelMouseDown = (e) => {
      x = e.clientX / dom.offsetWidth;
      y = e.clientY / dom.offsetHeight;
      client.send("mouse", "click", x, y);
    };
    
    var handelMouseMove = (e) => {
      x = e.clientX / dom.offsetWidth;
      y = e.clientY / dom.offsetHeight;
      client.send("mouse", "move", x, y);
    };

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

