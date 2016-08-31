SkyBlog.MAIN = METHOD({

	run : function(addRequestListener) {
		'use strict';
		
		var
		//IMPORT: Less
		Less = require('less');
		
		addRequestListener(NSP_BRIDGE({
			rootPath : './SkyBlog/view',
			restURI : [],
			templateEngine : SML
		}).requestListener);
		
		RESOURCE_SERVER.addPreprocessor({
			extension : 'less',
			preprocessor : function(content, response) {
				
				Less.render(content, function(error, output) {
					response({
						content : output.css,
						contentType : 'text/css',
						version : CONFIG.version
					});
				});
			}
		});
	}
});
