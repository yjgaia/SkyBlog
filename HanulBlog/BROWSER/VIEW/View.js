HanulBlog.View = CLASS(function(cls) {
	'use strict';
	
	var
	// create dom.
	createDom;
	
	cls.createDom = createDom = function(articleData) {
		
		var
		// panel
		panel,
		
		// content
		content;
		
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
				c : articleData.title
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
		
		return panel;
	};
	
	return {

		preset : function() {
			return VIEW;
		},
	
		init : function(inner, self) {
			
			var
			// wrapper
			wrapper = DIV().appendTo(HanulBlog.Layout.getContent());
			
			inner.on('paramsChange', function(params) {
				
				var
				// id
				id = params.id;
				
				HanulBlog.ArticleModel.get(id, function(articleData) {
					
					wrapper.empty();
					wrapper.append(HanulBlog.View.createDom(articleData));
					
					TITLE(CONFIG.title + ' :: ' + articleData.title);
				});
			});
	
			inner.on('close', function() {
				wrapper.remove();
			});
		}
	};
});
