SkyBlog.Layout = CLASS(function(cls) {
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
			passwordStore = SkyBlog.STORE('passwordStore'),
			
			// auth room
			authRoom = SkyBlog.ROOM('authRoom'),
			
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
							href : SkyBlog.HREF(''),
							c : BROWSER_CONFIG.SkyBlog === undefined || BROWSER_CONFIG.SkyBlog.logoImage === undefined ? CONFIG.title : IMG({
								style : {
									height : 25
								},
								src : SkyBlog.R(BROWSER_CONFIG.SkyBlog.logoImage)
							})
						}),
						on : {
							tap : function(e) {
								SkyBlog.GO('');
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
							href : SkyBlog.HREF(''),
							c : BROWSER_CONFIG.SkyBlog === undefined || BROWSER_CONFIG.SkyBlog.logoImage === undefined ? CONFIG.title : IMG({
								src : SkyBlog.R(BROWSER_CONFIG.SkyBlog.logoImage)
							})
						}),
						on : {
							tap : function(e) {
								SkyBlog.GO('');
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
								href : SkyBlog.HREF(''),
								c : '전체보기'
							}),
							on : {
								tap : function(e) {
									SkyBlog.GO('');
									layout.hideLeftMenu();
								}
							}
						})
					}),
					
					// menu
					menu = DIV({
						style : {
							marginTop : 10
						}
					}),
					
					// email
					BROWSER_CONFIG.SkyBlog.email === undefined ? '' : A({
						style : {
							padding : 10,
							textDecoration : 'none'
						},
						c : BROWSER_CONFIG.SkyBlog.email,
						href : 'mailto:' + BROWSER_CONFIG.SkyBlog.email
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
								SkyBlog.GO(isAuthed === true ? 'new' : 'login');
								layout.hideLeftMenu();
							}
						}
					}));
				}
			});
			
			SkyBlog.CategoryModel.find({
				sort : {
					lastUpdateTime : -1
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
							href : SkyBlog.HREF('list/' + categoryData.id + '/1'),
							on : {
								tap : function(e) {
									SkyBlog.GO('list/' + categoryData.id + '/1');
									layout.hideLeftMenu();
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
