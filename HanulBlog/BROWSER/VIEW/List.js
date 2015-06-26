HanulBlog.List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// category dom
		categoryDom,
		
		// list
		list,
		
		// page numbers
		pageNumbers,
		
		// article doms
		articleDoms = [],
		
		// is contents hiding
		isContentsHiding = false,
		
		// wrapper
		wrapper = DIV({
			style : {
				padding : 10
			},
			c : [categoryDom = DIV({
				style : {
					flt : 'left'
				}
			}), UUI.BUTTON({
				style : {
					flt : 'right',
					color : '#4183c4'
				},
				title : '내용 닫기',
				on : {
					tap : function(e, button) {
						
						if (isContentsHiding !== true) {
						
							EACH(articleDoms, function(articleDom) {
								articleDom.hideContent();
							});
							
							isContentsHiding = true;
							
							button.setTitle('내용 열기');
						
						} else {
							
							EACH(articleDoms, function(articleDom) {
								articleDom.showContent();
							});
							
							isContentsHiding = false;
							
							button.setTitle('내용 닫기');
						}
					}
				}
			}), CLEAR_BOTH(), list = UUI.LIST(), pageNumbers = UUI.LIST(), CLEAR_BOTH()]
		}).appendTo(HanulBlog.Layout.getContent());
		
		inner.on('paramsChange', function(params) {
			
			var
			// category
			category = params.category,
			
			// page
			page = params.page;
			
			categoryDom.empty();
			
			if (category !== undefined) {
				categoryDom.append(category);
				
				GET({
					host : 'tagengine.btncafe.com',
					uri : '__REP_TAG',
					paramStr : 'tag=' + encodeURIComponent(category)
				}, function(category) {
					if (inner.checkIsClosed() !== true) {
						categoryDom.empty();
						categoryDom.append(category);
					}
				});
			}
			
			if (page === undefined) {
				page = 1;
			} else {
				page = INTEGER(page);
			}
			list.removeAllItems();
			
			articleDoms = [];
			
			HanulBlog.ArticleModel.find({
				filter : {
					category : category
				},
				start : (page - 1) * BROWSER_CONFIG.HanulBlog.listArticleCount,
				count : BROWSER_CONFIG.HanulBlog.listArticleCount
			}, function(articleDataSet) {
				
				if (inner.checkIsClosed() !== true) {
						
					EACH(articleDataSet, function(articleData) {
					
						var
						// article dom
						articleDom = HanulBlog.ArticleDom({
							articleData : articleData,
							isShowCategory : category === undefined
						});
						
						list.addItem({
							key : articleData.id,
							item : LI({
								c : articleDom.getPanel()
							})
						});
						
						articleDoms.push(articleDom);
					});
				}
			});
			
			pageNumbers.removeAllItems();
			
			HanulBlog.ArticleModel.count({
				filter : {
					category : category
				}
			}, function(count) {
				
				if (inner.checkIsClosed() !== true) {
				
					REPEAT((count - 1) / BROWSER_CONFIG.HanulBlog.listArticleCount + 1, function(i) {
					
						pageNumbers.addItem({
							key : i + 1,
							item : LI({
								style : {
									flt : 'left',
									marginRight : 10
								},
								c : A({
									c : i + 1,
									href : HanulBlog.HREF('list/' + (category === undefined ? '' : category + '/') + (i + 1)),
									on : {
										tap : function(e) {
											HanulBlog.GO('list/' + (category === undefined ? '' : category + '/') + (i + 1));
										}
									}
								})
							})
						});
					});
				}
			});
			
			if (category === undefined) {
				TITLE(CONFIG.title);
			} else {
				TITLE(category + ' - ' + CONFIG.title);
			}
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
