SkyBlog.MAIN = METHOD({

	run : function() {
		'use strict';
		
		SkyBlog.MATCH_VIEW({
			uri : '**',
			target : SkyBlog.Layout
		});

		SkyBlog.MATCH_VIEW({
			uri : ['', 'list/{page}', 'list/{category}/{page}'],
			target : SkyBlog.List
		});
		
		SkyBlog.MATCH_VIEW({
			uri : 'view/{id}',
			target : SkyBlog.View
		});
		
		SkyBlog.MATCH_VIEW({
			uri : ['new', 'update/{id}'],
			target : SkyBlog.Form
		});
		
		SkyBlog.MATCH_VIEW({
			uri : 'login',
			target : SkyBlog.Login
		});
	}
});
