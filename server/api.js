var express = require('express')
var httpProxy = require('http-proxy')
var app = express()
var proxy = httpProxy.createProxyServer()
console.log(proxy)
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.use("/", function(req, res, next){
    console.log('sss')
    proxy.web(req, res, {target: "https://api.sumaokeji.com/sumao_test/"})
    // next()
})

app.listen(5500, (res)=>{
    console.log("开启服务代理", res)
})
