// 虚拟键盘参数：
// tyle         类型
// placeholder  占位符
// ifpc         PC是否可用
// maxlength    输入最大长度


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
	var timer;
	$(keyboardName).find(".keyboard-item").on('touchend.defaultKeyboardLogic',function () {
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
		$('.focusVirtualInput .text').hide().show(0);//修复部分手机上输入第一个字符时.text宽度不会改变的bug
	})
}
function IDCardKeyboardLogic() {
	$('.IDCardKeyboard-item').on('touchend.IDCardKeyboardLogic',function () {
		event.stopPropagation();
		var This = $(this);
		var addText = This.html();
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
		Text.hide().show(0);//修复部分手机上输入第一个字符时.text宽度不会改变的bug
	})
}
function provinceKeyboardLogic() {
	$('.provinceKeyboard-item').on('touchend.provinceKeyboardLogic',function () {
		$('.focusVirtualInput .placeholder').fadeOut(100)
		Text.html($(this).html());
		closeKeyboard();
	})
}
function GeneralKeyboardLogic() {
	var deleteTimer;
	$('.key-confirm').on('touchend.GeneralKeyboardLogic',function(){
		setTimeout(function(){
	 		$('a').css('pointer-events','auto');
			$('input').css('pointer-events','auto');
	    }, 400);
	})
	$('.key-delete').on("touchstart.GeneralKeyboardLogic",function () {
		// $('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
		deleteTimer = setInterval(function () {
			$('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
			if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeOut(100);
			else $('.focusVirtualInput .placeholder').fadeIn(100);
		},200);
	})
	$('.key-delete').on("touchend.GeneralKeyboardLogic",function () {
		$('.focusVirtualInput .text').html($('.focusVirtualInput .text').html().substring(0,$('.focusVirtualInput .text').html().length-1));
		window.clearInterval(deleteTimer);
	})
}

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
	$(activeKeyboard).slideDown(100);
	$('body').css('padding-bottom',"200px");
	$(window).scrollTop(focusVirtualInput.offset().top-($(window).height()-$(activeKeyboard).height()-focusVirtualInput.height()-30));
	$('body').addClass('overflow-hidden');
	focusVirtualInput.removeClass('no-beforeafter').addClass('has-beforeafter');
	$('a').css('pointer-events','none');
	$('input').css('pointer-events','none');
}
// 关闭键盘
function closeKeyboard(){
	$('.wrap-page').css('padding-bottom','0');
	$('body').removeClass('overflow-hidden');
	$('.keyboard').slideUp(100);
	$('.focusVirtualInput').removeClass('has-beforeafter').addClass('no-beforeafter');
	// if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').hide();
	// else $('.focusVirtualInput .placeholder').show();
	setTimeout(function(){
		$('a').css('pointer-events','auto');
		$('input').css('pointer-events','auto');
	}, 400);
	$('.virtualInput').removeClass('focusVirtualInput')
}
// 虚拟键盘主函数
var Text;
var focusVirtualInput;
var maxlength;
$(function virtualInputMain() {	
	var virtualInputs = $('.virtualInput');
	// 遍历页面中的虚拟输入框，补全结构并创建虚拟键盘
	var i=0;
	virtualInputs.each(function () {
		if ($(this).attr('data-keyboard')) {
			i++;
			console.log(i+"\."+$(this).attr('data-keyboard').replace(/{/g, "").replace(/}/g, "").replace(/"/g, " "));
			// 补全html结构
			$(this).append('<div class="placeholder">'+JSON.parse($(this).attr('data-keyboard')).placeholder+'</div>');
			$(this).append('<div class="text"></div>');
			// 创建页面用到的虚拟键盘
			keyboardCreate(JSON.parse($(this).attr('data-keyboard')).type);
		}
	});
	// 触摸虚拟输入框时打开虚拟键盘
	virtualInputs.on('touchstart',function (){
		event.stopPropagation();
		// 加判断，以避免重复激活键盘
		if (!$(this).hasClass("focusVirtualInput")) {
			closeKeyboard();
			$(this).addClass("focusVirtualInput");
			Text = $('.focusVirtualInput .text');
			focusVirtualInput = $('.focusVirtualInput');
			maxlength = JSON.parse(focusVirtualInput.attr('data-keyboard')).maxlength;
			openKeyboard(JSON.parse($(this).attr('data-keyboard')).type.toLowerCase());
		}

	})
	// 触摸反馈
	$(".keyboard").bind("touchstart",function () {
		event.stopPropagation();
	})
	$(".keyboard-item").bind("touchend",function () {
		if ($('.focusVirtualInput .text').html()) $('.focusVirtualInput .placeholder').fadeOut(100);
		else $('.focusVirtualInput .placeholder').fadeIn(100);
	})
	touchFeedback(".keyboard-item","key-touched");
	$('html').on('touchstart',function () {
		closeKeyboard();
	})
	// 设置所有键盘的缺省逻辑
	GeneralKeyboardLogic();
})