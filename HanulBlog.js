require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {

		isDevMode : true,

		defaultBoxName : 'HanulBlog',
		
		title : 'Hanul Blog',

		// 2월 24일에 개발 시작
		webServerPort : 8224,
		
		maxThumbHeight : 400
	},
	
	BROWSER_CONFIG : {
		
		// 블로그 기본 설정
		HanulBlog : {
			baseColor : '#4183c4',
			listArticleCount : 10,
			email : 'contact 메일 주소',
			// 로고 이미지. 설정하지 않으면 CONFIG.title이 뜨게됩니다.
			// 높이는 40px에 맞추어주세요.
			logoImage : 'logo.png',
			isUsingComment : true
		},
		
		Yogurt : {
			toolbarColor : '#4183c4',
			buttonColor : '#4183c4',
			menuLayoutMenuWidth : 250,
			menuLayoutMenuBackgroundColor : '#4183c4'
		}
	},

	NODE_CONFIG : {
		
		dbName : 'HanulBlog-test',
		
		HanulBlog : {
			password : '1234'
		}
	}
});
