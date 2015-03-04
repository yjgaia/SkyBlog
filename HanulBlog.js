require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'HanulBlog',
		
		title : 'Hanul Blog',

		// 2월 24일에 개발 시작
		webServerPort : 8224
	},
	
	BROWSER_CONFIG : {
		
		// 블로그 기본 설정
		HanulBlog : {
			baseColor : '#AB1A2D',
			listArticleCount : 5,
			email : 'contact 메일 주소'
		},
		
		Yogurt : {
			toolbarColor : '#AB1A2D',
			buttonColor : '#AB1A2D',
			menuLayoutMenuWidth : 250,
			menuLayoutMenuBackgroundColor : '#AB1A2D'
		}
	},

	NODE_CONFIG : {
		
		dbName : 'HanulBlog-test',
		
		isUsingHTMLSnapshot : true,
		
		HanulBlog : {
			password : 'test'
		}
	}
});
