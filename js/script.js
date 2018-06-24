/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $body = $('body');

  // Tab
  $('.js-tab-trigger').on('click', function () {
    var $trigger = $(this);
    if (!$trigger.hasClass('is-selected')) {
      var number = $trigger.attr('data-tab');
      var $wrapper = $trigger.closest('.js-tab-wrapper');
      var targetSelector = '.js-tab-contents[data-tab="' + number + '"]';
      var $target = $wrapper.find(targetSelector);
      $wrapper.find('.js-tab-trigger.is-selected').removeClass('is-selected');
      $trigger.addClass('is-selected');
      $wrapper.find('.js-tab-contents.is-active').removeClass('is-active');
      $target.addClass('is-active');
    }
    return false;
  });

  // Column
  $('.js-col-trigger').on('click', function () {
    var $trigger = $(this);
    if (!$trigger.hasClass('is-selected')) {
      var colClass = 'is-' + $trigger.attr('data-col') + '-col';
      var $wrapper = $trigger.closest('.js-col-wrapper');
      $wrapper.find('.js-col-trigger.is-selected').removeClass('is-selected');
      $trigger.addClass('is-selected');
      $wrapper.removeClass(function (index, className) {
        return (className.match(/is-\d-col/g) || []).join(' '); // \dは任意の数字
      });
      $wrapper.addClass(colClass);
    }
    return false;
  });

  // pagetop
  $('.js-pagetop-trigger').on('click', function () {
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
  $(window).on('scroll load', function () {
    var scroll = $(window).scrollTop();
    var scrollBottom = scroll + $(window).innerHeight();
    var reference = $('.js-pagetop-reference').offset().top + 16 + 28;
    if (reference < scrollBottom) {
      $body.removeClass('is-pagetop-fixed');
      $body.addClass('is-pagetop-static');
    } else {
      $body.removeClass('is-pagetop-static');
      $body.addClass('is-pagetop-fixed');
    }
  });

  // Side Drawer
  (function () {
    // MENU閉じる関数
    var menuCloseAll = function menuCloseAll() {
      $body.removeClass(function (index, className) {
        return (className.match(/\bis-open-menu\S+/g) || []).join(' ');
      });
      $body.removeClass('is-no-scroll');
      $('.js-menu-trigger').removeClass('is-active');
    };
    // トリガーで展開
    $('.js-menu-trigger').on('click', function () {
      var activeClass = 'is-open-menu-' + $(this).attr('data-target-menu');
      var isMenuActive = $body.hasClass(activeClass);
      menuCloseAll();
      if (!isMenuActive) {
        $body.addClass('is-no-scroll');
        $body.addClass(activeClass);
        $(this).addClass('is-active');
      }
      return false;
    });
    $('body').on('click', function (e) {
      if (!$(e.target).closest('.js-slide-wrapper').length) {
        if (!$(e.target).closest('.header').length) {
          menuCloseAll();
        }
      }
    });
  })();

  // Modal
  (function () {
    // トリガーで展開
    $('.js-modal-trigger').on('click', function () {
      $(this).closest('.js-modal-wrapper').toggleClass('is-open-modal');
      return false;
    });
    $('.js-modal-close').on('click', function () {
      $('.is-open-modal').removeClass('is-open-modal');
      return false;
    });
    $('body').on('click', function (e) {
      if (!$(e.target).closest('.js-modal-body').length) {
        $('.is-open-modal').removeClass('is-open-modal');
      }
    });
  })();

  // More
  $('.js-more-trigger').on('click', function () {
    $(this).closest('.js-more-wrapper').toggleClass('is-more-open');
    return false;
  });

  // Slide in
  $(window).on('scroll load', function () {
    var scroll = $(window).scrollTop();
    var scrollBottom = scroll + $(window).innerHeight();
    $('.js-slide-in').each(function (i, elem) {
      var $elem = $(elem);
      if (scrollBottom >= $elem.offset().top + 200) {
        $elem.addClass('is-active');
      }
    });
  });
})();

/***/ })
/******/ ]);