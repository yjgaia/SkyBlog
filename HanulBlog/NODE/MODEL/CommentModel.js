OVERRIDE(HanulBlog.CommentModel, function(origin) {
	'use strict';

	HanulBlog.CommentModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			
			inner.on('create', {

				before : function(data) {

					if (data.articleId !== undefined && data.password !== undefined) {
						data.password = SHA1({
							key : data.articleId,
							password : data.password
						});
					}
				}
			});
			
			HanulBlog.ROOM(self.getName(), function(clientInfo, on) {

				on('remove', function(params, ret) {
					
					var
					// id
					id,
					
					// password
					password;
					
					if (params !== undefined && params.password !== undefined && params.password !== null) {
					
						id = params.id;
						password = params.password;
						
						self.get(id, function(savedData) {
							
							if (savedData.password === SHA1({
								key : savedData.articleId,
								password : password
							})) {
								self.remove(id);
							}
							
							ret(savedData.password === SHA1({
								key : savedData.articleId,
								password : password
							}));
						});
					}
				});
			});
		}
	});
});
