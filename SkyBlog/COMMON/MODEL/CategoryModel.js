SkyBlog.CategoryModel = OBJECT({

	preset : function() {
		'use strict';

		return SkyBlog.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			id : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			articleCount : {
				notEmpty : true,
				integer : true
			}
		};

		return {
			name : 'Category',
			isNotUsingObjectId : true,
			initData : {
				articleCount : 1
			},
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
