// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 函数功能：判断用户浏览器
// version1.0 2016.12.15 xiaoyufeng

// 参数不区分大小写
// 参数与返回值:
	// pc：      返回是否pc
	// mobile：  返回是否移动端
	// iphone：  返回是否iPhone
	// android： 返回是否Android
	// wechat：  返回是否微信
	// detail：  返回浏览器详情
	// 为空：    返回浏览器缩写
	// 其它：    返回true或false，并在控制台显示警告信息
function judgeUserAgent(parameter) {
	var userAgentInfo = navigator.userAgent;
	var pcAgents = ["Mac","Windows","Linux"];
	var mobileAgents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod","BlackBerry"];
	var Agents=[];
	var userAgent;
	var flag = false;
	if (!parameter) {
		Agents = mobileAgents.concat(pcAgents).concat(["micromessenger"]);
	}
	else{
		parameter = parameter.toLowerCase();//判断的参数不区分大小写，因此先转换为全部小写字母
		switch (parameter){
			case "mobile":
				Agents = mobileAgents;
				break;
			case "pc":
				return !judgeUserAgent("mobile");//由于Mac与iPhone、Linux与Android之间无法分辨，因此判断是否pc时采用反证的方法，非mobile即pc
				break;
			case "wechat":
				Agents = ["micromessenger"];
				break;
			case "detail":
				return userAgentInfo;
				break;
			case "iphone":case "android":case "widdows":case "mac":case "linux":
				Agents = [parameter];
				break;
			default:
				Agents = [parameter];
				console.warn("判断浏览器时，参数为“"+parameter+"”，请确认参数是否正确！\n 浏览器缩写为“"+judgeUserAgent()+"”");
				break;
		}
	}
	for (var v = 0; v < Agents.length; v++) {
	if (userAgentInfo.indexOf(Agents[v]) > 0) {
		flag = true;
		userAgent=Agents[v];
		break;
	}
	}
	if (parameter) {return flag;}
	else {return userAgent;}
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 函数功能：自适应根字号
// version1.0 2016.12.15 xiaoyufeng

// 默认参数为360，即默认移动端设计稿宽度为720px，在360px手机上，根字体字号为100px
// 参数为屏幕宽度
function adaptiveRootFontSize(screenWidth){
	if (!screenWidth) {screenWidth = 360;}
	window.onload = window.onresize = function () {
		document.documentElement.style.fontSize = document.body.offsetWidth/screenWidth*100 + "px";
		var windowHeight = window.innerHeight;
		if (document.getElementsByClassName("wrap-top").length == 0)topHeight = 0;else var topHeight = document.getElementsByClassName("wrap-top")[0].offsetHeight;
		if (document.getElementsByClassName("wrap-bottom").length == 0)bottomHeight = 0;else var bottomHeight = document.getElementsByClassName("wrap-bottom")[0].offsetHeight;
		if (document.getElementsByClassName("wrap-bottom").length != 0){document.getElementsByClassName("wrap-main")[0].style.height = windowHeight - topHeight - bottomHeight + "px";
		document.getElementsByClassName("wrap-main")[0].style.marginTop = topHeight + "px";}
	}
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var x = new xConstructor();
function xConstructor(parameter){
	if (parameter) {return $(parameter)}
}
xConstructor.prototype.adaptiveRootFontSize = adaptiveRootFontSize;
xConstructor.prototype.judgeUserAgent = judgeUserAgent;

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 触摸反馈
function touchFeedback(touchSelector,touchClass){
	touchSelector = touchSelector?touchSelector:".btn:not(.btn-disabled):not([disabled])";
	touchClass = touchClass ? touchClass:"touch-default";
	$(touchSelector).on("touchstart.touchFeedback",function () {
		$(this).addClass(touchClass);
		This = $(this)
		setTimeout(function () {
			This.removeClass(touchClass);
		},500)
	})
	// $(touchSelector).on("touchmove.touchFeedback",function () {
	// 	$(this).removeClass(touchClass);
	// })
	// $(touchSelector).on("touchend.touchFeedback",function () {
	// 	$(this).removeClass(touchClass);
	// })
}

// 创建手机页面标题栏
function creatMobilePageTitle(creatMobilePageTitleParameter) {
	title = creatMobilePageTitleParameter.title?creatMobilePageTitleParameter.title:"错误：缺少标题";
	titleClass = creatMobilePageTitleParameter.class?creatMobilePageTitleParameter.class+" topbar":"topbar";
	$(".wrap-page").before('<div class="wrap-top"><div class="'+titleClass+'">'+title+'</div></div>').css("margin-top","3.5em");
	if (creatMobilePageTitleParameter.backBotton) {
		$(".topbar").prepend('<a class="topbar-back" href="javascript:history.go(-1);">返回</a>');
	}
	touchFeedback(".topbar-back");
}