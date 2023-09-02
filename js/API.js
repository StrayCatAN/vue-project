
var API = {
    DOMAIN: "https://api.sumaokeji.com/sumao_test/",               //正式
    DEBUG: true,

    _send: function(method, data, success,type){
        //有自己的openid并且data里面不带openid才赋值
        // if (API.OpenID && !data.hasOwnProperty('OpenID'))data.OpenID = API.OpenID;
		let token = localStorage.getItem('access_token')?localStorage.getItem('access_token'):''
        $.ajax({
            url: API.DOMAIN + "api/" + method,
            type:type?type:"POST",
            data: data,
            dataType: 'json',
			headers: {
				'authori-zation': 'Bearer '+token,
				
			},
			
            //async: true,
            success: function(res) {
                console.log(res, '-----res')
                if (API.DEBUG){
                    console.log(method + "——success");
                    console.log(res);
                }
                
                if(res && res.status != 200){
                    if (success) success(res);
                }else{
                    if (success) success(res);
                }
                
            },
            error: function(res) {
                if (API.DEBUG) {
                    console.log(method + "——fail", res);
                    console.log(res);
                }
                
                if (success) success(null);
            }
        });

    },

    /**
     * @params String backurl 回调URL 需要URL编码 不传默认index.html页面
     * @params Function success 回调函数 如果回调为null说明服务器报错了或者errcod非0
     */
    access_token: function(data, success){
        API._send('v2/access_token', data, success,'POST');
    },
	
	refresh_token: function(data, success){
	    API._send('v2/refresh_token', data, success,'POST');
	},
	
	// wx登录
	login: function(data, success){
	    API._send('haval/second/init', data, success,'POST');
	},
	
	share: function(data, success){
	    API._send('share', data, success,'GET');
	},

	
	
	
	
	
	
	// 公众号授权登录
	auth: function(data, success){
	    API._send('v2/wechat/auth', data, success,'GET');
	},
	
	// 抽奖活动详情
	lotteryInfo: function(data, success){
	    API._send('v2/lottery/info/1', {"beanId":"",//人员主键
        "content":""//留言内容
    }, success,'GET');
	},
	
	// 抽奖
	lottery: function(data, success){
	    API._send('v2/lottery', data, success,'POST');
	},
	
	// 游戏结果
	lotteryResult: function(data, success){
	    API._send('v2/lottery/result', data, success,'POST');
	},
	
	// 所有人中奖纪录
	lotteryRecord: function(data, success){
	    API._send('v2/lottery/record/1', data, success,'GET');
	},
	
	
	
	
	

   

}
