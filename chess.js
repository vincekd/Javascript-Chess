"use strict";
function board( arr ){
    var array = [];
    var piece,player;
    for( var i = 0; i < arr.length; i ++ ){
	array[i] = [];
	for( var j = 0; j < arr[i].length; j ++ ){
	    //which player
	    if( j < 2 ){
		player = 0;
	    } else if( j > 5 ){
		player = 7;
	    }
	    switch( arr[i][j] ){
	    case "r":
		piece = new Rook( new Position( i, j ), player );
		break;
	    case "n":
		piece = new Knight( new Position( i, j ), player );
		break;
	    case "b":
		piece = new Bishop( new Position( i, j ), player );
		break;
	    case "q":
		piece = new Queen( new Position( i, j ), player );
		break;
	    case "k":
		piece = new King( new Position( i, j ), player );
		break;
	    case "p":
		piece = new Pawn( new Position( i, j ), player );
		break;
	    default:
		piece = false;
	    }
	    array[i][j] = piece;
	}
    }
    return array;
}

function Board( board, player, level ){
    this.board = board;
    this.turn = player;
    this.moves = [];
    this.children = [];
    this.level = level;
    this.getValidMoves = function(){
	var bd = this.board;
	var moves = [];
	var cell, newArr, pos, arr, index;
	//TODO stop path if hits own piece
	for( var i = 0; i < bd.length; i ++ ){
	    for( var j = 0; j < bd[i].length; j ++ ){
		cell = bd[i][j];
		if( cell !== false && cell.player == this.turn ){
		    cell.getMoves();
		    //new array for valid moves
		    newArr = [];
		    for( var k = 0; k < cell.moves.length; k++ ){
			if( cell.moves[k] !== false ) {
			    if( bd[cell.moves[k].x][cell.moves[k].y] === false ){
				newArr.push( cell.moves[k] );
			    } else {
				//remove blocked moves
				if ( bd[cell.moves[k].x][cell.moves[k].y].player != this.turn ){
				    newArr.push( cell.moves[k] );
				}
				if( !! cell.dependentMoves ){
				    arr = cell.dependentMoves( cell.moves[k] );
				    for( var m = 0; m < arr.length; m ++ ){
					index = cell.moves.indexOf( arr[m] );
					if( index != -1 ){
					    cell.moves[index] = false;
					}
					index = newArr.indexOf( arr[m] );
					if( index != -1 ){
					    newArr.splice( index, 1 );
					}
				    }
				}
			    }
			}
		    }
		    cell.moves = newArr;
		    if( cell.moves.length > 0 ){
			moves.push( cell );
		    }
		}
	    }
	}
	this.moves = moves;
    }

    this.permuteBoards = function(){
	//TODO remove captured pieces
	for( var i = 0; i < this.moves.length; i ++ ){
	    for( var m = 0; m < this.moves[i].moves.length; m ++ ){
		//console.log( this.moves[i].moves );
		var newBoard = blankBoard();
		for( var k = 0; k < this.board.length; k ++ ){
		    for( var j = 0; j < this.board[k].length; j ++ ){
			if( this.moves[i].pos.x == k && this.moves[i].pos.y == j ){
			    //TODO make this work
			    newBoard[k][j] = false;
			    newBoard[this.moves[i].moves[m].x][this.moves[i].moves[m].y] = 
				deepCopy( this.board[k][j], this.moves[i].moves[m] );
			} else if( this.moves[i].moves[m].x == k && this.moves[i].moves[m].y == j ){
			    //already filled, or should be soon
			} else {
			    newBoard[k][j] = this.board[k][j];
			}
		    }
		}
		var turn = WHITE;
		if( this.turn == WHITE ){
		    turn = BLACK;
		}
		var obj = new Board( newBoard, turn, this.level + 1 );
		this.children.push( obj );
	    }
	}
    }

    this.score = function(){
	//TODO score center control
	//TODO figure in mate and checkmate
	//them most and you least
	var score0 = 0
	var score7 = 0;
	// var turn = this.turn;
	// if( turn == 0 ){
	//     turn = 7;
	// }
	for( var i = 0; i < this.board.length; i ++ ){
	    for( var j = 0; j < this.board[i].length; j ++ ){
		if( board[i][j] !== false ){
		    //if( board[i][j].player == turn ){
		    if( board[i][j].player == WHITE ){
			score0 += pieceScores[board[i][j].rep];
		    } else if( board[i][j].player == BLACK ){
			score7 += pieceScores[board[i][j].rep];
		    }
		    //}
		}
	    }
	}
	
	return { "BLACK" : score7, "WHITE" : score0, "total" : (score0 - score7) };
    }

    this.scoreBoards = function(){
	var highest = null;
	var board;
	var score;
	for( var i = 0; i < this.children.length; i ++ ){
	    score = this.children[i].score();
	    if( this.turn == WHITE ){
		if( highest === null || score.total > highest ){
		    highest = score.total;
		    board = this.children[i];
		}
	    } else if( this.turn == BLACK ){
		if( highest === null || score.total < highest ){
		    highest = score.total;
		    board = this.children[i];
		}
	    }
	}
	return [board, score];
    }	

    this.init = function( ){
	this.getValidMoves();
	this.permuteBoards();
	if( this.level == levels ){
	    return this.scoreBoards();
	} else {
	    //figure out scoring.  High means 0, low means 7
	    var best = null;
	    for( var i = 0; i < this.children.length; i ++ ){
		var tmp = this.children[i].init();
		if( !! tmp ){
		    console.log( tmp[1].total );
		}
	    }
	}
    }
}

