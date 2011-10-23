"use strict";
var pieceScores = {
    "p" : 2,
    "b" : 4,
    "n" : 5,
    "r" : 7,
    "q" : 12,
    "k" : 100
}
// var startBoard = [ 
//     [ "r", "n", "b", "q", "k", "b", "n", "r" ],
//     [ "p", "p", "p", "p", "p", "p", "p", "p" ],
//     [ "", "", "", "", "", "", "", "" ],
//     [ "", "", "", "", "", "", "", "" ],
//     [ "", "", "", "", "", "", "", "" ],
//     [ "", "", "", "", "", "", "", "" ],
//     [ "p", "p", "p", "p", "p", "p", "p", "p" ],
//     [ "r", "n", "b", "q", "k", "b", "n", "r" ]
// ];
var startBoard = [ 
    [ "r", "p", "", "", "", "", "p", "" ],
    [ "n", "p", "", "", "", "", "p", "n" ],
    [ "b", "p", "", "", "", "", "p", "b" ],
    [ "q", "", "", "p", "p", "", "r", "k" ],
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
board.init();

