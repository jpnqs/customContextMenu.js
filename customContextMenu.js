	const customContextMenu = {
		content: [],
		submenus: [],
		container: null,
		clickedElement: null,
		width: 0,
		height: 0,
		id: '',
		/**
		 * setting up the enviromental context menu values
		 */
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
		/**
		 * generates an unique id (internal use)
		 */
		generateId: function () {
		  function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		/**
		 * setting up all global event listeners
		 */
		setupListener: function () {
			document.addEventListener('contextmenu', ev => {
				this.clickedElement = ev.path[0];
				this.hide();
				this.show();
				let top = this.calculateYOpenLocation( ev.clientY ) + 'px';
				let left = this.calculateXOpenLocation( ev.clientX ) + 'px';
				this.container.style.top = top;
				this.container.style.left = left;
				ev.preventDefault();
			}); 
			document.addEventListener('click', _ => {
				this.hide();
			});
			window.addEventListener('blur', _ => {
				this.hide();
			});
			window.addEventListener('focus', _ => {
				this.hide();
			});
			window.addEventListener('keyup', _ => {
				this.hide();
			}); 
			window.addEventListener('resize', _ => {
				this.hide();
			});
		},
		/**
		 * adding an elemnt to context menu
		 * @param {object} el context menu element
		 */
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
		/**
		 * creates a context menu button element
		 * @param {string} text text of button 
		 * @param {function} click function which will be executed after a click
		 */
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
		/**
		 * creates a context menu seperator element
		 */
		createSeperatorElement: function (){
			let sep = document.createElement('div');
			sep.className = 'ctxSeperator';
			return sep;
		},
		//
		createSubmenu: function (text, content) {

		},
		/**
		 * setting up a context menu using a template object
		 * @param {object} tem context menu template
		 */
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
		/**
		 * calculates the used x position
		 * @param {number} mouseX mouse x position 
		 */
		calculateXOpenLocation: function (mouseX) {
			var x;
			let wWidth = window.innerWidth;
			if (wWidth < (mouseX + this.width)) {
				x =  wWidth - this.width;
			} else {
				x = mouseX;
			}
			return x;
		},
		/**
		 * calculates the used y position
		 * @param {number} mouseY mouse y position 
		 */
		calculateYOpenLocation: function (mouseY) {
			var y;
			let wWidth = window.innerHeight;
			if (wWidth < (mouseY + this.height)) {
				y = mouseY - this.height;
			} else {
				y = mouseY;
			}
			return y;
		},
		/**
		 * setting up the html elements in context menu
		 */
		setupHTMLElements: function () {
			if (this.container != null) {
				if (this.content.length != this.container.children.length) {
					this.content.forEach(el => {
						this.container.appendChild(el);
					});	
				}
			}
		},
		/**
		 * shows the context menu
		 */
		show: function () {
			this.container.className = 'ctxContainer';
			this.setupHTMLElements();
			this.width = this.container.offsetWidth;
			this.height = this.container.offsetHeight;
		},
		/**
		 * hides the context menu
		 */
		hide: function () {
			if (this.container != null) {
				this.hideAllSubmenus();
				this.container.className = 'ctxContainerHidden';
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
		},
		{
			type: 'seperator'
		},
		{
			type: 'button',
			text: 'button 5',
			click: c => {
				alert('button 5');
			}
		},
		{
			type: 'button',
			text: 'button 6',
			click: c => {
				alert('button 6');
			}
		},
		{
			type: 'seperator'
		},
		{
			type: 'button',
			text: 'button 7',
			click: c => {
				alert('button 7');
			}
		},
		{
			type: 'button',
			text: 'button 8',
			click: c => {
				alert('button 8');
			}
		}
	]);
	
