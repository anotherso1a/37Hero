function HeroFather(name){
	this.name=name
	this.task=[]
	this.next=function(){
		var fn = this.task.shift()
		if(fn){
			fn()
		}
		return this
	}
	//关键步骤，将next方法通过回调置于队列末尾
	var that=this
	setTimeout(function(){
		console.log(`Hi, my name is ${that.name}`)
		that.next()
	})
}

HeroFather.prototype.sleep=function(a){
	var that=this
	var fn = function(){
		var s = a
		console.log(`I need sleep ${s}s`)
		setTimeout(function(){
			that.next()
		},s*1000)
	}
	this.task.push(fn)
	return this
}

HeroFather.prototype.kill=function(a){
	var that = this
	var fn = function(){
		var s = a
		console.log(`I killed ${s} bug${s>1?'s':''}`);
		that.next()
	}
	this.task.push(fn)
	return this
}

HeroFather.prototype.recover=function(a){
	var that = this
	var fn = function(){
		var s = a
		console.log(`I recovered ${s} HP`);
		that.next()
	}
	this.task.push(fn)
	return this
}

function Hero(name){
	return new HeroFather(name)
}

Hero('AnotherSola').sleep(1).kill(1).sleep(1).recover(30).sleep(1).recover(34).sleep(2).kill(23)