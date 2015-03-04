HanulBlog.ArticleDom = CLASS({
	
	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.articleData
		//OPTIONAL: params.isViewMode
		//OPTIONAL: params.isShowCategory
		
		var
		// article data
		articleData = params.articleData,
		
		// is view mode
		isViewMode = params.isViewMode,
		
		// is show category
		isShowCategory = params.isShowCategory,
		
		// cal
		cal = CALENDAR(TIME(articleData.createTime)),
		
		// panel
		panel,
		
		// category dom
		categoryDom,
		
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
				margin : '10px 0'
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
					c : [isShowCategory === true ? categoryDom = SPAN({
						c : articleData.category
					}) : '', isShowCategory === true ? ' :: ' : '', articleData.title !== undefined && articleData.title !== '' ? articleData.title : (articleData.content.length > 100 ? articleData.content.substring(0, 100) + ' ...' : articleData.content)]
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
		
		if (isShowCategory === true) {
		
			GET({
				host : 'tagengine.btncafe.com',
				uri : '__REP_TAG',
				paramStr : 'tag=' + encodeURIComponent(articleData.category)
			}, function(category) {
				categoryDom.empty();
				categoryDom.append(category);
			});
		}
		
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