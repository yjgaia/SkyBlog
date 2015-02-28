HanulBlog.List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// list
		list,
		
		// page numbers
		pageNumbers,
		
		// wrapper
		wrapper = DIV({
			style : {
				paddingBottom : 10
			},
			c : [list = UUI.LIST(), pageNumbers = UUI.LIST(), CLEAR_BOTH()]
		}).appendTo(HanulBlog.Layout.getContent());
		
		inner.on('paramsChange', function(params) {
			
			var
			// tag
			tag = params.tag,
			
			// page
			page = params.page;
			
			if (page === undefined) {
				page = 1;
			} else {
				page = INTEGER(page);
			}
			
			list.removeAllItems();
			
			HanulBlog.ArticleModel.find({
				filter : {
					category : tag
				},
				start : (page - 1) * BROWSER_CONFIG.HanulBlog.listArticleCount,
				count : BROWSER_CONFIG.HanulBlog.listArticleCount
			}, EACH(function(articleData) {
				
				list.addItem({
					key : articleData.id,
					item : LI({
						c : HanulBlog.View.createDom(articleData)
					})
				});
			}));
			
			pageNumbers.removeAllItems();
			
			HanulBlog.ArticleModel.count({
				filter : {
					category : tag
				}
			}, function(count) {
				
				REPEAT((count - 1) / BROWSER_CONFIG.HanulBlog.listArticleCount + 1, function(i) {
				
					pageNumbers.addItem({
						key : i + 1,
						item : LI({
							style : {
								flt : 'left',
								marginLeft : 10
							},
							c : A({
								style : {
									cursor : 'pointer'
								},
								c : i + 1,
								on : {
									tap : function() {
										HanulBlog.GO('list/' + (tag === undefined ? '' : tag + '/') + (i + 1));
									}
								}
							})
						})
					});
				});
			});
			
			if (tag === undefined) {
				TITLE(CONFIG.title);
			} else {
				TITLE(CONFIG.title + ' :: ' + tag);
			}
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
