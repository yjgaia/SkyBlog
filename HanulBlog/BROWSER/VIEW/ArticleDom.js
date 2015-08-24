HanulBlog.ArticleDom = CLASS(function(cls) {
	'use strict';
	
	var
	// comment th style
	commentThStyle = {
		padding : 10,
		fontWeight : 'bold',
		border : '1px solid #eee'
	},
	
	// comment td style
	commentTdStyle = {
		padding : 10,
		border : '1px solid #eee'
	};
	
	return {
		
		init : function(inner, self, params) {
			//REQUIRED: params
			//REQUIRED: params.articleData
			//OPTIONAL: params.isViewMode
			//OPTIONAL: params.isShowCategory
			
			var
			// article data
			articleData = params.articleData,
			
			// is view mode
			isViewMode = params.isViewMode,
			
			// is show category
			isShowCategory = params.isShowCategory,
			
			// cal
			cal = CALENDAR(TIME(articleData.createTime)),
			
			// browser info
			browserInfo = INFO.getBrowserInfo(),
			
			// panel
			panel,
			
			// category dom
			categoryDom,
			
			// content
			content,
					
			// comment form
			commentForm,
			
			// on new comment room
			onNewCommentRoom,
			
			// get panel.
			getPanel,
			
			// hide content.
			hideContent,
			
			// show content.
			showContent;
			
			panel = UUI.PANEL({
				style : {
					margin : '10px 0'
				},
				contentStyle : {
					border : '1px solid #ccc'
				},
				c : [H3({
					style : {
						padding : 10,
						cursor : isViewMode === true ? undefined : 'pointer'
					},
					c : [(isViewMode === true ? SPAN : A)({
						style : {
							flt : 'left',
							textDecoration : 'none',
							fontWeight : 'bold'
						},
						href : isViewMode === true ? undefined : HanulBlog.HREF('view/' + articleData.id),
						c : [isShowCategory === true ? categoryDom = SPAN({
							c : articleData.category
						}) : '', isShowCategory === true ? ' :: ' : '', articleData.title !== undefined && articleData.title !== '' ? articleData.title : (articleData.content.length > 100 ? articleData.content.substring(0, 100) + ' ...' : articleData.content)]
					}), SPAN({
						style : {
							flt : 'right',
							marginTop : 1,
							fontSize : 12,
							color : '#999'
						},
						c : cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + cal.getHour() + '시 ' + cal.getMinute() + '분'
					}), CLEAR_BOTH()],
					on : {
						tap : function(e) {
							if (isViewMode !== true) {
								HanulBlog.GO('view/' + articleData.id);
							}
						}
					}
				}), DIV({
					style : {
						borderTop : '1px solid #ccc',
						padding : 10
					},
					c : [HanulBlog.Layout.checkIsAuthed() === true ? DIV({
						style : {
							flt : 'right',
							color : '#4183c4',
							marginBottom : 10
						},
						c : [A({
							c : '글 수정',
							on : {
								tap : function() {
									HanulBlog.GO('update/' + articleData.id);
								}
							}
						}), ' ', A({
							c : '글 삭제',
							on : {
								tap : function() {
									
									if (confirm('정말 삭제하시겠습니까?') === true) {
										HanulBlog.ArticleModel.remove(articleData.id, function() {
											HanulBlog.REFRESH('');
										});
									}
								}
							}
						})]
					}) : '', CLEAR_BOTH(), content = P({
						style : {
							fontSize : 14
						}
					}), BROWSER_CONFIG.HanulBlog.isUsingComment === true ? UUI.VALID_FORM({
						errorMsgs : {
							name : {
								notEmpty : '이름을 입력해주시기 바랍니다.',
								size : function(validParams) {
									return '이름은 최대 ' + validParams.max + '글자 이하로 입력해주시기 바랍니다.';
								}
							},
							password : {
								notEmpty : '비밀번호를 입력해주시기 바랍니다.',
								size : function(validParams) {
									return '비밀번호는 최소 ' + validParams.min + '글자 이상, 최대 ' + validParams.max + '글자 이하로 입력해주시기 바랍니다.';
								}
							},
							content : {
								notEmpty : '내용을 입력해주시기 바랍니다.',
								size : function(validParams) {
									return '내용은 최대 ' + validParams.max + '글자 이하로 입력해주시기 바랍니다.';
								}
							}
						},
						errorMsgStyle : {
							color : 'red',
							padding : '5px 10px',
							backgroundColor : '#FCF2F2',
							border : '1px solid #DFB5B4',
							borderLeft : '5px solid #DFB5B4',
							marginBottom : -1
						},
						style : {
							marginTop : 15
						},
						c : TABLE({
							c : [TR({
								c : [TH({
									style : commentThStyle,
									c : '이름'
								}), TH({
									style : COMBINE([commentThStyle, {
										width : '50%'
									}]),
									c : '내용'
								}), TH({
									style : commentThStyle,
									c : '작성일'
								})]
							}), commentForm = TR({
								c : [TD({
									style : commentThStyle,
									c : [UUI.FULL_INPUT({
										style : {
											border : '1px solid #ccc',
											borderRadius : '5px 5px 0 0'
										},
										name : 'name',
										placeholder : '이름'
									}), UUI.FULL_INPUT({
										style : {
											marginTop : -1,
											border : '1px solid #ccc',
											borderRadius : '0 0 5px 5px'
										},
										name : 'password',
										type : 'password',
										placeholder : '비밀번호'
									})]
								}), TD({
									style : commentThStyle,
									c : UUI.FULL_INPUT({
										style : {
											border : '1px solid #ccc',
											borderRadius : 5
										},
										name : 'content',
										placeholder : '댓글 작성'
									})
								}), TD({
									style : commentThStyle,
									c : UUI.FULL_SUBMIT({
										style : {
											width : 'auto',
											padding : '5px 10px',
											backgroundColor : '#428bca',
											color : '#fff',
											borderRadius : 5
										},
										value : '작성 완료'
									})
								})]
							})]
						}),
						on : {
							submit : function(e, form) {
								
								var
								// data
								data = form.getData();
								
								data.articleId = articleData.id;
								
								HanulBlog.CommentModel.create(data, {
									notValid : form.showErrors,
									success : function() {
										form.setData({
											name : data.name,
											password : data.password,
											content : ''
										});
									}
								});
							}
						}
					}) : '']
				})]
			});
			
			if (browserInfo.name === 'Internet Explorer' && browserInfo.version < 9) {
				content.append(articleData.content);
			} else {
				content.getEl().setAttribute('class', 'markdown-body');
				content.getEl().innerHTML = marked(articleData.content);
			}
			
			if (isShowCategory === true) {
			
				GET({
					host : 'tagengine.btncafe.com',
					uri : '__REP_TAG',
					paramStr : 'tag=' + encodeURIComponent(articleData.category)
				}, function(category) {
					categoryDom.empty();
					categoryDom.append(category);
				});
			}
			
			onNewCommentRoom = HanulBlog.CommentModel.onNewAndFindWatching({
				properties : {
					articleId : articleData.id
				}
			}, function(commentData, addUpdateHandler, addRemoveHandler) {
				
				var
				// tr
				tr,
				
				// create time cal
				createTimeCal = CALENDAR(commentData.createTime);
				
				if (panel !== undefined) {
				
					commentForm.before(tr = TR({
						c : [TD({
							style : commentTdStyle,
							c : commentData.name
						}), TD({
							style : commentTdStyle,
							c : [commentData.content, A({
								style : {
									marginLeft : 5,
									fontSize : 12,
									textDecoration : 'none',
									color : '#428bca'
								},
								c : '[삭제]',
								on : {
									tap : function() {
										HanulBlog.CommentModel.remove({
											id : commentData.id,
											password : prompt('비밀번호를 영문으로 입력해주세요.')
										});
									}
								}
							})]
						}), TD({
							style : commentTdStyle,
							c : createTimeCal.getYear() + '/' + createTimeCal.getMonth(true) + '/' + createTimeCal.getDate(true)
						})]
					}));
					
					addRemoveHandler(function() {
						tr.remove();
					});
				}
			});
			
			self.getPanel = getPanel = function() {
				return panel;
			};
			
			self.hideContent = hideContent = function() {
				content.hide();
			};
			
			self.showContent = showContent = function() {
				content.show();
			};
			
			panel.on('remove', function() {
				onNewCommentRoom.exit();
				panel = undefined;
			});
		}
	};
});