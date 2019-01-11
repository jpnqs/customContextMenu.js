	const customContextMenu = {
		content: [],
		container: null,
		clickedElement: null,
		width: '',
		height: '',
		id: '',
		setup: function () {
			this.setupListener();
			this.container = document.createElement('div');
			this.id = this.generateId();
			this.container.id = this.id;
			this.container.className = 'ctxContainer';
			let bodys = document.getElementsByTagName('html');
			if (bodys.length > 0) {
				this.setupHTMLElements();
				bodys[0].appendChild(this.container);
				this.hide();
				this.width = this.container.width + 'px';
				this.height = this.container.height + 'px';
			} else {
				throw new Error('you need to have a html tag in your document');
			}
		},
		generateId: function () {
		  function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		setupListener: function () {
			document.addEventListener('contextmenu', ev => {
				this.clickedElement = ev.path[0];
				this.hide();
				this.show();
				let top = ev.clientY + 'px';
				let left = ev.clientX + 'px';
				this.container.style.top = top;
				this.container.style.left = left;
				ev.preventDefault();
			}); 
			document.addEventListener('click', ev => {
				this.hide();
			});
			window.addEventListener('blur', ev => {
				this.hide();
			});
			window.addEventListener('focus', ev => {
				this.hide();
			});
		},
		addElement: function (el) {
			let type = el.type;
			if (type != undefined) {
				switch(type) {
					case 'button':
						let text = el.text;
						let click = el.click;
						if (typeof click == 'function') {
							let btn = this.createButtonElement(text, click);
							this.content.push(btn);
						} else {
							throw new Error('You have to enter a function as event handler for context button');
						}
					break;
					case 'seperator':
						let sep = this.createSeperatorElement();
						this.content.push(sep);
					break;
					case 'submenu':
						let div = this.createSubmenu(el.text, el.content);
						this.content.push(div);
					break;
				}
			} else {
				throw new Error('You have to enter a type definition of context menu item');
			}
		},
		createButtonElement: function (text, click) {
			let btn = document.createElement('button');
			btn.innerHTML = text;
			btn.className = 'ctxButton';
			btn.addEventListener('click', ev => {
				click(ev);
				this.hide();
			});
			return btn;
		},
		createSeperatorElement: function (){
			let sep = document.createElement('div');
			sep.className = 'ctxSeperator';
			return sep;
		},
		createSubmenu: function (text, content) {

		},
		buildFromTemplate: function (tem) {
			if (Array.isArray(tem)) {
				this.content = [];
				if (this.container != null) {
					this.container.innerHTML = '';
				}
				this.setup();
				tem.forEach(el => {
					this.addElement(el);
				});
			} else {
				throw new Error('You have to enter an array');
			}
		},
		setupHTMLElements: function () {
			if (this.container != null) {
				if (this.content.length != this.container.children.length) {
					this.content.forEach(el => {
						this.container.appendChild(el);
					});	
				}
			}
		},
		show: function () {
			this.container.className = 'ctxContainer';
			this.setupHTMLElements();
		},
		hide: function () {
			if (this.container != null) {
				this.container.className = 'ctxContainerHidden';
				//this.container.innerHTML = null;
			}
		}
	}

	// Setting up context menu example
	customContextMenu.buildFromTemplate([
		{
			type: 'button',
			text: 'button 1',
			click: c => {
				alert('button 1');
			}
		},
		{
			type: 'button',
			text: 'button 2',
			click: c => {
				alert('button 2');
			}
		},
		{
			type: 'seperator'
		},
		{
			type: 'button',
			text: 'button 3',
			click: c => {
				alert('button 3');
			}
		},
		{
			type: 'button',
			text: 'button 4',
			click: c => {
				alert('button 4');
			}
		}
	]);
	
