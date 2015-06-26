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
					TITLE('글작성 - ' + CONFIG.title);
					next();
				} else {
					TITLE('글수정 - ' + CONFIG.title);
					HanulBlog.ArticleModel.get(id, next);
				}
			},
			
			function() {
				return function(articleData) {
					
					var
					// editor
					editor,
					
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
									notEmpty : '카테고리를 입력해주세요.',
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
							}), editor = UUI.FULL_TEXTAREA({
								style : {
									marginTop : 10,
									height : 300,
									backgroundColor : '#000',
									padding : 10
								},
								textareaStyle : {
									color : '#fff',
									lineHeight : '1.4em'
								},
								name : 'content'
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
									
									if (fileData.type.substring(0, 6) === 'image/') {
										editor.setValue(editor.getValue() + '[![ScreenShot](' + HanulBlog.RF('THUMB/' + fileData.id) + ')](' + HanulBlog.RF(fileData.id) + ')', -1);
									} else {
										editor.setValue(editor.getValue() + '[](' + HanulBlog.RF(fileData.id) + ')', -1);
									}
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
									
									data.content = editor.getValue();
									
									(articleData === undefined ? HanulBlog.ArticleModel.create : HanulBlog.ArticleModel.update)(data, {
										notValid : function(validErrors) {
											
											var
											// error msg p
											errorMsgP;
											
											form.showErrors(validErrors);
											
											if (validErrors.content !== undefined) {
												
												editor.after(errorMsgP = P({
													style : form.getErrorMsgStyle(),
													c : form.getErrorMsgs(validErrors).content
												}));
												
												DELAY(2, function(delay) {
													if (inner.checkIsClosed() !== true) {
														errorMsgP.remove();
													}
												});
											}
										},
										success : function(savedData) {
											HanulBlog.GO('view/' + savedData.id);
										}
									});
								}
							}
						}));
						
						if (articleData !== undefined) {
							form.setData(articleData);
							editor.setValue(articleData.content, 1);
							
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
