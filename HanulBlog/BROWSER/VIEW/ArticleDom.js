HanulBlog.ArticleDom = CLASS({
	
	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.articleData
		//OPTIONAL: params.isViewMode
		
		var
		// article data
		articleData = params.articleData,
		
		// is view mode
		isViewMode = params.isViewMode,
		
		// panel
		panel,
		
		// content
		content,
		
		// get panel.
		getPanel,
		
		// hide content.
		hideContent,
		
		// show content.
		showContent;
		
		panel = UUI.PANEL({
			style : {
				margin : 10
			},
			contentStyle : {
				border : '1px solid #ccc'
			},
			c : [H3({
				style : {
					padding : 10,
					fontWeight : 'bold'
				},
				c : isViewMode === true ? articleData.title : A({
					style : {
						textDecoration : 'none'
					},
					href : HanulBlog.HREF('view/' + articleData.id),
					c : articleData.title
				}),
				on : {
					tap : function(e) {
						HanulBlog.GO('view/' + articleData.id);
						e.stopDefault();
					}
				}
			}), content = P({
				style : {
					borderTop : '1px solid #ccc',
					padding : 10,
					fontSize : 14
				}
			})]
		});
		
		content.getEl().setAttribute('class', 'markdown-body');
		content.getEl().innerHTML = marked(articleData.content);
		
		self.getPanel = getPanel = function() {
			return panel;
		};
		
		self.hideContent = hideContent = function() {
			content.hide();
		};
		
		self.showContent = showContent = function() {
			content.show();
		};
	}
});