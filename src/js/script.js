(function() {
  const $body = $('body');

  // Tab
  $('.js-tab-trigger').on('click', function() {
    const $trigger = $(this);
    if (!($trigger.hasClass('is-selected'))) {
      const number = $trigger.attr('data-tab-number');
      const $wrapper = $trigger.closest('.js-tab-wrapper');
      const targetSelector = `.js-tab-contents[data-tab-number="${number}"]`;
      const $target = $wrapper.find(targetSelector);
      $wrapper.find('.js-tab-trigger.is-selected').removeClass('is-selected');
      $trigger.addClass('is-selected');
      $wrapper.find('.js-tab-contents.is-active').removeClass('is-active');
      $target.addClass('is-active');
    }
    return false;
  });

  // Column
  $('.js-col-trigger').on('click', function() {
    const $trigger = $(this);
    if (!($trigger.hasClass('is-selected'))) {
      const colClass = `is-${$trigger.attr('data-col')}-col`;
      const $wrapper = $trigger.closest('.js-col-wrapper');
      $wrapper.find('.js-col-trigger.is-selected').removeClass('is-selected');
      $trigger.addClass('is-selected');
      $wrapper.removeClass(function(index, className) {
        return (className.match(/is-\d-col/g) || []).join(' '); // \dは任意の数字
      });
      $wrapper.addClass(colClass);
    }
    return false;
  });

  // pagetop
  $('.js-pagetop-trigger').on('click', () => {
    $('html,body').animate({scrollTop: 0}, 1000);
    return false;
  });
  $(window).on('scroll', () => {
    const scroll = $(window).scrollTop();
    const scrollBottom = scroll + $(window).innerHeight();
    const reference = $('.js-pagetop-reference').offset().top + 16 + 28;
    if (reference < scrollBottom) {
      $body.removeClass('is-pagetop-fixed');
      $body.addClass('is-pagetop-static');
    } else {
      $body.removeClass('is-pagetop-static');
      $body.addClass('is-pagetop-fixed');
    }
  });

  // Side Drawer
  (function() {
    const menuCloseAll = () => {
      $body.removeClass((index, className) => {
        return (className.match(/\bis-menu-active\S+/g) || []).join(' ');
      });
      $body.removeClass('is-no-scroll');
    };

    $('.js-menu-trigger').on('click', function() {
      const activeClass = $(this).attr('data-active-class');
      if ($body.hasClass(activeClass)) {
        menuCloseAll();
      } else {
        $body.addClass('is-no-scroll');
        $body.addClass(activeClass);
      }
      return false;
    });
    $('body').on('click', function(e) {
      if (!$(e.target).closest('.js-slide-wrapper').length) {
        menuCloseAll();
      }
      return false;
    });
  })();
})();
