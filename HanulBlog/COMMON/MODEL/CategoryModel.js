HanulBlog.CategoryModel = OBJECT({

	preset : function() {
		'use strict';

		return HanulBlog.MODEL;
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
					role : 'MASTER'
				},
				update : {
					valid : VALID(validDataSet),
					role : 'MASTER'
				},
				remove : {
					role : 'MASTER'
				}
			}
		};
	}
});
