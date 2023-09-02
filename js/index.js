$(document).ready(function() {


	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox = $('aside.loadBox');
	var articleBox = $('article');
	var windowScale = window.innerWidth / 750;

	var hei,hei1,hei2,hei3,hei4;
	var stopByclick = false;
	
	
	//----------------------------------------有微信授权放这里  授权完在 icom.init(init)----------------------------------------
	// var arr1 = [1, 1.84, 2.54, 2.96, 3.24, 4.36, 4.64, 4.92, 5.20, 5.48, 6.32, 7.02, 7.44, 7.72, 8.83, 9.11, 9.40, 9.67, 9.95, 11.92, 12.2, 12.48, 12.76, 13.04, 13.32, 13.74, 14.02, 14.44, 14.72, 15.28, 15.56, 16.12, 16.68, 16.96, 17.38, 17.8, 18.08, 18.64, 18.78, 19.34, 19.62, 20.04, 20.32, 20.88, 21.44, 21.72, 22.00, 22.28, 22.42, 22.7, 22.98, 23.4, 23.68, 24.24, 24.52, 25.08, 25.22, 25.64, 25.78, 26.2, 26.48, 26.9, 27.18, 27.46, 27.88, 28.3, 28.58, 28.72, 29, 29.28, 29.56, 29.84, 30.12, 30.4,]
	// var arr2 = [1.28, 2.12, 2.4, 2.68, 2.96, 3.52, 4.08, 4.78, 5.2, 5.34, 5.76, 6.6, 6.88, 7.16, 7.44, 7.99, 8.56, 9.25, 9.81, 10.10, 12.06, 12.34, 12.48, 12.90, 13.32, 13.60, 14.16, 14.30, 14.86, 15.14, 15.56, 15.84, 16.4, 16.96, 17.24, 17.52, 17.8, 18.22, 18.5, 18.92, 19.2, 19.76, 20.04, 20.6, 21.16, 21.44, 21.86, 22.28, 22.56, 23.12, 23.26, 23.82, 24.10, 24.52, 24.8, 24.94, 25.36, 25.5, 25.92, 26.34, 26.76, 27.04, 27.6, 27.74, 28.16, 28.44, 29, 29.14, 29.98, 30.26,];
	var arr1 = [1, 1.84, 2.54, 2.8, 3.24, 4.36, 4.64, 4.92, 5.20, 5.48, 6.32, 7.02, 7.44, 7.92, 8.33]
	var arr2 = [1.28, 2.12, 2.4, 2.68, 3, 3.52, 4.08, 4.78, 5.1, 5.34, 5.76, 6.6, 6.88, 7.16, 7.44];
	let speed=3600;

	//设置cookie
	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value) + "; path=/";
	}
	 
	//获取cookie
	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	 
		if (arr = document.cookie.match(reg))
	 
			return unescape(arr[2]);
		else
			return null;
			
	}
	// setCookie('user_id','12321')
	// getCookie('user_id')
	


	icom.init(init); //初始化
	icom.screenScrollUnable(); //如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

	function init() {
		requestAnimationFrame(function() {
			var screenProp = window.innerWidth / window.innerHeight
			console.log("os.screenProp:" + screenProp);
			if (screenProp < 0.54) articleBox.addClass("screen189");
			if (screenProp > 0.64) articleBox.addClass("screen159");
			
			
			// if(icom.getQueryString('token')){
			// 	localStorage.setItem('access_token',icom.getQueryString('token'))
			// }
			
			
			API.login({},(res)=>{
				if(res.status==200){
					localStorage.setItem('access_token',res.data.tokenData.token)
				}else {
					if(!icom.getQueryString('code')){
						var href  =encodeURIComponent(location.href)
						location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxff3693cf40c5f63f&redirect_uri='+href+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
					}else{
						API.auth({code:icom.getQueryString('code')},(res2)=>{
							localStorage.setItem('access_token',res2.data.token)
						})
					}
				}
			})
			
			
			
			
			load_handler();

		});
	} //edn func


	//----------------------------------------加载页面图片----------------------------------------
	function load_handler() {
		var loader = new PxLoader();
		loader.addImage('../images/common/turn_phone.png');
		loader.addImage('../images/loadingEle1.png');
		loader.addImage('../images/loadingEle2.png');
		loader.addImage('../images/cloud1.png');
		loader.addImage('../images/cloud2.png');
		loader.addImage('../images/star.png');
		loader.addImage('../images/index/ele1.png');
		loader.addImage('../images/index/ele2.png');
		loader.addImage('../images/index/dl1.png');
		loader.addImage('../images/index/dl2.png');
		loader.addImage('../images/index/fire.png');
		loader.addImage('../images/index/tit1.png');
		loader.addImage('../images/index/tit2.png');
		loader.addImage('../images/index/cloud1.png');
		loader.addImage('../images/index/cloud2.png');
		for(var i = 1;i<7;i++){
			loader.addImage('../images/index/coin'+i+'.png');
		}
		for(var i = 1;i<4;i++){
			loader.addImage('../images/ele'+i+'.png');
		}
		
		loader.addImage('../images/index/ico1.png');
		loader.addImage('../images/index/ico2.png');
		loader.addImage('../images/index/logo.png');
		
		loader.addImage('../images/gameDrum.png');
		loader.addImage('../images/timebg.png');

		//实际加载进度
				loader.addProgressListener(function(e) {
					var per=Math.round(e.completedCount/e.totalCount*50);
					// loadPer.html(per+'%');
					$('.loading .proline .pro').width(per + '%');
					$('.loading .num i').html(per + '%');
				});

		loader.addCompletionListener(function() {
			loadBox.hide();
			icom.fadeIn(articleBox);
			// pageInit();
			load_timer(50);//模拟加载进度
			loader = null;
		});
		loader.start();
	} //end func

	//模拟加载进度
	function load_timer(per) {
		per = per || 0;
		per += imath.randomRange(1, 3);
		per = per > 100 ? 100 : per;
		$('.loading .proline .pro').width(per + '%');
		$('.loading .num i').html(per + '%');
		if (per == 100) setTimeout(pageInit, 200);
		else setTimeout(load_timer, 66, per);
	} //edn func

	//----------------------------------------页面逻辑代码----------------------------------------


	
	/**
	 * 页面初始化
	 */
	function pageInit() {
		$('.loading').removeClass('opacity1');
		$('.index').addClass('opacity1');

		$('.bgmBtn').on("click", bgmBtn);
		// 鼓点击
		$('.game .clickBtn').on("click", clickBtn);
		// 抽奖
		$('.prize .btnLottery').on("click",prize_handler);
		// $('.prize .btnMore').on("click",btnMore);
		// $('.prize .btnMyPrize').on("click",btnMyPrize )
		
		// $('.index .btnStart').on("click",gameShow);
		// $('.index .btnRule').on("click",ruleShow);
		$('.modal .close').on("click",modalHide);
		$('.modal .btnReplay').on("click",btnReplay);
		$('.modal .btnPrize').on("click",showPrize);
		
		
		
		$('.end .btnRe2').on("click",btnReplay )
		$('.modal .btnRe2').on("click",btnReplay )
		
		
		renderData()
		
		initSwiper()

		
		initBgm();

		monitor_handler();
		
		gameShow()


		// icom.countdown($('.btnCode'), 60, '#s');
	} //end func
	
	function renderData () {
		
		
	}
	
	function showToast (txt) {
		$('.toastBox').addClass('opacity1');
		$('.toastBox .cont').html(txt);
		setTimeout(()=>{
			$('.toastBox').removeClass('opacity1');
		},1500)
	}
	
	var swipertips
	function initSwiper () {
		swipertips = new Swiper('.swipertips', {
		    direction: 'vertical',
			observer: true,  //开启动态检查器，监测swiper和slide
			 observeParents: true,  //监测Swiper 的祖/父元素
			 autoplay: {
				  stopOnLastSlide: false,
				 delay: 2000,//1秒切换
				 disableOnInteraction: false,
			},
		})
	}
	
	let timer,timeNum = 30;
	let totleNum = 0;
	let sucNum = 0;
	let reachNum = 0;
	let max = 50
	
	function gameShow () {
		totleNum = 0;
		sucNum = 0;
		reachNum = 0;
		timeNum = 15;
		// $('.modal .txtBox .cont1').prepend('<div class="tit tit2"></div>')
		// $('.modal').addClass('suc'+' opacity1')
		// $('.modal .txtBox .cont1').prepend('<div class="tit tit1"></div>')
		// $('.modal').addClass('fail'+' opacity1')

		$('.timeBox .num').html(timeNum)
		$('.game').addClass('opacity1');
		$('.game .timetxt ').removeClass('aniTime')
		$('.game .time2').fadeIn();
		$('.game .tips').show();
		$('.game .timetxt ').hide();
		hei1 = $('.area').offset().top;
		hei2  = 140*windowScale;
		hei = hei1+hei2
		hei3 = hei1-80;
		setTimeout(()=>{
			setEleMoves();
			$('.game .tips').fadeOut();
			$('.game .timetxt').fadeIn();
			$('.game .timetxt ').addClass('aniTime')
		},2000)
		
		
		setTimeout(()=>{
			$('.time2').fadeOut();
			clearInterval(timer)
			timer =setInterval(()=>{
				if(timeNum>0){
					timeNum--
					$('.timeBox .num').html(timeNum)
				}else{
					clearInterval(timer);
					reachNum = parseInt(sucNum/30*100);
					
					$('.modal .totleNum').html(totleNum)
					$('.modal .sucNum').html(sucNum)
					$('.modal .reachNum').html(reachNum)
					let isSuc = sucNum>=1? 'suc' :'fail'
					if(isSuc =='suc'){
						$('.modal .txtBox .cont1').prepend('<div class="tit tit2"></div>')
					}else{
						$('.modal .txtBox .cont1').prepend('<div class="tit tit1"></div>')
					}
					// $('.modal .txtBox .cont1').prepend('<div class="tit tit1"></div>')
					// $('.modal').addClass(isSuc+' opacity1')
					// if(isSuc =='suc'){
					// 	API.lotteryResult({total_hit:totleNum,good_hit:sucNum},(res)=>{
					// 		if(res.data.allow_redpackage==0){
					// 			$('.modal .cont1 .t1').hide();
					// 		}else{
					// 			$('.modal .cont1 .t1').show();
					// 		}
					// 	})
					// }
					// 这里请求后端是否抽过

					$('.modal').addClass(isSuc+' opacity1')
				}
			},1000)
		},5000)
		
		if(!stopByclick){
			bgm.pause();
			bgm2.play();
		}
		
	}
	
	function ruleShow () {
		$('.modal').addClass('rule opacity1')
	}
	
	function modalHide () {
		$('.modal').removeClass('rule suc fail  prizeList result_suc result_fail opacity1')
	}
	

	
	// 活动end 页面点击返回
	function btnReplay () {
		modalHide()
		$('.game').removeClass('opacity1');
		$('.end').removeClass('opacity1');
		$('.prize').removeClass('opacity1');
		$('.index').addClass('opacity1')
		$('.modal .txtBox .cont1').children().eq(0).remove()
		// 判断是否还有剩余次数
		gameShow()
	}
	
	function showPrize () {
		modalHide();
		window.location.href = './prize.html'
		// API.lotteryInfo({},function(res){
		// 	var html = ''
		// 	if(res.data.all_record.length!=0){
				
		// 		res.data.all_record.forEach((item)=>{
		// 			html+='<div class="swiper-slide"><div class="txt">恭喜<span>'+item.user.nickname+'</span>  抽中'+item.prize.name+'元红包</div></div>'
		// 		})
		// 		$('.prize .tipsBox .swiper-wrapper').html(html);
		// 		swipertips.update();
		// 	}
		// 	$('.prize').addClass('opacity1');
		// })
		
		
		if(!stopByclick){
			bgm2.pause();
			bgm.play();
		}
	}
	
	function btnMore () {
		$('.prize').removeClass('opacity1');
		$('.end').addClass('opacity1');
	}
	
	// 点击抽奖
	function prize_handler () {
		window.location.href = './prize/html'
		// 防止多次点击开关
		// 1 谢谢参与 2、 2.68 3、 5.88 4、1.68 5、谢谢参与 6、8.88 7、16.88 8、1.68
		// $(".prize .mask").show();
		// let num;
		// API.lottery({id:2,type:1},function(res){
		// 	if(res.status ==200){
		// 		if(res.data.id ==6 || res.data.id == 7 || res.data.id ==8 ){
		// 			var nums = [1,5];
		// 			num = nums[imath.randomRange(0,1)]
		// 		}else if(res.data.id==1){
		// 			var nums = [4,8];
		// 			num = nums[imath.randomRange(0,1)]
		// 		}else if(res.data.id==2){
		// 			num = 2
		// 		}else if(res.data.id == 3){
		// 			num = 3
		// 		}else if(res.data.id == 4){
		// 			num = 6
		// 		}else if(res.data.id == 5){
		// 			num = 7
		// 		}
		// 		lottery.prize = num;
		// 		//抽奖ID记录 留咨用的
		// 		lottery.run();
		// 		articleBox.addClass('prizenum'+num);
		// 		lottery.showPrize = function  () {
		// 			lottery.reset();
		// 			setTimeout(()=>{
		// 				$(".prize .mask").hide();
		// 				if(num ==1 || num == 5){
		// 					$('.modal').addClass('result_fail opacity1')
		// 				}else{
		// 					$('.modal .cont3 .num').html(res.data.name);
		// 					$('.modal').addClass('result_suc opacity1')
		// 				}
		// 			},500)
		// 		}
				
		// 	}else{
		// 		$(".prize .mask").hide();
		// 		showToast(res.msg)
				
		// 	}
		// })
	}
	
	
	
	function btnMyPrize () {
		// 我的记录
		var html = ''
		API.lotteryRecord({},function(res){
			if(res.data.prize.length!=0){
				html+= '<div class="lab"><span class="num">'+res.data.prize[0].prize.name+'</span>元红包</div>\
				<div class="val time">'+res.data.prize[0].add_time+'</div>\
				'
			}
			$(".cont5 .myitem").html(html)
			$('.modal').addClass('prizeList opacity1')
		})
	}
	
	// 音乐按钮
	function bgmBtn(){
		var isgame = $('.game').hasClass('opacity1');
		// 在游戏页面
		
		if(bgm.playing() || bgm2.playing()){
			stopByclick = true;
			$(this).removeClass('bgmPlay');
			bgm.pause();
			bgm2.pause();
		}else{
			$(this).addClass('bgmPlay')
			
			stopByclick = false;
			if(isgame){
				bgm2.play();
			}else{
				bgm.play();
			}
		}
	}

	var CanClick = true
	function clickBtn() {
		if(CanClick){
			CanClick = false;
			setTimeout(()=>{
				CanClick = true;
			},200)
		}else{
			return false;
		}
		
		
		var id = $(this).index('.clickBtn');
		$(".game").addClass('active' + id);
		setTimeout(() => {
			$(".game").removeClass('active0 active1')
		}, 100)
		checkEle(id);
		
		totleNum ++;
		console.log(totleNum , sucNum , reachNum );
		
		if(!stopByclick){
			touch.play()
		}
		
	}
	
	var bgm,touch,bgm2;
	function initBgm(){
		// 初始化一个音频类，src资源可以是本地的有额可以是服务器上的
		bgm = new Howl({ src: ['../sound/bgm.mp3'],loop:true, });
		bgm2 = new Howl({ src: ['../sound/bgm2.mp3'],loop:true,autoplay:false });
		touch = new Howl({ src: ['../sound/touch.mp3'],loop:false,autoplay:false });
		// 播放音频
		bgm.play();
		
		// var id1 = bgm.play();
		// var id2 = bgm2.play();
		// var id3 = touch.play();
		// bgm.fade(1, 0,2000,id1);
		// bgm.rate(1, id2);
		// bgm.rate(1,id3)
		
		// Fade out the first bgm and speed up the second.
		// bgm.fade(1, 0, 1000, id1);
		// bgm.rate(1.5, id2);
	}

	
	
	
	function setEleMoves() {
		arr1.forEach((item,index)=>{
			setTimeout(()=>{
				let num = imath.randomRange(1,4)
				let html = '<div class="ele pos1  ele'+num+' left'+index +' " ></div>'
				$('.game .eleBox').append(html)
				move($('.game .eleBox .left'+index))
			},item*speed)
		})
		
		arr2.forEach((item,index)=>{
			setTimeout(()=>{
				let num = imath.randomRange(1,4)
				let html = '<div class="ele pos2 ele'+num+'  right'+index +' " ></div>'
				$('.game .eleBox').append(html)
				move($('.game .eleBox .right'+index))
			},item*speed)
		})
		

	}
	
	function move(obj){
		obj.transition({y:hei},speed/2,'linear',()=>{
			
		}).transition({scale:1.2,opacity:0},200,'linear',()=>{
				obj.remove()
		})
	}
	

	function checkEle(id) {
		let isHit =false
		$('.eleBox .pos'+(id+1)).each((index,item)=>{
			console.log($(item).offset().top,hei3, item);
			if($(item).offset().top>hei3-30 &&  $(item).offset().top<=hei3+20 ){
				console.log('hit');
				sucNum++
				$(item).addClass('hit')
				isHit = true
				return false
			}else{
				isHit = false
				return true
			}
			
		})
		if(isHit){
			let rad = imath.randomRange(1, 2);
			$('.pointTextBox').removeClass('efc1 efc2 efc3 efc4').addClass('efc efc' + rad);
			$(".game").addClass('hit'+id)
		}else{
			let rad = imath.randomRange(3, 4);
			$('.pointTextBox').removeClass('efc1 efc2 efc3 efc4').addClass('efc efc' + rad)
		}
		setTimeout(() => {
			$('.eleBox .ele').removeClass('hit')
			$(".game").removeClass('hit0 hit1')
			$('.pointTextBox').removeClass('efc efc1 efc2 efc3 efc4');
		}, 300)
	}


	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler() {
		//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	} //end func
}); //end ready
