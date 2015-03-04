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
		
		// article doms
		articleDoms = [],
		
		// is contents hiding
		isContentsHiding = false,
		
		// wrapper
		wrapper = DIV({
			style : {
				paddingBottom : 10
			},
			c : [UUI.BUTTON({
				style : {
					marginRight : 10,
					marginTop : 10,
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
			
			articleDoms = [];
			
			HanulBlog.ArticleModel.find({
				filter : {
					category : tag
				},
				start : (page - 1) * BROWSER_CONFIG.HanulBlog.listArticleCount,
				count : BROWSER_CONFIG.HanulBlog.listArticleCount
			}, EACH(function(articleData) {
				
				var
				// article dom
				articleDom = HanulBlog.ArticleDom({
					articleData : articleData
				});
				
				list.addItem({
					key : articleData.id,
					item : LI({
						c : articleDom.getPanel()
					})
				});
				
				articleDoms.push(articleDom);
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
								href : HanulBlog.HREF('list/' + (tag === undefined ? '' : tag + '/') + (i + 1)),
								on : {
									tap : function(e) {
										HanulBlog.GO('list/' + (tag === undefined ? '' : tag + '/') + (i + 1));
										e.stopDefault();
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
