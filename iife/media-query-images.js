/*!
 * media-query-images
 * https://github.com/TheC2Group/media-query-images
 * @version 1.0.4
 * @license MIT (c) The C2 Group (c2experience.com)
 */
var MediaQueryImages = (function () {
  'use strict';

  var defaults = {
    blankClass: 'hidden'
  };
  var isRetina = window.devicePixelRatio > 1;

  var setBlank = function setBlank(img) {
    img.classList.add(this.opts.blankClass);

    if (img.tagName === 'IMG') {
      img.removeAttribute('src');
    } else {
      img.style.backgroundImage = '';
    }
  };

  var setImage = function setImage(img, attrName) {
    var path = img.getAttribute(attrName);

    if (!path) {
      setBlank.call(this, img);
      return;
    }

    img.classList.remove(this.opts.blankClass);

    if (img.tagName === 'IMG') {
      img.setAttribute('src', path);
    } else {
      img.style.backgroundImage = 'url("' + path + '")';
    }
  };

  var setSrc = function setSrc(index) {
    var mq, attrName; // if no default was set

    if (index >= this.mqs.length) {
      this.image.forEach(function (img) {
        setBlank.call(this, img);
      }.bind(this));
      return false;
    }

    mq = this.mqs[index];
    attrName = isRetina ? mq.retinaAttrName || mq.attrName : mq.attrName;
    if (!attrName) return false;
    this.image.forEach(function (img) {
      setImage.call(this, img, attrName);
    }.bind(this));
  };

  var runCheck = function runCheck() {
    for (var x = 0, xlen = this.mqls.length; x < xlen; x += 1) {
      if (this.mqls[x].matches) {
        setSrc.call(this, x);
        return;
      }
    }

    setSrc.call(this, xlen);
  };

  var bindListeners = function bindListeners() {
    if (!this.mqls[0].addListener) return;
    this.mqls.forEach(function (mql) {
      mql.addListener(runCheck.bind(this));
    }.bind(this));
  };

  var createMediaQueryLists = function createMediaQueryLists() {
    return this.mqs.filter(function (mq) {
      return mq.mediaQuery;
    }).map(function (mq) {
      return matchMedia(mq.mediaQuery);
    });
  };

  var extend = function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') out[key] = extend(out[key], obj[key]);else out[key] = obj[key];
        }
      }
    }

    return out;
  };

  var init = function init(images, mqs, options) {
    if (!images || !mqs || !mqs.length || !matchMedia) return false;
    this.selector = null;

    if (typeof images === 'string') {
      this.selector = images;
    } else if (typeof images === 'object' && images.selector) {
      this.selector = images.selector;
    }

    this.image = document.querySelectorAll(images);
    this.mqs = mqs;
    this.opts = extend({}, defaults, options);
    this.mqls = createMediaQueryLists.call(this);
    bindListeners.call(this);
    runCheck.call(this);
    return true;
  };

  var MediaQueryImages = function MediaQueryImages(images, mqs, options) {
    this.result = init.call(this, images, mqs, options);
  };

  MediaQueryImages.prototype.runCheck = runCheck; // refresh the selector

  MediaQueryImages.prototype.refresh = function () {
    if (!this.selector || !this.result) return;
    this.image = document.getElementsByTagName(this.selector);
    runCheck.call(this);
  };

  return MediaQueryImages;

}());
