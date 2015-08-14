// JavaScript Document
;(function() {
  function $(id) {
    return document.getElementById(id);
  }
  var r = $('render'),
    tpl = $('order-tpl'),
    send = $('send-btn'),
    localStorage = window.localStorage;
  r.innerHTML = tmpl(tpl.innerHTML, {
    data: data
  });
  var totalPrice = $('total'),
    changed = false;

  function parent(elem, parent) {
    parent = parent || document;
    for(elem = elem.parentNode; elem; elem = elem.parentNode) {
      if(elem && elem === parent) {
        return elem
      }
    }
    return elem
  }

  function setup() {
    var blk = r.children;
    for(var i = 0; i < blk.length; i++) {
      var total = 0;
      var split = blk[i].getAttribute('data-bundle').split('|')
      var input = blk[i].querySelectorAll('input[type=text]')
      for(var j = 0; j < input.length; j++) {
        var unit = input[j].getAttribute('data-unit-price');
        var subTitle = input[j].getAttribute('data-title');
        total += input[j].getAttribute('data-original-value') * unit;
      }
      blk[i].querySelector('[data-price]').innerHTML = total
      totalPrice.innerHTML = +totalPrice.innerHTML + total
    }
    if(localStorage.getItem('@storage')) {
      r.innerHTML = JSON.parse(localStorage.getItem('@storage')).html
      totalPrice.innerHTML = JSON.parse(localStorage.getItem('@storage')).total
    }
  }

  function setValue(el, a, b, dir) {
    return el['innerHTML'] = dir ? a + b : a - b
  }

  function changeOrders(e) {
    var target = e.target;
    var sibling, dir, id;
    if(e.type === 'touchend') {
      this.onclick = null;
    }
    if(!changed) {
      changed = true
    }
    if(target.hasAttribute('data-counter')) {
      sibling = target.previousElementSibling || target.nextElementSibling;
      dir = target.previousElementSibling ? 'left' : 'right';
      var unit = +sibling.getAttribute('data-unit-price');
      id = $(sibling.getAttribute('data-id'));
      sibling.blur()
      if(!/^\d+?$/.test(sibling.value)) {
        return false;
      }
      if(dir === 'left') {
        sibling.setAttribute('value', Math.min(Infinity, ++sibling.value));
        setValue(totalPrice, +totalPrice.innerHTML, unit, true);
        setValue(id.querySelector('[data-price]'), +id.querySelector('[data-price]').innerHTML, unit, true);
      }
      else {
        if(+sibling.value) {
          setValue(totalPrice, +totalPrice.innerHTML, unit);
          setValue(id.querySelector('[data-price]'), +id.querySelector('[data-price]').innerHTML, unit);
          sibling.setAttribute('value', Math.max(0, --sibling.value));
        }
      }
      sibling.setAttribute('data-original-value', sibling.value)
      var li = id.querySelectorAll('[data-num]')
      if(sibling.hasAttribute('data-index')) {
        parent(sibling, li[sibling.getAttribute('data-index')]).setAttribute('data-num', sibling.getAttribute('value'))
      }
    }
    
    if(target.hasAttribute('data-close')) {
      id = $(target.getAttribute('data-id'));
      var price = +id.querySelector('[data-price]').innerHTML
      id.parentNode.removeChild(id)
      setValue(totalPrice, +totalPrice.innerHTML, price);
    }
    if(id) {
      if(!(+id.querySelector('[data-price]').innerHTML)) {
        id.setAttribute('data-status', 'empty')
      }
      else {
        id.removeAttribute('data-status')
      }
    }
    localStorage.setItem('@storage', JSON.stringify({
      html: r.innerHTML,
      total: +totalPrice.innerHTML
    }))
  }

  function submiter(e) {
    e.preventDefault()
    if(!localStorage.getItem('@storage')) {
      localStorage.setItem('@storage', JSON.stringify({
        html: r.innerHTML,
        total: +totalPrice.innerHTML
      }))
    }
    if(+totalPrice.innerHTML && r.children.length) {
      location.href = this.getAttribute('href')
      localStorage.setItem('@lock', '1')
    }
    else {
      if(localStorage.getItem('@lock')) {
        localStorage.removeItem('@lock')
      }
      alert('empty!')
      return false;
    }
  }
    setup()

  send.onclick = submiter
  r.onclick = r.ontouchend = r.oninput = changeOrders;
})()
