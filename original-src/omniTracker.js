ensurePackage("guardian.r2.omniture");

var omnitracker = omnitracker || {};

/*
 * omniTrackEVar generates a call to Omniture to track an 'other' event (ie not a download or exit event)
 * Params:
 *  evarEventNum is the number used for BOTH Omniture evar and event.
 *  evarValue is the detailed text used for evar's description.
 *  eventType is a general description of the type of event.
 *  selector will be used by jQuery to identify the class or id to apply method to.
 * Example invocation: 37, "Books:Carousel:Latest Gu and Ob Reviews", "Carousel click", ".prev"
 */


//DEPRECATED - should be using component level tracking
omnitracker.omniTrackEVar = function ( evarEventNum, evarValue, eventType, selector ){
    omnitracker.omniTrackEVarEvent(evarEventNum, evarEventNum, evarValue, eventType, selector );
}

/*
 * omniTrackEVar generates a call to Omniture to track an 'other' event (ie not a download or exit event)
 * Params:
 *  evarNum is the number used for Omniture evar.
 *  eventNum is the number used for Omniture event.
 *  evarValue is the detailed text used for evar's description.
 *  eventType is a general description of the type of event.
 *  selector will be used by jQuery to identify the class or id to apply method to.
 * Example invocation: 12, 16, "World news: Reddit", "click", ".reddit"
 */

//DEPRECATED - should be using component level tracking
omnitracker.omniTrackEVarEvent = function ( evarNum, eventNum, evarValue, eventType, selector ){
      jQ(selector).click(function(){
        if(guardian.r2.omniture.isAvailable()) {
            var evar_key = 'eVar' + evarNum;
            var event = 'event' + eventNum;
            s.linkTrackVars = evar_key + ',events';
            s.linkTrackEvents = event;
            s.events = event;
            s[evar_key] = evarValue;
            // Call for Omniture link tracking for current object, link type = 'other'.
            s.tl(this, 'o', eventType);
        }
      });
}
