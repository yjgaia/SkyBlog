SkyBlog.ArticleModel = OBJECT({

	preset : function() {
		'use strict';

		return SkyBlog.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			// 카테고리는 입력해야 한다.
			category : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			// 제목은 입력해도 되고 안해도 된다.
			title : true,
			
			// 내용
			content : {
				// 내용은 꼭 입력해야겠죠?
				notEmpty : true
			}
		};

		return {
			name : 'Article',
			methodConfig : {
				create : {
					valid : VALID(validDataSet),
					role : 'ADMIN'
				},
				update : {
					valid : VALID(validDataSet),
					role : 'ADMIN'
				},
				remove : {
					role : 'ADMIN'
				}
			}
		};
	}
});
