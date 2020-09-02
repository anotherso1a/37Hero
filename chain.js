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
	setTimeout(() => {
		console.log(`Hi, my name is ${this.name}`)
		this.next()
	})
}

HeroFather.prototype.sleep=function(a){
	var fn = () => {
		var s = a
		console.log(`I need sleep ${s}s`)
		setTimeout(this.next.bind(this), s*1000)
	}
	this.task.push(fn)
	return this
}

HeroFather.prototype.kill = function(a){
	var fn = () => {
		var s = a
		console.log(`I killed ${s} bug${s>1?'s':''}`)
		this.next()
	}
	this.task.push(fn)
	return this
}

HeroFather.prototype.recover=function(a){
	var fn = () => {
		var s = a
		console.log(`I recovered ${s} HP`)
		this.next()
	}
	this.task.push(fn)
	return this
}

function Hero(name){
	return new HeroFather(name)
}

Hero('AnotherSola').sleep(1).kill(1).sleep(1).recover(30).sleep(1).recover(34).sleep(2).kill(23)
