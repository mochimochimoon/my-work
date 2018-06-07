(function() {
  $('.js-tab-trigger').on('click', function() {
    const $trigger = $(this);
    const number = $trigger.attr('data-tab-number');
    const $wrapper = $trigger.closest('.js-tab-wrapper');
    const targetSelector = `.js-tab-contents[data-tab-number="${number}"]`;
    const $target = $wrapper.find(targetSelector);
    if (!($trigger.hasClass('is-selected'))) {
      $wrapper.find('.is-selected').removeClass('is-selected');
      $trigger.addClass('is-selected');
      $wrapper.find('.js-tab-contents.is-active').removeClass('is-active');
      $target.addClass('is-active');
    }
    return false;
  });
})();
