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
			baseColor : '#333',
			listArticleCount : 5,
			email : 'contact 메일 주소'
		},
		
		Yogurt : {
			toolbarColor : '#333',
			buttonColor : '#333',
			menuLayoutMenuWidth : 250,
			menuLayoutMenuBackgroundColor : '#333'
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
