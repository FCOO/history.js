# history.js
>


## Description
Maintains a stacked list allowing to add and remove items, and to go back and forward in the list

## Installation
### bower
`bower install https://github.com/FCOO/history.js.git --save`

## Demo
http://FCOO.github.io/history.js/demo/ 

## Usage
```var myHistory = new History( options );```


### options
| Id | Type | Default | Description |
| :--: | :--: | :-----: | --- |
| `initValue`| [Object] or [][Object] | null | Any item or list of items to initialize the list |
| `action` | `function(item, history)` | null | function to be called when a item added using `add` or popped from the list using `goFirst`, `goBack`, `goForward` or `goLast` |
| `onUpdate` | `function(backwardAvail, forwardAvail, history)` | null | function to be called when the list is updated. `backwardAvail == true`if it is possible to go backwards. `forwardAvail == true`if it is possible to go forwards |


### Methods

	.add(object)	//Add a new item to the list

	.goFirst() 		//Go to the firsat item in the list
	.goBack()		//Go to the previous item in the list

	.goForward()	//Go to the next item in the list
	.goLast()		//Go to the last item in the list
	
	.clearHistory()	//Clear the histrory making the current item the first item
	.clearFuture()	//Clear the furture making the current item the last item

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/history.js/LICENSE).

Copyright (c) 2019 [FCOO](https://github.com/FCOO)

## Contact information
Niels Holt nho@fcoo.dk
