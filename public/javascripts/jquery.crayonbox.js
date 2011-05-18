;(function($){ // secure $ jQuery alias
/********************************************************
 * jquery.crayonbox.js - rev 3
 * Copyright (c) 2009, Gelform
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2009-01-20 | Updated: 2011-04
 * more info at: http://gelform.com/crayonbox-jquery-plugin/
 ********************************************************/

/**
 * create a crayonbox around a textfield
 * 
 * @param	object	opt	options
 */
jQuery.fn.crayonbox = function(opt)
{
	// set default options and overwrite them
	var options = jQuery.extend(
	{
		// your crayon colors
	    colors: ['Silver', 'Tomato', 'Orange', 'Yellow', 'Chartreuse', 'DeepSkyBlue', 'Violet'],
		
		// define a default selected color
	    selected: null, 
		
		// the tag that will wrap each crayon - span, a or button work well
		crayonTag: 'span',
		
		// optional X button that will clear your selected crayon
		clearButton: false,
		
		// function that gets called once a crayon has been selected, returns the crayonbox
		onSelection: function(){}
	}, opt);

	// return each object passed in
	return this.each(function()
	{
		var $this = $(this);
		
		// if textfield has a color, select it (overwritten by option)
		if ( '' !== $this.val() && null === options.selected )
		{
			options.selected = $this.val();
		};
		
		// set $self to containing span.crayonbox
		var $self = $this.wrap('<span class="crayonbox"></span>').parent('.crayonbox');

		// add click behavior
		$self.click(function(e)
		{
			var $clicked = $(e.target);
			if ( $clicked.hasClass('crayon') )
			{
				$self.uncolor();
				
				$clicked.html('&diams;').addClass('coloring');
				
				$('input', $self).val( $clicked.attr('title') );
			};
			
			// optional callback
			options.onSelection.call($self);
		});

		// build our crayons
		var html = '';
		for ( i=0; i<options.colors.length; i++ )
		{
			$('<' + options.crayonTag + ' class="crayon" title="' + options.colors[i] + '">&nbsp;</' + options.crayonTag + '>')
			.appendTo( $self )
			.css( 'background-color', options.colors[i] );
		};

		// add clear button
		if ( options.clearButton )
		{
			$('<' + options.crayonTag + ' class="boxlid">X</' + options.crayonTag + '>')
			.appendTo( $self )
			.click(function(){
				$this.parents('.crayonbox').uncolor();
			});
		};
		
		// select default crayon
		if ( null !== options.selected )
		{
			$self.find('[title=' + options.selected + ']').trigger('click');
		};
	});
};

/**
 * Unselect the selected crayon
 * 
 * @param	boolean	clearTextfield	option to clear the textfield as well 
 * @return	object	each item passed in 
 */
jQuery.fn.uncolor = function(clearTextfield)
{
	if (undefined === clearTextfield)
	{
		clearTextfield = true;
	};
	
	return this.each(function()
	{
		$('.coloring', this).html('&nbsp;').removeClass('coloring');
	});
}
/*******************************************************************************************/
})( jQuery ); // confine scope