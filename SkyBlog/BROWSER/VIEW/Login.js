SkyBlog.Login = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// password store
		passwordStore = SkyBlog.STORE('passwordStore'),
		
		// auth room
		authRoom = SkyBlog.ROOM('authRoom'),
		
		// wrapper
		wrapper = DIV({
			style : {
				padding : 10
			},
			c : UUI.VALID_FORM({
				c : [UUI.FULL_INPUT({
					style : {
						border : '1px solid #999'
					},
					placeholder : '비밀번호',
					name : 'password',
					type : 'password'
				}), UUI.FULL_CHECKBOX({
					style : {
						marginTop : 10
					},
					label : '로그인을 유지하시겠습니까?',
					name : 'isRememberMe'
				}), UUI.FULL_SUBMIT({
					style : {
						marginTop : 10,
						backgroundColor : BROWSER_CONFIG.SkyBlog.baseColor,
						color : '#fff',
						fontWeight : 'bold'
					},
					value : '로그인'
				})],
				on : {
					submit : function(e, form) {
						
						var
						// data
						data = form.getData();
						
						authRoom.send({
							methodName : 'auth',
							data : data.password
						}, function(isAuthed) {
							
							if (isAuthed === true) {
								
								passwordStore.save({
									name : 'password',
									value : data.password,
									isToSession : data.isRememberMe !== true
								});
								
								SkyBlog.REFRESH('');
								
							} else {
								UUI.NOTICE({
									style : {
										padding : '20px 30px',
										backgroundColor : BROWSER_CONFIG.SkyBlog.baseColor,
										color : '#fff'
									},
									msg : '비밀번호가 다릅니다.'
								});
							}
						});
					}
				}
			})
		}).appendTo(SkyBlog.Layout.getContent());
		
		TITLE('로그인 - ' + CONFIG.title);

		inner.on('close', function() {
			
			authRoom.exit();
			
			wrapper.remove();
		});
	}
});
