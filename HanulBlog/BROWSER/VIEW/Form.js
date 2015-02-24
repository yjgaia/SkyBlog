HanulBlog.Form = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV({
			style : {
				padding : 10
			},
			c : UUI.VALID_FORM({
				c : [UUI.FULL_INPUT({
					style : {
						border : '1px solid #999'
					},
					placeholder : '제목',
					name : 'title'
				}), UUI.FULL_TEXTAREA({
					style : {
						marginTop : 10,
						border : '1px solid #999'
					},
					placeholder : '내용',
					name : 'content'
				})]
			})
		}).appendTo(HanulBlog.Layout.getContent());

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
