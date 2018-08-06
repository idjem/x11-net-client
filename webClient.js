'use strict'

const throttle = require('mout/function/throttle');


class Client {

  constructor(dom, client, client_key) {
    var ns  = client_key ? `mouse:${client_key}` : 'mouse';
    var pos = (e) => {
      var {x, y, width, height} = dom.getClientRects()[0];
      return [(e.clientX - x + 1) / width, (e.clientY - y + 1) / height];
    };

    var handelMouseDown = (e) => {
      client.send(ns, 'click', e.which, ...pos(e));
    };

    var handelMouseRightClick = (e) => {
      e.preventDefault();
      client.send(ns, 'click', 3, ...pos(e));
      return false;
    }

    var handelMouseMove = throttle((e) => {
      client.send(ns, 'move', ...pos(e));
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