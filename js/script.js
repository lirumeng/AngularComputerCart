$(function(){
	// min-width:992px 时购物车图标显示隐藏事件
	$(".tips-btn").mouseover(function(){
		$(".position-fixed").css({
			"right":0,
			"transition":"all 0.3s"
		});
		$(this).css({
			"right":-45
		});
	}).mouseout(function(){
		$(".position-fixed").css({
			"right":-300,
			"transition":"all 0.5s"
		});
		$(this).css({
			"right":0
		});
	});

	// 移上购物车一直显示事件
	$(".position-fixed").mouseover(function(){
		$(this).css({
			"right":0,
			"transition":"all 0.3s"
		});
		$(".tips-btn").css({
			"right":-45
		});
	}).mouseout(function(){
		$(this).css({
			"right":-300,
			"transition":"all 0.5s"
		});
		$(".tips-btn").css({
			"right":0
		});
	});

	// max-width:992px 时购物车图标显示隐藏事件
	$("#showcart").click(function(){
		$(".position-fixed").toggle("normal");
	});

	//爱心点击收藏
	$(".heart-style").click(function(){
		$(this).addClass("color","#b22222");
	});

});

	


	
