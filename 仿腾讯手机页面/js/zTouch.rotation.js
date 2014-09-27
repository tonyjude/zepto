$(function(){
	function transformBox(obj,value,time,has3d){
		var time=time?time:0;
		transl=has3d?"translate3d("+value+"px,0,0)":"translate("+value+"px,0)";
		obj.css({'-webkit-transform':transl,'-webkit-transition':time+'ms linear'});
	}

	function slide(tPoint,d){
		var _this=tPoint.self,
			_inner=_this.children(),
			innerW=_inner.width(),
			count=tPoint.count,
			d=d?d:tPoint.direction;
		switch(d){
			case "left":
				--count;
				break;
			case "right":
				++count;
		}
		if(count==1){
			count=0;
		}
		if(count==-tPoint.total){
			count=(typeof _autoSlide!="undefined")?0:-tPoint.total+1;
		}
		var offset = count * innerW/tPoint.total;
		transformBox(_inner,offset,tPoint.speed,tPoint.has3d);
		tPoint.setAttr("count",count);
	}

	function autoSlide(tPoint){
		liIndex = $(this).index();
		_autoSlide=setInterval(function(){
			slide(tPoint,"left");
		},2500);
	}

	function clearAuto(){
		if(typeof _autoSlide!="undefined"){
			clearInterval(_autoSlide);
			_autoSlide=undefined;
		}
	}			

	args={
		speed: 300,
		beforeCallback:function(){
		
		},
		sCallback:function(tPoint){
			clearAuto();
		},
		mCallback:function(tPoint){
			var _this=tPoint.self,
				_inner=_this.find("#innerBox"),
				innerW=_inner.width();
			var offset=tPoint.mX+tPoint.count*innerW/4;
			transformBox(_inner,offset,0,tPoint.has3d);
		},
		eCallback:function(tPoint){
			slide(tPoint);
			autoSlide(tPoint);
		},
		afterCallback:function(tPoint){
			autoSlide(tPoint);
		}
	}

	$("#rotation").Swipe(args);
});
