HanulBlog.Form = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// form
		form,
		
		// wrapper
		wrapper = DIV({
			style : {
				padding : 10
			},
			c : [UUI.BUTTON({
				style : {
					flt : 'left',
					color : '#4183c4'
				},
				title : '뒤로가기',
				on : {
					tap : function(e) {
						history.back();
					}
				}
			}), CLEAR_BOTH()]
		}).appendTo(HanulBlog.Layout.getContent());
		
		inner.on('paramsChange', function(params) {
			
			var
			// id
			id = params.id;
			
			NEXT([
			function(next) {
				
				if (id === undefined) {
					TITLE(CONFIG.title + ' :: 글작성');
					next();
				} else {
					TITLE(CONFIG.title + ' :: 글수정');
					HanulBlog.ArticleModel.get(id, next);
				}
			},
			
			function() {
				return function(articleData) {
					
					var
					// editor
					editor,
					
					// ace editor
					aceEditor,
					
					// category input
					categoryInput;
					
					if (inner.checkIsClosed() !== true) {
					
						if (form !== undefined) {
							form.remove();
						}
						
						wrapper.append(form = UUI.VALID_FORM({
							style : {
								marginTop : 10
							},
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
							c : [categoryInput = UUI.FULL_INPUT({
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
							}), editor = DIV({
								style : {
									marginTop : 10,
									height : 300
								}
							}), UUI.FULL_SUBMIT({
								style : {
									marginTop : 10,
									backgroundColor : BROWSER_CONFIG.HanulBlog.baseColor,
									color : '#fff',
									fontWeight : 'bold'
								},
								value : articleData === undefined ? '글 작성' : '글 수정'
							}), UUI.FULL_UPLOAD_FORM({
								style : {
									marginTop : 10
								},
								box : HanulBlog,
								uploadSuccess : function(fileData, form) {
									
									form.after(P({
										c : '![ScreenShot](' + HanulBlog.RF('THUMB/' + fileData.id) + ')'
									}));
								}
							})],
							on : {
								submit : function(e, form) {
									
									var
									// data
									data = form.getData();
									
									if (articleData !== undefined) {
										data.id = articleData.id;
									}
									
									data.content = aceEditor.getValue();
									
									(articleData === undefined ? HanulBlog.ArticleModel.create : HanulBlog.ArticleModel.update)(data, {
										notValid : form.showErrors,
										success : function(savedData) {
											HanulBlog.GO('view/' + savedData.id);
										}
									});
								}
							}
						}));
						
						aceEditor = ace.edit(editor.getEl());
					    aceEditor.setTheme('ace/theme/twilight');
					    aceEditor.getSession().setMode('ace/mode/markdown');
						
						if (articleData !== undefined) {
							form.setData(articleData);
							aceEditor.setValue(articleData.content, 1);
							
							GET({
								host : 'tagengine.btncafe.com',
								uri : '__REP_TAG',
								paramStr : 'tag=' + encodeURIComponent(articleData.category)
							}, categoryInput.setValue);
						}
					}
				};
			}]);
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
