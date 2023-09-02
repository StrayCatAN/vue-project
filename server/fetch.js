
var API = {
    DOMAIN: "http://127.0.0.1:5500",               //正式
    DEBUG: true,

    _send: function(method, data, success,type){
        //有自己的openid并且data里面不带openid才赋值
        // if (API.OpenID && !data.hasOwnProperty('OpenID'))data.OpenID = API.OpenID;
		let token = localStorage.getItem('access_token')?localStorage.getItem('access_token'):''
        $.ajax({
            url:  "http://127.0.0.1:5500/api/haval/second/getPrizeRecords?beanId=",
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
	// wx登录
	login: function(data, success){
        console.log(1)
	    API._send('haval/second/init', data, success,'GET');
	},
}