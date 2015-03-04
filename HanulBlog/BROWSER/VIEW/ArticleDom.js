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
		
		// title
		title = articleData.title !== undefined && articleData.title !== '' ? articleData.title : (articleData.content.length > 100 ? articleData.content.substring(0, 100) + ' ...' : articleData.content),
		
		// cal
		cal = CALENDAR(articleData.createTime),
		
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
					cursor : isViewMode === true ? undefined : 'pointer'
				},
				c : [A({
					style : {
						flt : 'left',
						textDecoration : 'none',
						fontWeight : 'bold'
					},
					href : isViewMode === true ? undefined : HanulBlog.HREF('view/' + articleData.id),
					c : title
				}), SPAN({
					style : {
						flt : 'right',
						marginTop : 1,
						fontSize : 12,
						color : '#999'
					},
					c : cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + cal.getHour() + '시 ' + cal.getMinute() + '분'
				}), CLEAR_BOTH()],
				on : {
					tap : function(e) {
						if (isViewMode !== true) {
							HanulBlog.GO('view/' + articleData.id);
							e.stopDefault();
						}
					}
				}
			}), DIV({
				style : {
					borderTop : '1px solid #ccc',
					padding : 10
				},
				c : [HanulBlog.Layout.checkIsAuthed() === true ? DIV({
					style : {
						flt : 'right',
						color : '#4183c4',
						marginBottom : 10
					},
					c : [A({
						c : '글 수정',
						on : {
							tap : function() {
								HanulBlog.GO('update/' + articleData.id);
							}
						}
					}), ' ', A({
						c : '글 삭제',
						on : {
							tap : function() {
								
								if (confirm('정말 삭제하시겠습니까?') === true) {
									HanulBlog.ArticleModel.remove(articleData.id, function() {
										HanulBlog.REFRESH('');
									});
								}
							}
						}
					})]
				}) : '', CLEAR_BOTH(), content = P({
					style : {
						fontSize : 14
					}
				})]
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