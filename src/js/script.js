(function() {
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
})();
