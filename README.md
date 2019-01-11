# customContextMenu.js

only ES6 compatible

## Example

```js

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
					text: 'button',
					click: c => {
						console.log('hi');
					}
				}
			],
		},
		{
			type: 'button',
			text: 'just another button',
			click: c => {
				console.log('another click');
			}
		}, 
		{
			type: 'button',
			text: 'hi',
			click: c => {
				alert('hi dude!');
			}
		}
	]);
	
```
