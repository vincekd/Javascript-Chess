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
    [ "q", "p", "", "", "", "", "p", "k" ],
    [ "k", "p", "", "", "", "", "p", "q" ],
    [ "b", "p", "", "", "", "", "p", "b" ],
    [ "n", "p", "", "", "", "", "p", "n" ],
    [ "r", "p", "", "", "", "", "p", "r" ]
];
var WHITE = 0;
var BLACK = 7;
var turn = WHITE;
var levels = 3;
var initBoard = board( startBoard );
var board = new Board( initBoard, turn, 0 );

function runGame( d ){
    $("#run").css("display", "none");
    var arr;
    var c = 0;
    while( c < d ){
	arr = board.init();
	//console.log( arr.total );
	board = arr.board;
	board.level = 0;
	c ++;
    }
    board.print();
    $("#run").show();
}
//runGame( 1 );
$(document).ready( function( e ){
    $("#run").bind( "click", function( event ){
	runGame( 1 );
    });
});