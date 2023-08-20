const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function(app){
	app.use(
		createProxyMiddleware('/api1',{  //遇见/api前缀的请求就会触发该代理配置
			target:'http://43.143.159.15:5000', //请求转发给谁
			// target:'http://localhost:5000/',
			changeOrigin:true,  //控制服务器收到的请求头中的Host字段的值（本次请求从哪发出）
			pathRewrite:{'^/api1':''} //重写请求路径
		}),
		createProxyMiddleware('/api2',{
			target:'http://43.143.159.15:5001/',
			changeOrigin:true,
			pathRewrite:{'^/api2':''}
		})
	)
}