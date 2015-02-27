HanulBlog.Form = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV({
			style : {
				padding : 10
			},
			c : UUI.VALID_FORM({
				errorMsgs : {
					category : {
						size : function(validParams) {
							return '카테고리는 ' + validParams.max + '글자 미만으로 입력해주세요.';
						}
					},
					content : {
						notEmpty : '내용을 입력해주세요.'
					}
				},
				errorMsgStyle : {
					padding : '5px 10px',
					backgroundColor : '#D83F25',
					color : '#fff'
				},
				c : [UUI.FULL_INPUT({
					style : {
						border : '1px solid #999'
					},
					placeholder : '카테고리',
					name : 'category'
				}), UUI.FULL_INPUT({
					style : {
						marginTop : 10,
						border : '1px solid #999'
					},
					placeholder : '제목',
					name : 'title'
				}), UUI.FULL_TEXTAREA({
					style : {
						marginTop : 10,
						border : '1px solid #999'
					},
					placeholder : '내용',
					name : 'content'
				}), UUI.FULL_SUBMIT({
					style : {
						marginTop : 10,
						backgroundColor : BROWSER_CONFIG.HanulBlog.baseColor,
						color : '#fff',
						fontWeight : 'bold'
					},
					value : '글 작성'
				})],
				on : {
					submit : function(e, form) {
						
						var
						// data
						data = form.getData();
						
						HanulBlog.ArticleModel.create(data, {
							notValid : form.showErrors,
							success : function(savedData) {
								HanulBlog.GO('view/' + savedData.id);
							}
						});
					}
				}
			})
		}).appendTo(HanulBlog.Layout.getContent());

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
