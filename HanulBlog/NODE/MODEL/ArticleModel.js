OVERRIDE(HanulBlog.ArticleModel, function(origin) {
	'use strict';

	HanulBlog.ArticleModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

			inner.on('create', {
				before : function(savedData) {

				}
			});
		}
	});
});