function deepCopy( obj, pos ){
    switch( obj.rep ){
    case "r": return new Rook( pos, obj.player );
    case "b": return new Bishop( pos, obj.player );
    case "n": return new Knight( pos, obj.player );
    case "k": return new King( pos, obj.player );
    case "q": return new Queen( pos, obj.player );
    case "p": return new Pawn( pos, obj.player );
    }
}

function blankBoard(){
    return [[],[],[],[],[],[],[],[]];
}

function King( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "k";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var j;
	var i = pos.x - 1;
	if( i < 0 ){
	    i = 0;
	}
	for( i; i <= (pos.x + 1) && i <= 7; i ++ ){
	    j = pos.y - 1;
	    if( j < 0 ){
		j = 0;
	    }
	    for( j; j <= (pos.y + 1) && j <= 7; j ++ ){
		moves.push( new Position( i, j ) );
	    }
	}
	this.moves = moves;
    }
}

function Queen( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "q";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var i;
	//up down
	for( i = 0; i <= 7; i ++ ){
	    moves.push( new Position( pos.x, i ) );
	}
	//left right
	for( i = 0; i <= 7; i ++ ){
	    moves.push( new Position( i, pos.y ) );
	}
	//right up
	for( i = 0; i <= 7 - pos.x && (pos.y+i) <= 7; i ++ ){
	    moves.push( new Position( pos.x + i, pos.y + i ) );
	}
	//right down
	for( i = 1; i < 7 - pos.x && (pos.y-i) > 0; i ++ ){
	    moves.push( new Position( pos.x + i, pos.y - i ) );
	}
	//left up
	for( i = 0; i <= pos.x && (pos+i) <= 7; i ++ ){
	    moves.push( new Position( pos.x - i, pos.y + i ) );
	}
	//left down
	for( i = 1; i < pos.x && (pos.y-i) > 0; i ++ ){
	    moves.push( new Position( pos.x - i, pos.y - i ) );
	}
	this.moves = moves;
    }
    this.dependentMoves = function( move ){
	var pos = this.pos;
	var arr = [];
	//parse out bad positions
	for( var i = 0; i < this.moves.length; i ++ ){
	    if( move.x == pos.x ){
		if( this.moves[i].x == move.x ){
		    if( move.y < pos.y ){
			if( this.moves[i].y < move.y ){
			    arr.push( this.moves[i] );
			}
		    } else if( move.y > pos.y ){
			if( this.moves[i].y > move.y ){
			    arr.push( this.moves[i] );
			}
		    }
		}
	    } else if( move.y == pos.y ){
		if( this.moves[i].y == move.y ){
		    if( move.x < pos.x ){
			if( this.moves[i].x < move.x ){
			    arr.push( this.moves[i] );
			}
		    } else if( move.x > pos.x ){
			if( this.moves[i].x > move.x ){
			    arr.push( this.moves[i] );
			}
		    }
		}
	    } else if( move.x > pos.x && move.y > pos.y ){
	 	if( this.moves[i].x > move.x && this.moves[i].y > move.y ){
		    arr.push( this.moves[i] );
		}   
	    } else if( move.x > pos.x && move.y < pos.y ){
		if( this.moves[i].x > move.x && this.moves[i].y < move.y ){
		    arr.push( this.moves[i] );
		}
	    } else if( move.x < pos.x && move.y > pos.y ){
		if( this.moves[i].x < move.x && this.moves[i].y > move.y ){
		    arr.push( this.moves[i] );
		}
	    } else if( move.x < pos.x && move.y < pos.y ){
		if( this.moves[i].x < move.x && this.moves[i].y < move.y ){
		    arr.push( this.moves[i] );
		}
	    }
	}
	return arr;
    }
}

