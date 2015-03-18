/*在任何浏览器上测试任何对象的某个特性是否存在*/
function isHostMethod (obj,property){
	var t = typeof obj[property];
	return t == 'function' || 
		(!!(t=='object'&&obj[property])) || //IE8以前的COM对象错误
		t == 'unknown';	//IE 的ActiveXObject的open方法会返回unknow
}


/*userAgent用户代理检测*/
function client (){
	//呈现引擎储存的obj
	var engine = {
		ie:0,
		gecko:0,
		webkit:0,
		khtml:0,
		opera:0,
		ver:null
	};
	//浏览器检测结果储存obj
	var browser = {
		ie:0,
		firefox:0,
		chrome:0,
		safari:0,
		konq:0,
		opera:0,
		ver:null
	};
	//操作系统检测结果储存obj
	var system = {
		win:false,
		mac:false,
		x11:false,
	};
	var ua = window.navigator.userAgent;
	var platform = window.navigator.platform;
	//opera引擎的识别
	if(window.opera){
		engine.ver = browser.ver =  window.opera.version();
		engine.opera = browser.opear = parseFloat(engine.ver);
	}else if(/AppleWebKit\/(\S+)/.test(ua)){	//webkit引擎的识别
		engine.ver = RegExp['$1'];
		engine.webkit = parseFloat(engine.ver);
		//确定是chrome还是safari
		if(/Chrome\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.chrome = parseFloat(browser.ver);
		}else if(/Version\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.safari = parseFloat(browser.ver);
		}
	}else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){	//KHTML的识别
		engine.ver = browser.ver = RegExp['$1'];
		engine.khtml = browser.konq = parseFloat(engine.ver);
	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){ //Gecko引擎(如firefox)的设别
		engine.ver = RegExp['$1'];
		engine.gecko = parseFloat(engine.ver);
		//确定是否是Firefox
		if(/Firefox\/(\S+)/.test(ua)){
			browser.ver = RegExp['$1'];
			browser.firefox = parseFloat(browser.ver);
		}
	}else if(/MSIE ([^;]+)/.test(ua)){	//IE的识别
		engine.ver = browser.ver = RegExp['$1'];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}
	//操作系统的检测
	system.win = platform.indexOf('Win') == 0;
	system.mac = platform.indexOf('Mac') == 0;
	system.x11 = (platform.indexOf('X11') == 0) || (platform.indexOf('Linux') == 0);
	return {
		engine:engine,
		browser:browser,
		system:system
	}
}


/*遍历元素特性*/
function outputAttributes(elem){
	var arr = [],
		attName,
		attValue,
		i,
		lenth;
	for(i=0;i<elem.attributes.length;i++){
		attName = elem.attributes[i].nodeName;
		attValue = elem.attributes[i].nodeValue;
		if(elem.attributes[i].specified){	//验证IE中属性已经被指定
			arr.push(attName+'="'+attValue+'"');
		}
	}
	return arr.join(' ');
}

/*动态脚本*/
//动态载入外部脚本
function loadScript(url){
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.url = url;
	document.body.appendChild(script);
}

//动态载入内部脚本(可代替eval()函数)
function loadScriptStr(code){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));
	}catch(ex){
		script.text = code;
	}
	document.body.appendChild(script);
}