
;(function($){
	$.fn.tab = function(options){
		var defaults = {};
		var opts= $.extend({},defaults,options);
		
		return this.each(function(){
			var obj = $(this);
			var headLi = obj.find(".zx-tab-head li");
			var liIndex =0;
			var contLeft=0;
			var headLen = obj.find(".zx-tab-head li").length;
			var tabCont = obj.find(".zx-tab-cont");
			var contItem = obj.find(".zx-tab-cont .zx-tab-cont-item");
			
			//设置宽度
			var headLiWidth = (100/headLen).toFixed(5);
			var contWidth = 100*headLen;
			var contItemWidth = (100/headLen).toFixed(5);
			headLi.css("width",headLiWidth+"%");
			tabCont.css("width",contWidth+"%");
			contItem.css("width",contItemWidth+"%");
			
			//显示内容
			function showCont(index){
				contLeft = -contItemWidth*index +"%";
				tabCont.css({
					"-webkit-transform":"translate("+ contLeft +")",
					"-webkit-transition":"500ms linear",
					"transform":"translate("+ contLeft +")",
					"transition":"200ms linear"
				});
				headLi.removeClass("active").eq(liIndex).addClass("active");
			}
			
			//点击滑出
			headLi.click(function(){
				liIndex = $(this).index();
				showCont(liIndex);
			});
			
			//向左滑动
			tabCont.swipeLeft(function(){
				liIndex++;
				if(liIndex == headLen){
					//liIndex = 0;
					liIndex = 2;
				}
				showCont(liIndex);
			});
			
			//向右滑动
			tabCont.swipeRight(function(){
				liIndex--;
				if(liIndex <= -1){
					//liIndex = headLen -1;
					liIndex = 0;
				}
				showCont(liIndex);
			});
			
		});
	}
})(Zepto);