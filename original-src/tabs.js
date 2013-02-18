// ------------------------ tabs.js starts here ----------------------------

function initialiseTabs() {

    if(jQ('ul.tabs')) {
        
        var tab = jQ('ul.tabs:not(.fake) li a');
        
        // the following loop is to ensure that any pane that should be active is actually active
        var initiallyActive = jQ('ul.tabs:not(.fake) li a.active');
        var initialPane;
        for (i=0; i <= initiallyActive.length - 1; i++) {
            initialPane = '#' + initiallyActive[i].href.split('#')[1];
            jQ(initialPane).removeClass('initially-off');
        }
        
        jQ(tab).click(function(evt) {
            if(jQ(this).is('.inactive')) {
                
                var parentContainer = jQ(this).parents('div').get(0);
                var activeTab = jQ(parentContainer).find('ul.tabs:not(.fake) li a.active');
                var pane = '#' + this.href.split('#')[1];
                
                var activeTabHref = jQ(activeTab).attr('href');
                var activePane = '#' + activeTabHref.split('#')[1];
                
                jQ(activeTab).attr('class','inactive');
                jQ(this).attr('class','active');
                
                jQ(pane).show();
                jQ(activePane).hide();
            }
            evt.preventDefault();
        });
    }
}

jQ(document).ready(function() {

    initialiseTabs();
});

// ------------------------- tabs.js ends here -----------------------------
