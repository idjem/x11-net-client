'use strict'

const throttle = require('mout/function/throttle');


class Client {

  constructor(dom, client, client_key) {

    var x = 0;
    var y = 0;

    var ns = client_key ? `mouse:${client_key}` : 'mouse';
  
    var handelMouseDown = (e) => {
      client.send(ns, 'click', e.which, client.client_key);
    };

    var handelMouseRightClick = (e) => {
      e.preventDefault();
      client.send(ns, 'click', 3, client.client_key);
      return false;
    }

    var handelMouseMove = throttle((e) => {
      var domRec = dom.getClientRects()[0];
      x = (e.clientX - domRec.x + 1) / domRec.width;
      y = (e.clientY - domRec.y + 1) / domRec.height;
      client.send(ns, 'move', x, y, client.client_key);
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
