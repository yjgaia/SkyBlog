HanulBlog.AuthRoom = OBJECT({
	
	init : function() {
		'use strict';
		
		HanulBlog.ROOM('authRoom', function(clientInfo, on, off) {
			
			on('auth', function(password, ret) {
				
				if (password === NODE_CONFIG.HanulBlog.password) {
					clientInfo.roles = ['MASTER'];
				}
				
				ret(password === NODE_CONFIG.HanulBlog.password);
			});
		});
	}
});
