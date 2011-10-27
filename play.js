"use strict";
var pieceScores = {
    "p" : 2,
    "b" : 4,
    "n" : 5,
    "r" : 7,
    "q" : 12,
    "k" : 100
}
var startBoard = [ 
    [ "r", "p", "", "", "", "", "p", "r" ],
    [ "n", "p", "", "", "", "", "p", "n" ],
    [ "b", "p", "", "", "", "", "p", "b" ],
    [ "q", "p", "", "", "", "", "p", "q" ],
    [ "k", "p", "", "", "", "", "p", "k" ],
    [ "b", "p", "", "", "", "", "p", "b" ],
    [ "n", "p", "", "", "", "", "p", "n" ],
    [ "r", "p", "", "", "", "", "p", "r" ]
];
var WHITE = 0;
var BLACK = 7;
var turn = WHITE;
var levels = 2;
var initBoard = board( startBoard );
var board = new Board( initBoard, turn, 0 );
var lock = false;

function runGame( d ){
    if( lock ){
	return;
    }
    lock = true;
//    $("#run").hide();
    var arr;
    var c = 0;
    while( c < d ){
	arr = board.init();
	board = arr.board;
	board.level = 0;
	c ++;
    }
    board.print();
    lock = false;
//    $("#run").show();
}

var game = JSON.parse( '[[false,{"pos":{"x":0,"y":1},"player":0,"rep":"p","moves":[{"x":0,"y":3},{"x":0,"y":2}]},false,false,false,false,{"pos":{"x":0,"y":6},"player":7,"rep":"p","moves":[{"x":0,"y":4},{"x":0,"y":5}]},{"pos":{"x":0,"y":7},"player":7,"rep":"r","moves":[]}],[{"pos":{"x":1,"y":0},"player":0,"rep":"r","moves":[{"x":0,"y":0}]},{"pos":{"x":1,"y":1},"player":0,"rep":"p","moves":[{"x":1,"y":2}]},false,false,false,false,{"pos":{"x":1,"y":6},"player":7,"rep":"p","moves":[{"x":1,"y":4},{"x":1,"y":5}]},{"pos":{"x":1,"y":7},"player":7,"rep":"n","moves":[{"x":2,"y":5},{"x":0,"y":5}]}],[{"pos":{"x":2,"y":0},"player":0,"rep":"b","moves":[{"x":3,"y":1},{"x":4,"y":2},{"x":5,"y":3}]},{"pos":{"x":2,"y":1},"player":7,"rep":"q","moves":[{"x":2,"y":0},{"x":2,"y":2},{"x":1,"y":1},{"x":3,"y":1},{"x":4,"y":1},{"x":3,"y":2},{"x":4,"y":3},{"x":5,"y":4},{"x":6,"y":5}]},{"pos":{"x":2,"y":2},"player":0,"rep":"n","moves":[{"x":0,"y":3},{"x":4,"y":3},{"x":3,"y":4},{"x":1,"y":4},{"x":1,"y":0}]},{"pos":{"x":2,"y":3},"player":0,"rep":"p","moves":[{"x":2,"y":4}]},false,false,{"pos":{"x":2,"y":6},"player":7,"rep":"p","moves":[{"x":2,"y":4},{"x":2,"y":5}]},{"pos":{"x":2,"y":7},"player":7,"rep":"b","moves":[]}],[{"pos":{"x":3,"y":0},"player":0,"rep":"q","moves":[{"x":3,"y":1},{"x":3,"y":2}]},false,false,{"pos":{"x":3,"y":3},"player":0,"rep":"p","moves":[{"x":3,"y":4}]},false,false,{"pos":{"x":3,"y":6},"player":7,"rep":"p","moves":[{"x":3,"y":4},{"x":3,"y":5}]},{"pos":{"x":3,"y":7},"player":7,"rep":"k","moves":[{"x":4,"y":6},{"x":4,"y":7}]}],[{"pos":{"x":4,"y":0},"player":0,"rep":"k","moves":[{"x":3,"y":1},{"x":5,"y":1}]},{"pos":{"x":4,"y":1},"player":0,"rep":"p","moves":[{"x":4,"y":3},{"x":4,"y":2}]},false,false,false,false,false,false],[{"pos":{"x":5,"y":0},"player":0,"rep":"b","moves":[]},false,false,{"pos":{"x":5,"y":3},"player":7,"rep":"p","moves":[{"x":5,"y":2}]},false,{"pos":{"x":5,"y":5},"player":7,"rep":"n","moves":[{"x":3,"y":4},{"x":7,"y":4},{"x":4,"y":7},{"x":6,"y":3},{"x":4,"y":3}]},{"pos":{"x":5,"y":6},"player":7,"rep":"p","moves":[{"x":5,"y":4}]},{"pos":{"x":5,"y":7},"player":7,"rep":"b","moves":[{"x":6,"y":6},{"x":4,"y":6},{"x":3,"y":5},{"x":2,"y":4},{"x":1,"y":3}]}],[{"pos":{"x":6,"y":0},"player":0,"rep":"n","moves":[{"x":7,"y":2},{"x":5,"y":2}]},{"pos":{"x":6,"y":1},"player":0,"rep":"p","moves":[{"x":6,"y":3},{"x":6,"y":2}]},false,false,{"pos":{"x":6,"y":4},"player":7,"rep":"p","moves":[{"x":6,"y":3}]},false,false,false],[{"pos":{"x":7,"y":0},"player":0,"rep":"r","moves":[{"x":7,"y":1},{"x":7,"y":2},{"x":7,"y":3},{"x":7,"y":4}]},false,false,false,{"pos":{"x":7,"y":4},"player":0,"rep":"p","moves":[{"x":7,"y":5}]},false,{"pos":{"x":7,"y":6},"player":7,"rep":"p","moves":[]},{"pos":{"x":7,"y":7},"player":7,"rep":"r","moves":[{"x":7,"y":6},{"x":6,"y":7}]}]]' );


