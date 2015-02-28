HanulBlog.MAIN=METHOD({run:function(){"use strict";HanulBlog.MATCH_VIEW({uri:"**",target:HanulBlog.Layout}),HanulBlog.MATCH_VIEW({uri:["","list/{page}","list/{tag}/{page}"],target:HanulBlog.List}),HanulBlog.MATCH_VIEW({uri:"view/{id}",target:HanulBlog.View}),HanulBlog.MATCH_VIEW({uri:["new","update/{id}"],target:HanulBlog.Form}),HanulBlog.MATCH_VIEW({uri:"login",target:HanulBlog.Login})}}),function(){function e(e){this.tokens=[],this.tokens.links={},this.options=e||u.defaults,this.rules=h.normal,this.options.gfm&&(this.rules=this.options.tables?h.tables:h.gfm)}function t(e,t){if(this.options=t||u.defaults,this.links=e,this.rules=p.normal,this.renderer=this.options.renderer||new n,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?p.breaks:p.gfm:this.options.pedantic&&(this.rules=p.pedantic)}function n(e){this.options=e||{}}function r(e){this.tokens=[],this.token=null,this.options=e||u.defaults,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options}function i(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s(e){return e.replace(/&([#\w]+);/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?String.fromCharCode("x"===t.charAt(1)?parseInt(t.substring(2),16):+t.substring(1)):""})}function o(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)}}function l(){}function a(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function u(t,n,s){if(s||"function"==typeof n){s||(s=n,n=null),n=a({},u.defaults,n||{});var o,l,h=n.highlight,p=0;try{o=e.lex(t,n)}catch(c){return s(c)}l=o.length;var g=function(e){if(e)return n.highlight=h,s(e);var t;try{t=r.parse(o,n)}catch(i){e=i}return n.highlight=h,e?s(e):s(null,t)};if(!h||h.length<3)return g();if(delete n.highlight,!l)return g();for(;p<o.length;p++)!function(e){return"code"!==e.type?--l||g():h(e.text,e.lang,function(t,n){return t?g(t):null==n||n===e.text?--l||g():(e.text=n,e.escaped=!0,void(--l||g()))})}(o[p])}else try{return n&&(n=a({},u.defaults,n)),r.parse(e.lex(t,n),n)}catch(c){if(c.message+="\nPlease report this to https://github.com/chjj/marked.",(n||u.defaults).silent)return"<p>An error occured:</p><pre>"+i(c.message+"",!0)+"</pre>";throw c}}var h={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:l,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:l,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:l,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};h.bullet=/(?:[*+-]|\d+\.)/,h.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,h.item=o(h.item,"gm")(/bull/g,h.bullet)(),h.list=o(h.list)(/bull/g,h.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+h.def.source+")")(),h.blockquote=o(h.blockquote)("def",h.def)(),h._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",h.html=o(h.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,h._tag)(),h.paragraph=o(h.paragraph)("hr",h.hr)("heading",h.heading)("lheading",h.lheading)("blockquote",h.blockquote)("tag","<"+h._tag)("def",h.def)(),h.normal=a({},h),h.gfm=a({},h.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),h.gfm.paragraph=o(h.paragraph)("(?!","(?!"+h.gfm.fences.source.replace("\\1","\\2")+"|"+h.list.source.replace("\\1","\\3")+"|")(),h.tables=a({},h.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=h,e.lex=function(t,n){var r=new e(n);return r.lex(t)},e.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},e.prototype.token=function(e,t,n){for(var r,i,s,o,l,a,u,p,c,e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),s[0].length>1&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:s.replace(/\n+$/,"")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/\n$/,"").split("\n")},p=0;p<a.align.length;p++)a.align[p]=/^ *-+: *$/.test(a.align[p])?"right":/^ *:-+: *$/.test(a.align[p])?"center":/^ *:-+ *$/.test(a.align[p])?"left":null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].split(/ *\| */);this.tokens.push(a)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t,!0),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),o=s[2],this.tokens.push({type:"list_start",ordered:o.length>1}),s=s[0].match(this.rules.item),r=!1,c=s.length,p=0;c>p;p++)a=s[p],u=a.length,a=a.replace(/^ *([*+-]|\d+\.) +/,""),~a.indexOf("\n ")&&(u-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&p!==c-1&&(l=h.bullet.exec(s[p+1])[0],o===l||o.length>1&&l.length>1||(e=s.slice(p+1).join("\n")+e,p=c-1)),i=r||/\n\n(?!\s*$)/.test(a),p!==c-1&&(r="\n"===a.charAt(a.length-1),i||(i=r)),this.tokens.push({type:i?"loose_item_start":"list_item_start"}),this.token(a,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===s[1]||"script"===s[1]||"style"===s[1],text:s[0]});else if(!n&&t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),this.tokens.links[s[1].toLowerCase()]={href:s[2],title:s[3]};else if(t&&(s=this.rules.table.exec(e))){for(e=e.substring(s[0].length),a={type:"table",header:s[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3].replace(/(?: *\| *)?\n$/,"").split("\n")},p=0;p<a.align.length;p++)a.align[p]=/^ *-+: *$/.test(a.align[p])?"right":/^ *:-+: *$/.test(a.align[p])?"center":/^ *:-+ *$/.test(a.align[p])?"left":null;for(p=0;p<a.cells.length;p++)a.cells[p]=a.cells[p].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(a)}else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var p={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:l,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:l,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};p._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,p._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,p.link=o(p.link)("inside",p._inside)("href",p._href)(),p.reflink=o(p.reflink)("inside",p._inside)(),p.normal=a({},p),p.pedantic=a({},p.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),p.gfm=a({},p.normal,{escape:o(p.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:o(p.text)("]|","~]|")("|","|https?://|")()}),p.breaks=a({},p.gfm,{br:o(p.br)("{2,}","*")(),text:o(p.gfm.text)("{2,}","*")()}),t.rules=p,t.output=function(e,n,r){var i=new t(n,r);return i.output(e)},t.prototype.output=function(e){for(var t,n,r,s,o="";e;)if(s=this.rules.escape.exec(e))e=e.substring(s[0].length),o+=s[1];else if(s=this.rules.autolink.exec(e))e=e.substring(s[0].length),"@"===s[2]?(n=this.mangle(":"===s[1].charAt(6)?s[1].substring(7):s[1]),r=this.mangle("mailto:")+n):(n=i(s[1]),r=n),o+=this.renderer.link(r,null,n);else if(this.inLink||!(s=this.rules.url.exec(e))){if(s=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),o+=this.options.sanitize?i(s[0]):s[0];else if(s=this.rules.link.exec(e))e=e.substring(s[0].length),this.inLink=!0,o+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(e))||(s=this.rules.nolink.exec(e))){if(e=e.substring(s[0].length),t=(s[2]||s[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){o+=s[0].charAt(0),e=s[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(s,t),this.inLink=!1}else if(s=this.rules.strong.exec(e))e=e.substring(s[0].length),o+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(e))e=e.substring(s[0].length),o+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(e))e=e.substring(s[0].length),o+=this.renderer.codespan(i(s[2],!0));else if(s=this.rules.br.exec(e))e=e.substring(s[0].length),o+=this.renderer.br();else if(s=this.rules.del.exec(e))e=e.substring(s[0].length),o+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),o+=i(this.smartypants(s[0]));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(s[0].length),n=i(s[1]),r=n,o+=this.renderer.link(r,null,n);return o},t.prototype.outputLink=function(e,t){var n=i(t.href),r=t.title?i(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,i(e[1]))},t.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},t.prototype.mangle=function(e){for(var t,n="",r=e.length,i=0;r>i;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},n.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+i(t,!0)+'">'+(n?e:i(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:i(e,!0))+"\n</code></pre>"},n.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},n.prototype.html=function(e){return e},n.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},n.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},n.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},n.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},n.prototype.paragraph=function(e){return"<p>"+e.replace(/\n/g,"<br>")+"</p>\n"},n.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},n.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},n.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},n.prototype.strong=function(e){return"<strong>"+e+"</strong>"},n.prototype.em=function(e){return"<em>"+e+"</em>"},n.prototype.codespan=function(e){return"<code>"+e+"</code>"},n.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},n.prototype.del=function(e){return"<del>"+e+"</del>"},n.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(s(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(i){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+n+"</a>"},n.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.parse=function(e,t,n){var i=new r(t,n);return i.parse(e)},r.prototype.parse=function(e){this.inline=new t(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var n="";this.next();)n+=this.tok();return n},r.prototype.next=function(){return this.token=this.tokens.pop()},r.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},r.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},r.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,i,s="",o="";for(n="",e=0;e<this.token.header.length;e++)r={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",i=0;i<t.length;i++)n+=this.renderer.tablecell(this.inline.output(t[i]),{header:!1,align:this.token.align[i]});o+=this.renderer.tablerow(n)}return this.renderer.table(s,o);case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":for(var o="",l=this.token.ordered;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,l);case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var a=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(a);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},l.exec=l,u.options=u.setOptions=function(e){return a(u.defaults,e),u},u.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new n,xhtml:!1},u.Parser=r,u.parser=r.parse,u.Renderer=n,u.Lexer=e,u.lexer=e.lex,u.InlineLexer=t,u.inlineLexer=t.output,u.parse=u,"undefined"!=typeof module&&"object"==typeof exports?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):this.marked=u}.call(function(){return this||("undefined"!=typeof window?window:global)}()),HanulBlog.Form=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t=DIV({style:{padding:10},c:UUI.VALID_FORM({errorMsgs:{category:{size:function(e){return"카테고리는 "+e.max+"글자 미만으로 입력해주세요."}},content:{notEmpty:"내용을 입력해주세요."}},errorMsgStyle:{padding:"5px 10px",backgroundColor:"#D83F25",color:"#fff"},c:[UUI.FULL_INPUT({style:{border:"1px solid #999"},placeholder:"카테고리",name:"category"}),UUI.FULL_INPUT({style:{marginTop:10,border:"1px solid #999"},placeholder:"제목",name:"title"}),UUI.FULL_TEXTAREA({style:{marginTop:10,border:"1px solid #999",height:300},placeholder:"내용",name:"content"}),UUI.FULL_SUBMIT({style:{marginTop:10,backgroundColor:BROWSER_CONFIG.HanulBlog.baseColor,color:"#fff",fontWeight:"bold"},value:"글 작성"})],on:{submit:function(e,t){var n=t.getData();HanulBlog.ArticleModel.create(n,{notValid:t.showErrors,success:function(e){HanulBlog.GO("view/"+e.id)}})}}})}).appendTo(HanulBlog.Layout.getContent());TITLE(CONFIG.title+" :: 글작성"),e.on("close",function(){t.remove()})}}),HanulBlog.Layout=CLASS(function(e){"use strict";var t,n;return e.getContent=n=function(){return t},{preset:function(){return VIEW},init:function(e){var n,r,i=HanulBlog.STORE("passwordStore"),s=HanulBlog.ROOM("authRoom"),o=Yogurt.MenuLayout({toolbar:Yogurt.Toolbar({style:{onDisplayResize:function(e){return e>Yogurt.MenuLayout.getHideMenuWinWidth()?{display:"none"}:{display:"block"}}},left:Yogurt.ToolbarButton({img:IMG({src:Yogurt.R("menu.png")}),on:{tap:function(){o.toggleLeftMenu()}}}),title:CONFIG.title}),leftMenu:DIV({style:{color:"#fff",fontWeight:"bold"},c:[H1({style:{padding:10,fontSize:30,fontWeight:"bold",cursor:"pointer",onDisplayResize:function(e){return e>Yogurt.MenuLayout.getHideMenuWinWidth()?{display:"block"}:{display:"none"}}},c:CONFIG.title,on:{tap:function(){HanulBlog.GO("")}}}),n=DIV(),r=DIV()]}),c:t=DIV()}).appendTo(BODY);s.send({methodName:"auth",data:i.get("password")},function(e){void 0!==r&&r.append(UUI.BUTTON_H({style:{padding:10},title:e===!0?"글 작성":"로그인",on:{tap:function(){HanulBlog.GO(e===!0?"new":"login"),o.hideLeftMenu()}}}))}),HanulBlog.CategoryModel.find({sort:{articleCount:-1}},EACH(function(e){var t;n.append(UUI.BUTTON_H({style:{padding:"5px 10px"},title:[t=SPAN({c:e.id})," ("+e.articleCount+")"],on:{tap:function(){HanulBlog.GO("list/"+e.id+"/1"),o.hideLeftMenu()}}})),GET({host:"tagengine.btncafe.com",uri:"__REP_TAG",paramStr:"tag="+encodeURIComponent(e.id)},function(e){t.empty(),t.append(e)})})),e.on("close",function(){s.exit(),o.remove(),r=void 0,t=void 0})}}}),HanulBlog.List=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t,n,r=DIV({style:{paddingBottom:10},c:[t=UUI.LIST(),n=UUI.LIST(),CLEAR_BOTH()]}).appendTo(HanulBlog.Layout.getContent());e.on("paramsChange",function(e){var r=e.tag,i=e.page;i=void 0===i?1:INTEGER(i),t.removeAllItems(),HanulBlog.ArticleModel.find({filter:{category:r},start:(i-1)*BROWSER_CONFIG.HanulBlog.listArticleCount,count:BROWSER_CONFIG.HanulBlog.listArticleCount},EACH(function(e){t.addItem({key:e.id,item:LI({c:HanulBlog.View.createDom(e)})})})),n.removeAllItems(),HanulBlog.ArticleModel.count({filter:{category:r}},function(e){REPEAT((e-1)/BROWSER_CONFIG.HanulBlog.listArticleCount+1,function(e){n.addItem({key:e+1,item:LI({style:{flt:"left",marginLeft:10},c:A({style:{cursor:"pointer"},c:e+1,on:{tap:function(){HanulBlog.GO("list/"+(void 0===r?"":r+"/")+(e+1))}}})})})})}),TITLE(void 0===r?CONFIG.title:CONFIG.title+" :: "+r)}),e.on("close",function(){r.remove()})}}),HanulBlog.Login=CLASS({preset:function(){"use strict";return VIEW},init:function(e){"use strict";var t=HanulBlog.STORE("passwordStore"),n=HanulBlog.ROOM("authRoom"),r=DIV({style:{padding:10},c:UUI.VALID_FORM({c:[UUI.FULL_INPUT({style:{border:"1px solid #999"},placeholder:"비밀번호",name:"password",type:"password"}),UUI.FULL_CHECKBOX({style:{marginTop:10},label:"로그인을 유지하시겠습니까?",name:"isRememberMe"}),UUI.FULL_SUBMIT({style:{marginTop:10,backgroundColor:BROWSER_CONFIG.HanulBlog.baseColor,color:"#fff",fontWeight:"bold"},value:"로그인"})],on:{submit:function(e,r){var i=r.getData();n.send({methodName:"auth",data:i.password},function(e){e===!0?(t.save({name:"password",value:i.password,isToSession:i.isRememberMe!==!0}),HanulBlog.REFRESH("")):UUI.MODAL({style:{padding:"20px 30px",backgroundColor:BROWSER_CONFIG.HanulBlog.baseColor,color:"#fff"},c:"비밀번호가 다릅니다."})})}}})}).appendTo(HanulBlog.Layout.getContent());TITLE(CONFIG.title+" :: 로그인"),e.on("close",function(){n.exit(),r.remove()})}}),HanulBlog.View=CLASS(function(e){"use strict";var t;return e.createDom=t=function(e){var t,n;return t=UUI.PANEL({style:{margin:10},contentStyle:{border:"1px solid #ccc"},c:[H3({style:{padding:10,fontWeight:"bold"},c:e.title}),n=P({style:{borderTop:"1px solid #ccc",padding:10,fontSize:14}})]}),n.getEl().setAttribute("class","markdown-body"),n.getEl().innerHTML=marked(e.content),t},{preset:function(){return VIEW},init:function(e){var t=DIV().appendTo(HanulBlog.Layout.getContent());e.on("paramsChange",function(e){var n=e.id;HanulBlog.ArticleModel.get(n,function(e){t.empty(),t.append(HanulBlog.View.createDom(e)),TITLE(CONFIG.title+" :: "+e.title)})}),e.on("close",function(){t.remove()})}}});