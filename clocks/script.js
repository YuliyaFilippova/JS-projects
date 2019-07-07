class Model {
	constructor() {}
	init(view) {
		this.view = view;
		this.time = '';
	}
	update() {
		this.view.updateView();
	}
}

class View {
	constructor() {}
	init(container, model) {
		this.model = model;
		this.container = container;
		var stop = document.createElement('button');
		stop.innerHTML = 'Stop';
		stop.className = 'stop';
		var start = document.createElement('button');
		start.innerHTML = 'Start';
		start.className = 'start';
		var time = document.createElement('h3');
		time.className = 'time';
		container.appendChild(document.createElement('h2')).innerHTML = '';
		container.appendChild(stop);
		container.appendChild(start);
		container.appendChild(time);
	}
	
	updateView() {
		this.container.querySelector('.time').innerHTML = this.model.time;
	}
}

class Controller {
	constructor() {}
	init(container, model, gmt) {
		this.model = model;
		this.GMT = gmt;
		var timerID;
		var self = this;
		container.querySelector('.stop').addEventListener('click', function() {
			clearInterval(timerID);
		});
		container.querySelector('.start').addEventListener('click', function() {
			timerID = setInterval(function() {
				var date = new Date();
				var gr = date.getHours() + date.getTimezoneOffset() / 60; // 0 часовой пояс
				self.model.time = (new Date(new Date().setHours(gr + gmt))).toLocaleTimeString();
				self.model.update();
			}, 1000);
		});
	}
}

var minsk = document.querySelector('.minsk');
var model = new Model();
var view = new View();
var controller = new Controller();
model.init(view);
view.init(minsk, model);
controller.init(minsk, model, 3);

var newyork = document.querySelector('.newyork');
var model2 = new Model();
var view2 = new View();
var controller2 = new Controller();
model2.init(view2);
view2.init(newyork, model2);
controller2.init(newyork, model2, -5);

var berlin = document.querySelector('.berlin');
var model3 = new Model();
var view3 = new View();
var controller3 = new Controller();
model3.init(view3);
view3.init(berlin, model3);
controller3.init(berlin, model3, 1);

var london = document.querySelector('.london');
var model4 = new Model();
var view4 = new View();
var controller4 = new Controller();
model4.init(view4, 0);
view4.init(london, model4);
controller4.init(london, model4, 0);

var vladik = document.querySelector('.vladik');
var model5 = new Model();
var view5 = new View();
var controller5 = new Controller();
model5.init(view5);
view5.init(vladik, model5);
controller5.init(vladik, model5, 10);
