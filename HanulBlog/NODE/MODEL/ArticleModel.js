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
					
						HanulBlog.CategoryModel.update({
							id : category,
							$inc : {
								articleCount : 1
							}
						}, {
							
							notExists : function() {
								
								HanulBlog.CategoryModel.create({
									id : category
								}, next);
							},
							
							success : next
						});
					});
					
					return false;
				}
			});
			
			inner.on('update', {
			
				before : function(data, next) {
					
					self.get(data.id, function(originData) {
						
						if (originData.category === data.category) {
							next();
						} else {
							
							GET({
								host : 'tagengine.hanul.co',
								uri : '__TAG_INPUT',
								paramStr : 'tag=' + encodeURIComponent(data.category)
							}, function(category) {
								
								data.category = category;
								
								if (originData.category === data.category) {
									next();
								} else {
									
									NEXT([
									function(next2) {
										
										HanulBlog.CategoryModel.update({
											id : category,
											$inc : {
												articleCount : 1
											}
										}, {
											
											notExists : function() {
												
												HanulBlog.CategoryModel.create({
													id : category
												}, next2);
											},
											
											success : next2
										});
									},
									
									function() {
										return function() {
											
											HanulBlog.CategoryModel.update({
												id : originData.category,
												$inc : {
													articleCount : -1
												}
											}, function(categoryData) {
												
												if (categoryData.articleCount === 0) {
													HanulBlog.CategoryModel.remove(categoryData.id, next);
												} else {
													next();
												}
											});
										};
									}]);
								}
							});
						}
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
			
			HanulBlog.ROOM(self.getName(), function(clientInfo, on) {

				on('changeCategory', function(params, ret) {
					
					var
					// origin category
					originCategory,
					
					// new category
					newCategory;
					
					if (params !== undefined) {
					
						originCategory = params.originCategory;
						newCategory = params.newCategory;
						
						self.find({
							filter : {
								category : originCategory
							},
							isFindAll : true
						}, function(savedDataSet) {
							
							var
							// data
							data;
							
							NEXT(savedDataSet, [
							function(savedData, next) {
								self.update({
									id : savedData.id,
									category : newCategory
								}, function(savedData) {
									data = savedData;
									next();
								});
							},
							
							function() {
								return function() {
									ret(data === undefined ? newCategory : data.category);
								};
							}]);
						});
					}
				});
			});
		}
	});
});
