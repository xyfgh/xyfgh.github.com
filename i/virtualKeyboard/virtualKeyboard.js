// 虚拟键盘参数：
// tyle         类型
// placeholder  占位符
// supportpc    PC是否可用
// maxlength    输入最大长度

// 已知并且暂时无法解决的bug：
// 1. 双击虚拟按键时，会触发iOS10中safari的自动缩放。原因：从iOS10开始，safari不支持禁止用户缩放视口。


// 根据type参数创建键盘
function keyboardCreate(type) {
	type = type.toLowerCase();
	if( type="idcard" && $(".IDCardKeyboard").length==0 ){IDCardKeyboardCreate();}
	if( type="amount" && $(".amountKeyboard").length==0 ){amountKeyboardCreate();}
	if( type="qwerty" && $(".qwertyKeyboard").length==0 ){qwertyKeyboardCreate();}
	if( type="province" && $(".provinceKeyboard").length==0 ){provinceKeyboardCreate();}
}
// 创建qwerty键盘
function qwertyKeyboardCreate() {
	var qwerty = [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L","删除"],["close","Z","X","C","V","B","N","M","确认"]];
	$('body').append('<div class="keyboard qwertyKeyboard"><div>');
	for (var i = 0; i <= qwerty.length - 1; i++) {
		var row = qwerty[i];
		var keyboardRow = $('<div class="keyboard-row qwertyKeyboard-row"></div>')
		for (var j = 0; j <= row.length - 1; j++) {
			var key = $('<div class="keyboard-item qwertyKeyboard-item">'+ row[j] +'</div>')
			keyboardRow.append(key);
			if(row[j] == "删除"){
				key.addClass("key-delete");
			}
			else if(row[j] == "确认"){
				key.addClass("key-confirm");
			}
			else if(row[j] == "close"){
				key.addClass("key-close");
			}
		}
		$('.qwertyKeyboard').append(keyboardRow);
	}
	defaultKeyboardLogic(".qwertyKeyboard");
}
// 创建省份键盘
function provinceKeyboardCreate() {
	var province = [["粤","川","鄂","甘","贵","桂","黑","沪"],["吉","冀","津","晋","京","辽","鲁","蒙"],["闽","宁","青","琼","陕","苏","皖","湘"],["新","渝","豫","云","藏","赣","浙"]];
	$('body').append('<div class="keyboard provinceKeyboard"><div>');
	for (var i = 0; i <= province.length - 1; i++) {
		var provinceRow = province[i];
		var provinceKeyboardRow = $('<div class="keyboard-row provinceKeyboard-row"></div>')
		for (var j = 0; j <= provinceRow.length - 1; j++) {
			var key = '<div class="keyboard-item provinceKeyboard-item">'+ provinceRow[j] +'</div>'
			provinceKeyboardRow.append(key);
		}
		$('.provinceKeyboard').append(provinceKeyboardRow);
	}
	provinceKeyboardLogic();
}
// 创建金额键盘
function amountKeyboardCreate() {
	var amountkey = [["1","2","3"],["4","5","6"],["7","8","9"],[".","0","close"],["del","确定"]]
	$('body').append('<div class="keyboard amountKeyboard nunKeyboard"><div>');
	for (var i = 0; i <= amountkey.length - 1; i++) {
		var row = amountkey[i];
		var keyboardRow = $('<div class="keyboard-row nunKeyboard-row"></div>')
		for (var j = 0; j <= row.length - 1; j++) {
			var key = $('<div class="keyboard-item amountKeyboard-item nunKeyboard-item">'+ row[j] +'</div>');
			keyboardRow.append(key);
			if(row[j] == "."){
				key.addClass("key-dot");
			}
			else if(row[j] == "del"){
				key.addClass("key-delete").parent().addClass("right");
			}
			else if(row[j] == "确定"){
				key.addClass("key-confirm");
			}
			else if(row[j] == "close"){
				key.addClass("key-close");
			}
		}
		$('.amountKeyboard').append(keyboardRow);
	}
	defaultKeyboardLogic(".amountKeyboard");
}
// 创建身份证号键盘
function IDCardKeyboardCreate() {
	var IDCardkey = [["1","2","3"],["4","5","6"],["7","8","9"],["x","0","close"],["del","确定"]]
	$('body').append('<div class="keyboard IDCardKeyboard nunKeyboard"><div>');
	for (var i = 0; i <= IDCardkey.length - 1; i++) {
		var row = IDCardkey[i];
		var keyboardRow = $('<div class="keyboard-row IDCardKeyboard-row nunKeyboard-row"></div>')
		for (var j = 0; j <= row.length - 1; j++) {
			var key = $('<div class="keyboard-item IDCardKeyboard-item nunKeyboard-item">'+ row[j] +'</div>');
			keyboardRow.append(key);
			if(row[j] == "."){
				key.addClass("key-dot");
			}
			else if(row[j] == "del"){
				key.addClass("key-delete").parent().addClass("right");
			}
			else if(row[j] == "确定"){
				key.addClass("key-confirm");
			}
			else if(row[j] == "close"){
				key.addClass("key-close");
			}
		}
		$('.IDCardKeyboard').append(keyboardRow);
	}
	IDCardKeyboardLogic();
}

// 键盘默认逻辑
function defaultKeyboardLogic(keyboardName){
	var Event;ifpc?Event = "click":Event = "touchend.defaultKeyboardLogic";
	var timer;
	$(keyboardName).find(".keyboard-item").on(Event,function () {
		event.stopPropagation();
		var This = $(this);
		var addText = This.html();
		if ($('.focusVirtualInput .text').html().length>=JSON.parse($('.focusVirtualInput').attr('data-keyboard')).maxlength) {
			addText = '';
		}
		if($('.focusVirtualInput .text').html().length==0&&This.html()=='0'){
			addText = '0.';
		}
		else if (This.hasClass('key-delete')) {
			addText = '';
		}
		else if(This.hasClass('key-close')||This.hasClass('key-confirm')){
			addText = '';
			closeKeyboard();
		}
		$('.focusVirtualInput .text').html($('.focusVirtualInput .text').html()+addText);
		focusHiddenInput.val(Text.html());
		if (ifpc) {focusHiddenInput.focus();}
		$('.focusVirtualInput .text').hide().show(0);//修复部分手机上输入第一个字符时.text宽度不会改变的bug
	})
}
function IDCardKeyboardLogic() {
	var Event;ifpc?Event = "click":Event = "touchend.IDCardKeyboardLogic";
	$('.IDCardKeyboard-item').on(Event,function () {
		event.stopPropagation();
		var This = $(this);
		var addText = This.html();
		maxlength = 18;
		if (Text.html().length>=maxlength) {
			addText = '';
		}
		if(Text.html().length==0&&This.html()=='0'){
			addText = '0.';
		}
		else if (This.hasClass('key-delete')) {
			addText = '';
		}
		else if(This.hasClass('key-close')||This.hasClass('key-confirm')){
			addText = '';
			closeKeyboard();
		}
		Text.html(Text.html()+addText);
		focusHiddenInput.val(Text.html());
		if (ifpc) {focusHiddenInput.focus();}
		Text.hide().show(0);//修复部分手机上输入第一个字符时.text宽度不会改变的bug
	})
}
function provinceKeyboardLogic() {
	var Event;ifpc?Event = "click":Event = "touchend.provinceKeyboardLogic";
	$('.provinceKeyboard-item').on(Event,function () {
		$('.focusVirtualInput .placeholder').fadeOut(100)
		Text.html($(this).html());
		closeKeyboard();
	})
}
function GeneralKeyboardLogic() {
	var deleteTimer;
	var Event;ifpc?Event = "click":Event = "touchend.GeneralKeyboardLogic";
	$('.key-confirm').on(Event,function(){
		setTimeout(function(){
	 		$('a').css('pointer-events','auto');
			$('input').css('pointer-events','auto');
	    }, 400);
	})
	ifpc?Event = "mousedown.GeneralKeyboardLogic":Event = "touchstart.GeneralKeyboardLogic";
	$('.key-delete').on(Event,function () {
		// $('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
		deleteTimer = setInterval(function () {
			$('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
			if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeOut(100);
			else $('.focusVirtualInput .placeholder').fadeIn(100);
		},200);
	})
	ifpc?Event = "mouseup.GeneralKeyboardLogic":Event = "touchend.GeneralKeyboardLogic";
	$('.key-delete').on(Event,function () {
		$('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
		if (!$('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeIn(100);
		window.clearInterval(deleteTimer);
	})
}
// function openPcKeyboard(){

// }
// 打开键盘
function openKeyboard(type) {
	var activeKeyboard;
	switch (type){
		case "idcard":
			activeKeyboard = ".IDCardKeyboard";
			break;
		case "amount":
			activeKeyboard = ".amountKeyboard";
			break;
		case "qwerty":
			activeKeyboard = ".qwertyKeyboard";
			break;
		case "province":
			activeKeyboard = ".provinceKeyboard";
			break;
	}
	$(activeKeyboard).slideDown(200);
	$('body').css({"padding-bottom":"200px","transition":"padding-bottom .2s"});
	$('body').addClass('overflow-hidden');
	console.log(focusVirtualInput.offset().top-($(window).height()-focusVirtualInput.height()-228));
	setTimeout(function () {
		$("html,body").animate({"scrollTop":focusVirtualInput.offset().top-($(window).height()-focusVirtualInput.height()-200-10)},200);
	},100)
	
	focusVirtualInput.removeClass('no-beforeafter').addClass('has-beforeafter');
	setTimeout(function(){
		$('a').css('pointer-events','none');
		$('input').css('pointer-events','none');
	}, 400);
}
// 关闭键盘
function closeKeyboard(){
	$('.wrap-page').css('padding-bottom','0');
	$('body').removeClass('overflow-hidden');
	$('.keyboard').slideUp(200);
	$('.focusVirtualInput').removeClass('has-beforeafter').addClass('no-beforeafter');
	// if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').hide();
	// else $('.focusVirtualInput .placeholder').show();
	setTimeout(function(){
		$('a').css('pointer-events','auto');
		$('input').css('pointer-events','auto');
	}, 400);
	$('.virtualInput').removeClass('focusVirtualInput');
	$('body').css('padding-bottom',"0");
}
// 虚拟键盘主函数
var Text;
var focusVirtualInput;
var focusHiddenInput;
var maxlength;
var supportpc;
var ifpc = judgeUserAgent("pc");
$(function virtualInputMain() {	
	var virtualInputs = $('.virtualInput');
	// 遍历页面中的虚拟输入框，补全结构并创建虚拟键盘
	var i=0;
	virtualInputs.each(function () {
		if ($(this).attr('data-keyboard')) {
			i++;
			// console.log(i+"\."+$(this).attr('data-keyboard').replace(/{/g, "").replace(/}/g, "").replace(/"/g, " "));//输出每个虚拟输入框的属性
			// 补全html结构
			$(this).append('<div class="placeholder">'+JSON.parse($(this).attr('data-keyboard')).placeholder+'</div><div class="text"></div>');
			// $(this).append("<input class=\"hidden-input\" type=\"text\" style=\"text-transform:uppercase;\" maxlength=\"6\" onkeyup=\"value=value.replace(/[\\W]/g,'') \" onbeforepaste=\"clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\d]/g,''))\">");
			$(this).append("<input class=\"hidden-input\" type=\"text\">");
			// 创建页面用到的虚拟键盘
			keyboardCreate(JSON.parse($(this).attr('data-keyboard')).type);
		}
	});
	// 点击虚拟输入框时打开虚拟键盘
	// virtualInputs.on("touchend",function () {
	// 	event.stopPropagation();
	// })
	virtualInputs.on("touchstart touchend",function () {
		event.stopPropagation();
	})
	var bodyMove = false;
	virtualInputs.on("touchmove",function () {
		bodyMove = true;
	})
	var Event;ifpc?Event = "click":Event = "touchend";
	virtualInputs.on(Event,function (){
		event.stopPropagation();
		// 加判断，以避免重复激活键盘
		if ($(this).attr('data-keyboard')&&!$(this).hasClass("focusVirtualInput")&&!bodyMove) {
			closeKeyboard();
			$(this).addClass("focusVirtualInput");
			Text = $('.focusVirtualInput .text');
			focusVirtualInput = $('.focusVirtualInput');
			focusHiddenInput = $('.focusVirtualInput .hidden-input');
			maxlength = JSON.parse(focusVirtualInput.attr('data-keyboard')).maxlength;
			supportpc = JSON.parse(focusVirtualInput.attr('data-keyboard')).supportpc;
			openKeyboard(JSON.parse($(this).attr('data-keyboard')).type.toLowerCase());
			$('.focusVirtualInput .text').on("change DOMNodeInserted DOMNodeRemoved",function () {
				console.log("D");
			});
		}
		bodyMove = false;
	})

	if (ifpc) {
		virtualInputs.on("click",function () {
			$(this).addClass("focusVirtualInput");
			$(this).find(".hidden-input").focus();
			openKeyboard(JSON.parse($(this).attr('data-keyboard')).type.toLowerCase());
		})
		$(".hidden-input").on("keyup",function () {
			Text.html($(".focusVirtualInput .hidden-input").val());
			console.log(Text);
			if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeOut(100);
		else $('.focusVirtualInput .placeholder').fadeIn(100);
		})
	}
	var Event;ifpc?Event = "click" : Event = "touchend";
	$(".keyboard-item").bind(Event,function () {
		if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeOut(100);
		else $('.focusVirtualInput .placeholder').fadeIn(100);
	})
	
	touchFeedback(".keyboard-item","key-touched");
	// $(".keyboard").bidn("click",function () {
	// 	event.stopPropagation();
	// })
	$(".keyboard").bind("touchstart touchmove touchend",function () {
		event.stopPropagation();
	})
	$('html').on('touchstart touchmove touchend',function () {
		closeKeyboard();
	})
	if (ifpc) {
		$('html').on('click',function () {
			closeKeyboard();
		})
	}
	// 设置所有键盘的缺省逻辑
	GeneralKeyboardLogic();
})