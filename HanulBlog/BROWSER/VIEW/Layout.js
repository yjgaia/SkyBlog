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
					title : BROWSER_CONFIG.HanulBlog.title
				}),
	
				leftMenu : menu = DIV({
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
						c : BROWSER_CONFIG.HanulBlog.title,
						on : {
							tap : function() {
								HanulBlog.GO('');
							}
						}
					})]
				}),
				
				c : content = DIV()
				
			}).appendTo(BODY);
			
			authRoom.send({
				methodName : 'auth',
				data : passwordStore.get('password')
			}, function(isAuthed) {
				
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
			});
			
			inner.on('close', function() {
				
				authRoom.exit();
				
				layout.remove();
				
				menu = undefined;
				content = undefined;
			});
		}
	};
});
