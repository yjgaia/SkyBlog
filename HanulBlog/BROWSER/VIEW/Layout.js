HanulBlog.Layout = CLASS(function(cls) {
	'use strict';

	var
	// is authed
	isAuthed = false,
	
	// content
	content,
	
	// check is authed.
	checkIsAuthed,
	
	// get content.
	getContent;
	
	cls.checkIsAuthed = checkIsAuthed = function() {
		return isAuthed;
	};
	
	cls.getContent = getContent = function() {
		return content;
	};

	return {

		preset : function() {
			return VIEW;
		},

		init : function(inner, self) {

			var
			// password store
			passwordStore = HanulBlog.STORE('passwordStore'),
			
			// auth room
			authRoom = HanulBlog.ROOM('authRoom'),
			
			// category
			category,
			
			// menu
			menu,
			
			// layout
			layout = Yogurt.MenuLayout({
				
				toolbar : Yogurt.Toolbar({
	
					style : {
						onDisplayResize : function(width, height) {
							if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
								return {
									display : 'none'
								};
							} else {
								return {
									display : 'block'
								};
							}
						}
					},
	
					// left
					left : Yogurt.ToolbarButton({
						img : IMG({
							src : Yogurt.R('menu.png')
						}),
						on : {
							tap : function(e) {
								layout.toggleLeftMenu();
							}
						}
					}),
	
					// title
					title : H1({
						style : {
							cursor : 'pointer'
						},
						c : A({
							style : {
								textDecoration : 'none'
							},
							href : HanulBlog.HREF(''),
							c : CONFIG.title
						}),
						on : {
							tap : function(e) {
								HanulBlog.GO('');
								e.stopDefault();
							}
						}
					})
				}),
	
				leftMenu : DIV({
					style : {
						color : '#fff',
						fontWeight : 'bold'
					},
					c : [H1({
						style : {
							padding : 10,
							fontSize : 30,
							fontWeight : 'bold',
							cursor : 'pointer',
							onDisplayResize : function(width, height) {
								if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
									return {
										display : 'block'
									};
								} else {
									return {
										display : 'none'
									};
								}
							}
						},
						c : A({
							style : {
								textDecoration : 'none'
							},
							href : HanulBlog.HREF(''),
							c : CONFIG.title
						}),
						on : {
							tap : function(e) {
								HanulBlog.GO('');
								e.stopDefault();
							}
						}
					}),
					
					// category
					category = DIV({
						c : UUI.BUTTON_H({
							style : {
								padding : '10px 10px 5px 10px'
							},
							title : A({
								style : {
									textDecoration : 'none'
								},
								href : HanulBlog.HREF(''),
								c : '전체보기'
							}),
							on : {
								tap : function(e) {
									HanulBlog.GO('');
									layout.hideLeftMenu();
									e.stopDefault();
								}
							}
						})
					}),
					
					// menu
					menu = DIV(),
					
					// email
					BROWSER_CONFIG.HanulBlog.email === undefined ? '' : A({
						style : {
							padding : 10,
							textDecoration : 'none'
						},
						c : BROWSER_CONFIG.HanulBlog.email,
						href : 'mailto:' + BROWSER_CONFIG.HanulBlog.email
					})]
				}),
				
				c : content = DIV()
				
			}).appendTo(BODY);
			
			authRoom.send({
				methodName : 'auth',
				data : passwordStore.get('password')
			}, function(_isAuthed) {
				
				isAuthed = _isAuthed;
				
				if (inner.checkIsClosed() !== true) {
				
					menu.append(UUI.BUTTON_H({
						style : {
							padding : 10
						},
						title : isAuthed === true ? '글 작성' : '로그인',
						on : {
							tap : function() {
								HanulBlog.GO(isAuthed === true ? 'new' : 'login');
								layout.hideLeftMenu();
							}
						}
					}));
				}
			});
			
			HanulBlog.CategoryModel.find({
				sort : {
					articleCount : -1
				}
			}, function(categoryDataSet) {
				
				if (inner.checkIsClosed() !== true) {
					
					EACH(categoryDataSet, function(categoryData) {
						
						var
						// category dom
						categoryDom;
						
						category.append(UUI.BUTTON_H({
							style : {
								padding : '5px 10px'
							},
							title : [categoryDom = SPAN({
								c : categoryData.id
							}), ' (' + categoryData.articleCount + ')'],
							href : HanulBlog.HREF('list/' + categoryData.id + '/1'),
							on : {
								tap : function(e) {
									HanulBlog.GO('list/' + categoryData.id + '/1');
									layout.hideLeftMenu();
									e.stopDefault();
								}
							}
						}));
						
						GET({
							host : 'tagengine.btncafe.com',
							uri : '__REP_TAG',
							paramStr : 'tag=' + encodeURIComponent(categoryData.id)
						}, function(category) {
							if (inner.checkIsClosed() !== true) {
								categoryDom.empty();
								categoryDom.append(category);
							}
						});
					});
				}
			});
			
			inner.on('close', function() {
				
				authRoom.exit();
				
				layout.remove();
				
				content = undefined;
			});
		}
	};
});
