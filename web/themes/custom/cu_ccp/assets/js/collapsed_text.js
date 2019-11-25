'use strict';

(function ($, Drupal) {
  Drupal.behaviors.ct = {
    attach: function (context, settings) {
      $('.collapsed-text',context).once('collapsed-text').each(function () {
        $('.btn-expand',this).on('click',function() {
          $(this).prev().toggleClass('expanded');
          var expanded = $(this).prev().hasClass('expanded');
          if(expanded) {
            $(this).text( $(this).data('toggletext').expanded );
          } else {
            $(this).text( $(this).data('toggletext').collapsed );
          }
        });
      });
    }
  }
})(jQuery, Drupal);

//# sourceMappingURL=collapsed_text.js.map
