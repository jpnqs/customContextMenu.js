# customContextMenu.js

only ES6 compatible

# Example

## `HTML`
You have to include in the HTML file the CSS-Style file 'contextMenuStyle.css' and the JS file 'customContextMenu.js'
```html
<head>
	<link rel="stylesheet" href="contextMenuStyle.css"/>
	<script src="customContextMenu.js"></script>
</head>
```

## `JavaScript`
Setting up the context menu using the function 'buildFromTemplate' 
```js
	// Setting up context menu example
	customContextMenu.buildFromTemplate([
		{
			type: 'button',
			text: 'button 1',
			click: c => {
				console.log('clicked button 1');
			}
		},
		{
			type: 'seperator'
		},
		{
			type: 'button',
			text: 'button 2',
			click: c => {
				alert('clicked button 2');
			}
		}
	]);
```
