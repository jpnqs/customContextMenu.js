const customContextMenu = {
	content: [],
	container: null,
	id: '',
	setup: function () {
		this.container = document.createElement('div');
		this.id = this.generateId();
		this.container.id = this.id;
	},
	generateId: function () {
	  function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		  .toString(16)
		  .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	addElement: function (el) {
		let type = el.type;
		if (type != undefined) {
			switch(type) {
				case 'button':
					let text = el.text;
					let click = el.click;
					let btn = this.createButtonElement(text, click);
					this.content.push(btn);
				break;
				case 'seperator':
					let sep = this.createSeperatorElement();
					this.content.push(sep);
				break;
				case 'submenu':
					let content = el.content;
					if (content == undefined) {
						throw new Error('You have to enter an array to submenu content');
					}
					content.forEach(el => {
						this.addElement(el);
					});
				break;
			}
		} else {
			throw new Error('You have to enter a type definition of context menu item');
		}
	},
	createButtonElement: function (text, click) {
		let btn = document.createElement('button');
		btn.innerHTML = text;
		btn.addEventListener('click', ev => {
			click(ev);
		});
		return btn;
	},
	createSeperatorElement: function (){
		let sep = document.createElement('div');
		return sep;
	},
	createSubmenu: function (text, content) {
		let div = document.createElement('div');
		let cont = document.createElement('div');
		div.innerHTML = text;
		div.addEventListener('mouseover', ev => {
		
		});
		div.addEventListener('mouseout', ev => {
		
		});
	},
	buildFromTemplate: function (tem) {
		if (Array.isArray(tem)) {
			this.setup();
			tem.forEach(el => {
				this.addElement(el);
			});
			this.show();
		} else {
			throw new Error('You have to enter an array');
		}
	},
	show: function () {
		this.content.forEach(el => {
			this.container.appendChild(el);
		});
	},
	hide: function () {
		this.container.innerHTML = '';
	}
}

// Setting up context menu example
customContextMenu.buildFromTemplate([
	{
		type: 'button',
		text: 'click me',
		click: c => {
			console.log('hello world');
		}
	},
	{
		type: 'seperator'
	},
	{
		type: 'submenu',
		content: [
			{
				type: 'button',
				text: 'button'
			}
		],
	},
	{
		type: 'button',
		text: 'just another button',
		click: c => {
			console.log('another click');
		}
	}
]);