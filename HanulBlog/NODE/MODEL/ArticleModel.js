OVERRIDE(HanulBlog.ArticleModel, function(origin) {
	'use strict';

	HanulBlog.ArticleModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

			inner.on('create', {
			
				before : function(data, next) {

					GET({
						host : 'tagengine.hanul.co',
						uri : '__TAG_INPUT',
						paramStr : 'tag=' + encodeURIComponent(data.category)
					}, function(category) {
						
						data.category = category;
					
						HanulBlog.CategoryModel.get(category, {
							
							notExists : function() {
								
								HanulBlog.CategoryModel.create({
									id : category
								}, next);
							},
							
							success : function() {
								
								HanulBlog.CategoryModel.update({
									id : category,
									$inc : {
										articleCount : 1
									}
								}, next);
							}
						});
					});
					
					return false;
				}
			});
			
			inner.on('remove', {
				
				after : function(originData) {
					
					HanulBlog.CategoryModel.update({
						id : originData.category,
						$inc : {
							articleCount : -1
						}
					}, function(categoryData) {
						
						if (categoryData.articleCount === 0) {
							HanulBlog.CategoryModel.remove(categoryData.id);
						}
					});
				}
			});
		}
	});
});
