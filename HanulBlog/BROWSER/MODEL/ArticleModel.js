OVERRIDE(HanulBlog.ArticleModel, function(origin) {
	'use strict';

	HanulBlog.ArticleModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

			var
			// room
			room = self.getRoom(),
			
			// change category.
			changeCategory;
			
			self.changeCategory = changeCategory = function(params, callback) {
				//REQUIRED: params.originCaterogy
				//REQUIRED: params.newCategory
				//REQUIRED: callback
				
				room.send({
					methodName : 'changeCategory',
					data : params
				}, callback);
			};
		}
	});
});
