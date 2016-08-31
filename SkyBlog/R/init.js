// Synchronous highlighting with highlight.js
marked.setOptions({
	highlight : function(code) {
		return hljs.highlightAuto(code).value;
	}
}); 