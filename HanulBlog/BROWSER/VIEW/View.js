HanulBlog.View = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV({
			c : 'View'
		}).appendTo(HanulBlog.Layout.getContent());

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
