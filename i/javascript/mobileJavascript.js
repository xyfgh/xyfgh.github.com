// 页面加载与窗口尺寸变化时，计算rem
adaptiveRootFontSize(375);
// 页面加载时,渐变显示内容
$(function () {
	$("html").animate({"opacity":"1"},200);
})