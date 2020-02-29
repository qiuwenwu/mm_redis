const Redis = require('./index.js').Redis;

async function test() {
	var rs = new Redis();
	var config = './config.json'.loadJson(__dirname);
	rs.setConfig(config);
	rs.open();
	rs.unsubscribe('test');
	// 添加订阅
	rs.subscribe('test', function(message) {
		console.log('来自订阅的消息', message);
	});

	setTimeout(function(){
		// 发布订阅消息
		rs.publish('test', '你好吗？' + Math.random(), function(error, result) {
			console.log(error, result);
		});
	},3000)
}

 test();