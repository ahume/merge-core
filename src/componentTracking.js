define(function() {

    function initialise() {
        //if (guardian.r2.omniture.trackComponents && guardian.r2.omniture.isAvailable()) {
      
            jQ('body').delegate(".trackable-component a", "click", function(event) {

                var link = jQ(this);
                var container = link.parents('.trackable-component');
                var componentName = container.data('component');

                if (componentName) {
                    var linkName = link.closest('[data-link-name]').data('link-name');
                    linkName = linkName ? componentName + ': ' + linkName : componentName;
                    s.linkTrackVars = 'eVar7,eVar37,events';
                    s.linkTrackEvents = 'event37';
                    s.eVar37=componentName;
                    s.eVar7=s.pageName;
                    s.events='event37';

                    var linkHref = link.attr('href');
                    var delay = (linkHref && (linkHref.indexOf('#') === 0 || linkHref.indexOf('javascript') === 0)) ? true : this;
                    s.tl(delay,'o',linkName);
                }

            });
        }
    //}

    return {
        initialise: initialise
    }

});