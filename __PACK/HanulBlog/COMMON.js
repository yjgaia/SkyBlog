HanulBlog.ArticleModel=OBJECT({preset:function(){"use strict";return HanulBlog.MODEL},params:function(){"use strict";var t={category:{notEmpty:!0,size:{max:255}},title:!0,content:{notEmpty:!0}};return{name:"Article",methodConfig:{create:{valid:VALID(t),role:"ADMIN"},update:{valid:VALID(t),role:"ADMIN"},remove:{role:"ADMIN"}}}}}),HanulBlog.CategoryModel=OBJECT({preset:function(){"use strict";return HanulBlog.MODEL},params:function(){"use strict";var t={id:{notEmpty:!0,size:{max:255}},articleCount:{notEmpty:!0,integer:!0}};return{name:"Category",isNotUsingObjectId:!0,initData:{articleCount:1},methodConfig:{create:{valid:VALID(t),role:"ADMIN"},update:{valid:VALID(t),role:"ADMIN"},remove:{role:"ADMIN"}}}}});