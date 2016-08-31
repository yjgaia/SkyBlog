SkyBlog.CommentModel = OBJECT({

	preset : function() {
		'use strict';

		return SkyBlog.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			articleId : {
				notEmpty : true,
				id : true
			},
			
			name : {
				notEmpty : true,
				size : {
					max : 20
				}
			},

			password : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				}
			},
			
			content : {
				notEmpty : true,
				size : {
					max : 1000
				}
			}
		};

		return {
			name : 'Comment',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : false,
				remove : false
			}
		};
	}
});
