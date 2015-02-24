HanulBlog.MAIN = METHOD({

	run : function() {
		'use strict';
		
		HanulBlog.MATCH_VIEW({
			uri : '**',
			target : HanulBlog.Layout
		});

		HanulBlog.MATCH_VIEW({
			uri : ['', 'list/{page}', 'list/{tag}/{page}'],
			target : HanulBlog.List
		});
		
		HanulBlog.MATCH_VIEW({
			uri : 'view/{id}',
			target : HanulBlog.View
		});
		
		HanulBlog.MATCH_VIEW({
			uri : ['new', 'update/{id}'],
			target : HanulBlog.Form
		});
		
		HanulBlog.MATCH_VIEW({
			uri : 'login',
			target : HanulBlog.Login
		});
	}
});
