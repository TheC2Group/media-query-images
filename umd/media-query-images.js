/*!
 * media-query-images
 * https://github.com/TheC2Group/media-query-images
 * @version 1.0.3
 * @license MIT (c) The C2 Group (c2experience.com)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global = global || self, global.MediaQueryImages = factory(global.jQuery));
}(this, function ($) { 'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

    var defaults = {
      blankClass: 'hidden'
    };
    var isRetina = window.devicePixelRatio > 1;

    var setBlank = function setBlank(img) {
      var $img = $(img);
      $img.addClass(this.opts.blankClass);

      if ($img.is('img')) {
        $img.removeAttr('src');
      } else {
        $img.css('background-image', '');
      }
    };

    var setImage = function setImage(img, attrName) {
      var $img = $(img),
          path = $img.attr(attrName);

      if (!path) {
        setBlank.call(this, img);
        return;
      }

      $img.removeClass(this.opts.blankClass);

      if ($img.is('img')) {
        $img.attr('src', path);
      } else {
        $img.css('background-image', 'url("' + path + '")');
      }
    };

    var setSrc = function setSrc(index) {
      var mq, attrName; // if no default was set

      if (index >= this.mqs.length) {
        this.$images.each(function (i, img) {
          setBlank.call(this, img);
        }.bind(this));
        return false;
      }

      mq = this.mqs[index];
      attrName = isRetina ? mq.retinaAttrName || mq.attrName : mq.attrName;
      if (!attrName) return false;
      this.$images.each(function (i, img) {
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

    var init = function init(images, mqs, options) {
      if (!images || !mqs || !mqs.length || !matchMedia) return false;
      this.selector = null;

      if (typeof images === 'string') {
        this.selector = images;
      } else if (typeof images === 'object' && images.selector) {
        this.selector = images.selector;
      }

      this.$images = $(images);
      this.mqs = mqs;
      this.opts = $.extend({}, defaults, options);
      this.mqls = createMediaQueryLists.call(this);
      bindListeners.call(this);
      runCheck.call(this);
      return true;
    };

    var MediaQueryImages = function MediaQueryImages(images, mqs, options) {
      this.result = init.call(this, images, mqs, options);
    };

    MediaQueryImages.prototype.runCheck = runCheck; // refresh the jQuery selector

    MediaQueryImages.prototype.refresh = function () {
      if (!this.selector || !this.result) return;
      this.$images = $(this.selector);
      runCheck.call(this);
    };

    return MediaQueryImages;

}));
