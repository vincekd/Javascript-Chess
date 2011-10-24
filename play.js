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
var levels = 2;
var initBoard = board( startBoard );
var board = new Board( initBoard, turn, 0 );
var something = board.init();
console.log( something[0].turn );
for( var i = 0; i < something[0].board.length; i ++ ){
    for( var j = 0; j < something[0].board[i].length; j ++ ){
	if( something[0].board[i][j] === false ){
	    $("#row_" + i + " .col_" + j).text( " " );
	} else {
	    $("#row_" + i + " .col_" + j).text( something[0].board[i][j].rep );
	}
	if( something[0].board[i][j] === false ){
	    $("#row_" + i + " .col_" + j).css( "background", "#AAA" );
	} else if( something[0].board[i][j].player == WHITE ){
	    $("#row_" + i + " .col_" + j).css( "background", "#DDD" );
	} else if( something[0].board[i][j].player == BLACK ){
	    $("#row_" + i + " .col_" + j).css( "background", "#555" );
	}
    }
}