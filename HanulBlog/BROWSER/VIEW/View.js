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
			style : {
				padding : 10
			}
		}).appendTo(HanulBlog.Layout.getContent());
		
		inner.on('paramsChange', function(params) {
			
			var
			// id
			id = params.id;
			
			HanulBlog.ArticleModel.get(id, function(articleData) {
				
				wrapper.empty();
				
				wrapper.append(UUI.BUTTON({
					style : {
						flt : 'left',
						color : '#4183c4'
					},
					title : '뒤로가기',
					on : {
						tap : function(e) {
							history.back();
						}
					}
				}));
				
				wrapper.append(CLEAR_BOTH());
				
				wrapper.append(HanulBlog.ArticleDom({
					articleData : articleData,
					isViewMode : true
				}).getPanel());
				
				TITLE(articleData.title + ' - ' + CONFIG.title);
			});
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
