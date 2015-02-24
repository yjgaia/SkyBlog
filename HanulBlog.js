require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'HanulBlog',
		defaultTitle : 'Hanul Blog',

		// 2월 24일에 개발 시작
		webServerPort : 8224,
		
		baseBackgroundColor : '#fff',
		baseColor : '#000'
	},
	
	BROWSER_CONFIG : {
		
		// 블로그 기본 설정
		HanulBlog : {
			title : '하늘 블로그',
			baseColor : '#AB1A2D'
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
		
		HanulBlog : {
			password : 'test'
		}
	}
});