function Rook( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "r";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var i;
	//up down
	for( i = 0; i <= 7; i ++ ){
	    if( i != pos.y ){
		moves.push( new Position( pos.x, i ) );

	    }
	}
	//left right
	for( i = 0; i <= 7; i ++ ){
	    if( i != pos.x ){
		moves.push( new Position( i, pos.y ) );
	    }
	}
	this.moves = moves;
    }
    this.dependentMoves = function( move ){
	var pos = this.pos;
	var arr = [];
	var w,z;
	if( pos.y == move.y ){
	    w = "y";
	    z = "x";
	} else if( pos.x == move.x ){
	    w = "x";
	    z = "y";
	}
	for( var i = 0; i < this.moves.length; i ++ ){
	    if( this.moves[i] !== false ){
		if( pos[z] < move[z] ){
		    if( this.moves[i][z] > move[z] ){
			arr.push( this.moves[i] );
		    }
		} else if( pos[z] > move[z] ){
		    if( this.moves[i][z] < move[z] ){
			arr.push( this.moves[i] );
		    }
		}
	    }
	}
	return arr;
    }
}

function Bishop( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "b";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var i;
	//right up
	for( i = 0; i <= 7 - pos.x && (pos.y+i) <= 7; i ++ ){
	    moves.push( new Position( pos.x + i, pos.y + i ) );
	}
	//right down
	for( i = 1; i < 7 - pos.x && (pos.y-i) > 0; i ++ ){
	    moves.push( new Position( pos.x + i, pos.y - i ) );
	}
	//left up
	for( i = 0; i <= pos.x && (pos+i) <= 7; i ++ ){
	    moves.push( new Position( pos.x - i, pos.y + i ) );
	}
	//left down
	for( i = 1; i < pos.x && (pos.y-i) > 0; i ++ ){
	    moves.push( new Position( pos.x - i, pos.y - i ) );
	}
	this.moves = moves;
    }
    this.dependentMoves = function( move ){
	var pos = this.pos;
	var arr = [];
	//parse out bad positions
	for( var i = 0; i < this.moves.length; i ++ ){
	    if( move.x > pos.x && move.y > pos.y ){
	 	if( this.moves[i].x > move.x && this.moves[i].y > move.y ){
		    arr.push( this.moves[i] );
		}   
	    } else if( move.x > pos.x && move.y < pos.y ){
		if( this.moves[i].x > move.x && this.moves[i].y < move.y ){
		    arr.push( this.moves[i] );
		}
	    } else if( move.x < pos.x && move.y > pos.y ){
		if( this.moves[i].x < move.x && this.moves[i].y > move.y ){
		    arr.push( this.moves[i] );
		}
	    } else if( move.x < pos.x && move.y < pos.y ){
		if( this.moves[i].x < move.x && this.moves[i].y < move.y ){
		    arr.push( this.moves[i] );
		}
	    }
	}
	return arr;
    }
}

function Pawn( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "p";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var validMoves = [];
	var x, y;
	//TODO add en passante
	//TODO add diagonal attack
	if( this.player === WHITE ){
	    if( pos.y == 1 ){
		moves.push( new Position( pos.x, pos.y + 2 ) );
	    }
	    moves.push( new Position( pos.x, pos.y + 1 ) );
	} else if( this.player == BLACK ){
	    if( pos.y == 6 ){
		moves.push( new Position( pos.x, pos.y - 2 ) );
	    }
	    moves.push( new Position( pos.x, pos.y - 1 ) );
	}
	for( var i = 0; i < moves.length; i++ ){
	    x = moves[i].x;
	    y = moves[i].y;
	    if( (x >= 0 && x <= 7) && (y >= 0 && y <= 7) ){
		validMoves.push( moves[i] );
	    }
	}
	this.moves = validMoves;
    }
    this.dependentMoves = function( move ){
	var pos = this.pos;
	var arr = [];
	for( var i = 0; i < this.moves.length; i ++ ){
	    if( this.moves[i].y > move.y ){
		arr.push( this.moves[i] );
	    }
	}
	return arr;
    }
}

function Knight( pos, player ){
    this.pos = pos;
    this.player = player;
    this.rep = "n";
    this.moves = [];
    this.getMoves = function(){
	//vars
	var pos = this.pos;
	var moves = [];
	var validMoves = [];
	var x, y;
	//left moves
	moves.push( new Position( pos.x - 2, pos.y - 1) );
	moves.push( new Position( pos.x - 2, pos.y + 1) );
	//right moves 
	moves.push( new Position( pos.x + 2, pos.y - 1) );
	moves.push( new Position( pos.x + 2, pos.y + 1) );
	//up moves
	moves.push( new Position( pos.x + 1, pos.y + 2) );
	moves.push( new Position( pos.x - 1, pos.y + 2) );
	//down moves
	moves.push( new Position( pos.x + 1, pos.y - 2) );
	moves.push( new Position( pos.x - 1, pos.y - 2) );
	//prune illegal moves
	for( var i = 0; i < moves.length; i++ ){
	    x = moves[i].x;
	    y = moves[i].y;
	    if( (x >= 0 && x <= 7) && (y >= 0 && y <= 7) ){
		validMoves.push( moves[i] );
	    }
	}
	this.moves = validMoves;
    }
}

function Position( x, y ){
    this.x = x;
    this.y = y;
}
