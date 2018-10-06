/**
 * @name		Fully
 * @author		KK Quah
 * @version 	1.0
 * @license		MIT License
 */
 
(function($){	
	$.fn.fully = function(prop){	

		var options = $.extend({
			offset		: 0,			// offset
			vAlign		: 'top',
			callback	: function(){}
		},prop)
		
		return this.each(function(){
			var el = $(this);

			//wrap element to compare content and vh height
			if (!el.children().hasClass("fullyWrap")) {
				el.wrapInner('<div class="fullyWrap"></div>');
			}

			//add CSS
	
			if(options.vAlign == "center"){
				el.css('position','relative');
				el.children('.fullyWrap').css({'position':'absolute', 'top':'50%', 'bottom':'', 'transform':'translateY(-50%)', 'width': '100%'});
			} else if(options.vAlign == "bottom") {
				el.css('position','relative');
				el.children('.fullyWrap').css({'position':'absolute', 'bottom':'0', 'width': '100%'});	
			}

			var winH = document.documentElement.clientHeight;
	        var elH = el.children('.fullyWrap').height();

			//if content exceed vh
			var offset;

			if (/%/.test(options.offset)) {
  				offset = (options.offset.split('%')[0]/100)*winH;  				
  			} else {
  				offset = options.offset;
  			}
			
	        if (winH > (elH + offset)) {
	        	el.height(winH - offset);
	        } else {
	        	el.height('auto');
	        	el.children('.fullyWrap').css({'position':'', 'top':'', 'bottom':'', 'transform':'', 'width': ''});
	        }

		});

	};	
})(jQuery);