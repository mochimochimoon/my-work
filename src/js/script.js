(function() {
  const $body = $('body');

  // Tab
  $('.js-tab-trigger').on('click', function() {
    const $trigger = $(this);
    if (!($trigger.hasClass('is-selected'))) {
      const number = $trigger.attr('data-tab');
      const $wrapper = $trigger.closest('.js-tab-wrapper');
      const targetSelector = `.js-tab-contents[data-tab="${number}"]`;
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
      })
      $wrapper.addClass(colClass);
    }
    return false;
  });

  // pagetop
  $('.js-pagetop-trigger').on('click', () => {
    $('html,body').animate({
      scrollTop: 0,
    }, 1000);
    return false;
  });
  $(window).on('scroll load', () => {
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
    // MENU閉じる関数
    const menuCloseAll = () => {
      $body.removeClass((index, className) => {
        return (className.match(/\bis-open-menu\S+/g) || []).join(' ');
      });
      $body.removeClass('is-no-scroll');
      $('.js-menu-trigger').removeClass('is-active');
    };
    // トリガーで展開
    $('.js-menu-trigger').on('click', function() {
      const activeClass = 'is-open-menu-' + $(this).attr('data-target-menu');
      const isMenuActive = $body.hasClass(activeClass);
      menuCloseAll();
      if (!(isMenuActive)) {
        $body.addClass('is-no-scroll');
        $body.addClass(activeClass);
        $(this).addClass('is-active');
      }
      return false;
    });
    $('body').on('click', function(e) {
      if (!$(e.target).closest('.js-slide-wrapper').length) {
        if (!$(e.target).closest('.header').length) {
          menuCloseAll();
        }
      }
    });
  })();

  // Modal
  (function() {
    // トリガーで展開
    $('.js-modal-trigger').on('click', function() {
      $(this).closest('.js-modal-wrapper').toggleClass('is-open-modal');
      return false;
    });
    $('.js-modal-close').on('click', function() {
      $('.is-open-modal').removeClass('is-open-modal');
      return false;
    });
    $('body').on('click', function(e) {
      if (!$(e.target).closest('.js-modal-body').length) {
        $('.is-open-modal').removeClass('is-open-modal');
      }
    });
  })();


  // More
  $('.js-more-trigger').on('click', function() {
    $(this).closest('.js-more-wrapper').toggleClass('is-more-open');
    return false;
  });

  // Slide in
  $(window).on('scroll load', () => {
    const scroll = $(window).scrollTop();
    const scrollBottom = scroll + $(window).innerHeight();
    $('.js-slide-in').each(function(i, elem) {
      const $elem = $(elem);
      if (scrollBottom >= $elem.offset().top + 200) {
        $elem.addClass('is-active');
      }
    });
  });
})();
