/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @portedby: Adam Ayres
 * @requires: jQuery
 * 
 * Register a custom event and then fire it. 
 */
 
;(function($LITH) {
LITHIUM.CustomEvent = function(selector, triggerEvent) {
	if (LITHIUM.CustomEvent[triggerEvent] !== true) {
		LITHIUM.CustomEvent[triggerEvent] = true;
		
		LITHIUM.Cache.create("CustomEvent", ["elementId", "triggerEvent"]);
		
		$LITH(document).on(triggerEvent, selector, function(event) {		
			var element = $LITH(this);			
			var customEvent = LITHIUM.Cache.CustomEvent.get({ elementId: element.attr("id"), triggerEvent:event.handleObj.origType });   
			if (customEvent.fireEvent) {
				var fireEventObj = $LITH.Event(customEvent.fireEvent);
				fireEventObj.hasOwnProperty("data")
				     ? $LITH.extend(fireEventObj.data, customEvent.eventContext) 
				     : fireEventObj.data = customEvent.eventContext;
				
				element.trigger(fireEventObj);					
				if (fireEventObj.isDefaultPrevented() || fireEventObj.isPropagationStopped()) {
					return false;	
				}
			}
			if (customEvent.stopTriggerEvent) {
				return false;
			}
		});
	}
}

})(LITHIUM.jQuery);
