HanulBlog.Layout = CLASS(function(cls) {
	'use strict';

	var
	// content
	content,
	
	// get content.
	getContent;
	
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
					title : CONFIG.title
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
						c : CONFIG.title,
						on : {
							tap : function() {
								HanulBlog.GO('');
							}
						}
					}),
					
					// category
					category = DIV(),
					
					// menu
					menu = DIV()]
				}),
				
				c : content = DIV()
				
			}).appendTo(BODY);
			
			authRoom.send({
				methodName : 'auth',
				data : passwordStore.get('password')
			}, function(isAuthed) {
				
				if (menu !== undefined) {
				
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
			}, EACH(function(categoryData) {
				
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
					on : {
						tap : function() {
							HanulBlog.GO('list/' + categoryData.id + '/1');
							layout.hideLeftMenu();
						}
					}
				}));
				
				GET({
					host : 'tagengine.btncafe.com',
					uri : '__REP_TAG',
					paramStr : 'tag=' + encodeURIComponent(categoryData.id)
				}, function(category) {
					categoryDom.empty();
					categoryDom.append(category);
				});
			}));
			
			inner.on('close', function() {
				
				authRoom.exit();
				
				layout.remove();
				
				menu = undefined;
				content = undefined;
			});
		}
	};
});
