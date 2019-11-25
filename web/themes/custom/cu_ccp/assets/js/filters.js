'use strict';

(function ($, Drupal) {
  Drupal.behaviors.programsFilters = {
    attach: function (context, settings) {
      $('.view', context).once('programsFilters').each(function() {
        var $view = $(this),
            $programs = $('.programs', $view),
            $filters = $('.program-filters', $view);

        $programs.find('button').each(function(i, el) {
          var triggers = $programs.find('button');
          var panels = $filters.children('div');

          $(el).on('click', function(e) {
            var btn = $(e.currentTarget), 
                ref = btn.attr('aria-controls'),
                trgt = $filters.find('div#'+ref),
                activBtn = btn.parent().find('button[aria-expanded="true"]'),
                activPanel;

            $(panels).each(function(n, panel_el) {
              if (!$(panel_el).is( ":hidden" )) {
                activPanel = $(panel_el);
              }
            });

            if (btn.attr('aria-expanded') === "true") {
              btn.attr('aria-expanded', "false");
              trgt.attr('hidden', 'true');
            }
            else {
              activBtn.attr('aria-expanded', "false");
              if (activPanel !== undefined) {
                activPanel.attr('hidden', 'true');
              }
              btn.attr('aria-expanded', "true");
              trgt.removeAttr('hidden');
            }
          });
        });
      });
    }
  };

  Drupal.behaviors.programsViewSummary = {
    attach: function (context, settings) {
      $('.view', context).once('programsViewSummary').each(function() {
        var $view = $(this),
            $filters = $('.program-filters', $view);

        if ($filters.length > 0) {
          $('.view-summary', $view).appendTo($('.view-filters form', $view));
        }
      });
    }
  };

  Drupal.behaviors.programsFilterFacets = {
    attach: function (context, settings) {
      $('.view', context).once('programsFilterFacets').each(function() {
        var $view = $(this),
            $programs = $('.programs', $view),
            $filters = $('.program-filters', $view),
            $panels = $filters.children('div'),
            $sorts = $('.sort', $view);

        // Make a new container element for the facets.
        var $facets = $('<div></div>').addClass('program-facets');

        $panels.each(function(n, panel_el) {
          var $selected = $('input[value!="All"]:checked', panel_el).closest('.form-item');
          $selected.each(function (n, selected_el) {
            var $selected_el = $(selected_el);
            var label = $('label', selected_el)
              .clone()
              .find('.tooltip')
                .remove()
                .end()
              .text();
            
            var $facet = $('<div></div>')
              .addClass('facet')
              .text(label)
              .appendTo($facets);

            $facet.on('click', function(e) {
              console.log($selected_el);
              $selected_el
                .find('input')
                  .removeAttr('checked')
                  .end()
                .closest('form')
                  .submit();
            });
          });
        });

        $facets.appendTo($sorts.closest('form'));
      });
    }
  };
  
})(jQuery, Drupal);

//# sourceMappingURL=filters.js.map
