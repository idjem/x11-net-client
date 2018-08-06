'use strict'

const throttle = require('mout/function/throttle');


class Client {

  constructor(dom, client, client_key) {

    var ns = client_key ? `mouse:${client_key}` : 'mouse';
  
    var handelMouseDown = ({clientX, clientY, which}) => {
      var {x, y, width, height} = dom.getClientRects()[0];
      var pos_x = (clientX - x + 1) / width;
      var pos_y = (clientY - y + 1) / height;
      client.send(ns, 'click', which, pos_x, pos_y);
    };

    var handelMouseRightClick = ({clientX, clientY, preventDefault}) => {
      preventDefault();
      var {x, y, width, height} = dom.getClientRects()[0];
      var pos_x = (clientX - x + 1) / width;
      var pos_y = (clientY - y + 1) / height;
      client.send(ns, 'click', 3, x, y);
      return false;
    }

    var handelMouseMove = throttle(({clientX, clientY}) => {
      var {x, y, width, height} = dom.getClientRects()[0];
      var pos_x = (clientX - x + 1) / width;
      var pos_y = (clientY - y + 1) / height;
      client.send(ns, 'move', pos_x, pos_y);
    }, 100);

    dom.addEventListener('mousemove', handelMouseMove, false);
    dom.addEventListener('touchmove', handelMouseMove, false);
    dom.addEventListener('click', handelMouseDown, false);
    dom.addEventListener('contextmenu', handelMouseRightClick, false);

    this.release = () => {
      dom.removeEventListener('mousemove', handelMouseMove);
      dom.removeEventListener('touchmove', handelMouseMove);
      dom.removeEventListener('click', handelMouseDown);
      dom.removeEventListener('contextmenu', handelMouseRightClick);
    };

  }

}

module.exports = Client;
