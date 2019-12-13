/****************************************************************************
	history.js,

	(c) 2019, FCOO

	https://github.com/FCOO/history.js
	https://github.com/FCOO

****************************************************************************/

(function ($/*, window, document, undefined*/) {
	"use strict";

	var ns = window;

	function HistoryList( options, plugin_count) {
		this.plugin_count = plugin_count;

		this.options = $.extend({
			//Default options


            initValue: null, //Any item or list of items to initialize the list = first item
            action   : function(/* item, historyList */){
                         //function to be called when a item is poped from the list using goFirst, goBack, goForward or goLast
                     },

            onUpdate : function(/*backwardAvail, forwardAvail, historyList*/){
                          //Called when the list is updated.
                          //backwardAvail [BOOLEAN] true if it is possible to go backwards
                          //forwardAvail [BOOLEAN] true if it is possible to go forwards
                       },
            compare  : function( item1, item2 ){
                           //Compare two items and return true if the two items are equal
                           //Can be overwriten for other types of items
                           return (item1 == item2);
                       }

        }, options || {} );

        this.list = [];
        this.index = -1;
        this.lastIndex = -1;
        this.addToList = true;
        this.callAction = true;

        if (options.initValue){
            options.initValue = $.isArray(options.initValue) ? options.initValue : [options.initValue];
            var _this = this;
            $.each( options.initValue, function(index, item){
                _this.callAction = false;
                _this.add(item);
            });
        }

        this._callOnUpdate();
	}

    // expose access to the constructor
    ns.HistoryList = HistoryList;

    //Extend the prototype
	ns.HistoryList.prototype = {

        add: function( item ){
            //Check:
            if (this.addToList){
                //1: Is item already the current item on the list => do not add
                if ( this.list.length && this.options.compare(item, this.list[this.index]) )
                    this.addToList = false;
                else
                    //2: Is item the next item => goForward
                    if ((this.index < this.lastIndex) &&  this.options.compare(item, this.list[this.index+1]) ) {
                        this.index++;
                        this.addToList = false;
                    }
            }

            if (this.addToList){
                this.index++;
                this.list.splice(this.index);
                this.list.push(item);
                this.lastIndex = this.list.length-1;
            }

            if (this.callAction){
                this.callAction = false; //Prevent recursion
                this.addToList = false;
                this.options.action( item, this );
                this._callOnUpdate();
            }
            this.callAction = true;
            this.addToList = true;
            return this;
        },


        _callOnUpdate: function(){
            this.options.onUpdate( this.index>0, this.lastIndex > this.index, this);
            return this;
        },

        _goto: function( deltaIndex ){
            this.index = this.index + deltaIndex;
            this.addToList = false;
            return this.add( this.list[this.index] );
        },

        goFirst: function() {
            return this.index > 0 ? this._goto(-1*this.index) : this;
        },


        goBack: function() {
            return this.index > 0 ? this._goto(-1) : this;
        },

        goForward: function() {
            return this.index < this.lastIndex ? this._goto(+1) : this;
        },

        goLast: function() {
            return this.lastIndex > this.index ? this._goto(this.lastIndex-this.index) : this;
        },

        clearHistory: function() {
            if (this.index > 0){
                this.list.splice(0, this.index);
                this.index = 0;
                this.lastIndex = this.list.length - 1;
                this._callOnUpdate();
            }
            return this;
        },

        clearFuture: function() {
            if (this.lastIndex > this.index){
                this.list.splice(this.index+1);
                this.lastIndex = this.index;
                this._callOnUpdate();
            }
            return this;
        },

    };
}(jQuery, this, document));