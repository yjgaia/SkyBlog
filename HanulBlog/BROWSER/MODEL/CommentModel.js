OVERRIDE(HanulBlog.CommentModel, function(origin) {
	'use strict';

	HanulBlog.CommentModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			
			var
			// room
			room = self.getRoom(),
			
			// remove.
			remove;
			
			self.remove = remove = function(params) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.password
				
				room.send({
					methodName : 'remove',
					data : params
				}, function(isCorrectPassword) {
					if (isCorrectPassword !== true) {
						alert('비밀번호가 틀렸습니다.');
					}
				});
			};
		}
	});
});
